export default async function handler(req, res) { 
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    fullName,
    number,
    email,
    companyName,
    designation,
    message,
    startDateTime,
    timeZone,
  } = req.body || {};

  if (!fullName || !email || !startDateTime) {
    return res.status(400).json({ error: 'Full name, email, and meeting time are required.' });
  }

  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MS_ORGANIZER_EMAIL } = process.env;

  if (!MS_TENANT_ID || !MS_CLIENT_ID || !MS_CLIENT_SECRET || !MS_ORGANIZER_EMAIL) {
    return res.status(500).json({ error: 'Server Microsoft Teams configuration is incomplete.' });
  }

  try {
    // 1. Obtain OAuth2 token from Microsoft Entra ID
    const tokenResponse = await fetch(
      `https://login.microsoftonline.com/${MS_TENANT_ID}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: MS_CLIENT_ID,
          client_secret: MS_CLIENT_SECRET,
          scope: 'https://graph.microsoft.com/.default',
          grant_type: 'client_credentials',
        }),
      }
    );

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.access_token) {
      throw new Error(tokenData.error_description || 'Failed to authenticate with Microsoft Graph.');
    }

    // 2. Compute 30-minute end time cleanly without timezone drift
    const [datePart, timePart] = startDateTime.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);

    const endUtc = new Date(Date.UTC(year, month - 1, day, hour, minute + 30));
    const pad = (n) => String(n).padStart(2, '0');
    const endDateTime = `${endUtc.getUTCFullYear()}-${pad(endUtc.getUTCMonth() + 1)}-${pad(endUtc.getUTCDate())}T${pad(endUtc.getUTCHours())}:${pad(endUtc.getUTCMinutes())}:00`;

    // 3. Create Outlook/Teams calendar event with online Teams meeting enabled
    const eventPayload = {
      subject: `Meeting with ${fullName}${companyName ? ` (${companyName})` : ''}`,
      body: {
        contentType: 'HTML',
        content: `
          <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${number ? `<p><strong>Phone:</strong> ${escapeHtml(number)}</p>` : ''}
          ${companyName ? `<p><strong>Company:</strong> ${escapeHtml(companyName)}</p>` : ''}
          ${designation ? `<p><strong>Designation:</strong> ${escapeHtml(designation)}</p>` : ''}
          <p><strong>Message:</strong><br/>${escapeHtml(message || 'No message provided.')}</p>
        `,
      },
      start: {
        dateTime: startDateTime,
        timeZone: timeZone || 'UTC',
      },
      end: {
        dateTime: endDateTime,
        timeZone: timeZone || 'UTC',
      },
      attendees: [
        {
          emailAddress: {
            address: email,
            name: fullName,
          },
          type: 'required',
        },
      ],
      isOnlineMeeting: true,
      onlineMeetingProvider: 'teamsForBusiness',
    };

    const graphResponse = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(MS_ORGANIZER_EMAIL)}/events`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventPayload),
      }
    );

    const eventData = await graphResponse.json();
    if (!graphResponse.ok) {
      throw new Error(eventData.error?.message || 'Failed to create Teams event.');
    }

    return res.status(200).json({
      success: true,
      eventId: eventData.id,
      joinUrl: eventData.onlineMeeting?.joinUrl || null,
    });
  } catch (error) {
    console.error('Microsoft Teams booking error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}