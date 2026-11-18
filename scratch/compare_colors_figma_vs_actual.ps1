Add-Type -AssemblyName System.Drawing

# Let's inspect media_1795018896501_b1ee2351.jpg (user screenshot)
$imgUser = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795018896501_b1ee2351.jpg'
$bmpUser = [System.Drawing.Bitmap]::FromFile($imgUser)
Write-Output "User Screenshot: $($bmpUser.Width) x $($bmpUser.Height)"

# Sample colors on the right side of the stepped card where wallpaper should be visible:
# In user screenshot, x around 600, 700, 800, y around 250..400
Write-Output "--- User Screenshot Colors on Right Stepped Area ---"
foreach ($pt in @(
    @{x=600; y=300},
    @{x=700; y=300},
    @{x=800; y=300},
    @{x=900; y=300}
)) {
    $c = $bmpUser.GetPixel($pt.x, $pt.y)
    Write-Output ("x={0} y={1}: R={2} G={3} B={4}" -f $pt.x, $pt.y, $c.R, $c.G, $c.B)
}

# Now inspect Figma Slide 11 (media_1795016228249_4df461c4.jpg)
$imgFigma = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795016228249_4df461c4.jpg'
$bmpFigma = [System.Drawing.Bitmap]::FromFile($imgFigma)
Write-Output "`nFigma Slide 11: $($bmpFigma.Width) x $($bmpFigma.Height)"
Write-Output "--- Figma Colors on Right Stepped Area ---"
foreach ($pt in @(
    @{x=600; y=300},
    @{x=700; y=300},
    @{x=800; y=300},
    @{x=900; y=300}
)) {
    $c = $bmpFigma.GetPixel($pt.x, $pt.y)
    Write-Output ("x={0} y={1}: R={2} G={3} B={4}" -f $pt.x, $pt.y, $c.R, $c.G, $c.B)
}

# Also inspect Figma Slide 10 (media_1795011230377_3cdceb3d.jpg)
$imgFigma10 = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmpFigma10 = [System.Drawing.Bitmap]::FromFile($imgFigma10)
Write-Output "`nFigma Slide 10: $($bmpFigma10.Width) x $($bmpFigma10.Height)"
Write-Output "--- Figma Slide 10 Colors on Right Stepped Area ---"
foreach ($pt in @(
    @{x=600; y=150},
    @{x=700; y=150},
    @{x=800; y=150},
    @{x=900; y=150}
)) {
    $c = $bmpFigma10.GetPixel($pt.x, $pt.y)
    Write-Output ("x={0} y={1}: R={2} G={3} B={4}" -f $pt.x, $pt.y, $c.R, $c.G, $c.B)
}

$bmpUser.Dispose()
$bmpFigma.Dispose()
$bmpFigma10.Dispose()
