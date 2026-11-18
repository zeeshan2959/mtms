Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

# Let's inspect the bounding box of each card by finding the text and borders
# We know the text for each card:
# Card 1: x ≈ 50..230, y ≈ 200..340
# Card 2: x ≈ 260..440, y ≈ 200..340
# Card 3: x ≈ 470..650, y ≈ 200..340
# Card 4: x ≈ 680..860, y ≈ 200..340

# Let's find card borders accurately:
# Cards have a border with pixels noticeably brighter than the card background.
# Inside card: lum < 15. Border: lum ~ 30-80. Outside card (container): lum ~ 10-25.

for ($cIdx = 1; $cIdx -le 4; $cIdx++) {
    $minX = ($cIdx - 1) * 215 + 40
    $maxX = $cIdx * 215 + 40
    
    # scan horizontally at y = 240
    $borderXs = @()
    for ($x = $minX; $x -le $maxX; $x++) {
        $c = $bmp.GetPixel($x, 240)
        # card border
        if ($cIdx -eq 4) {
            # Card 4 has cyan border
            if ($c.B -gt 60 -and $c.G -gt 50) { $borderXs += $x }
        } else {
            if ($c.R -gt 25 -and $c.G -gt 30 -and $c.B -gt 40) { $borderXs += $x }
        }
    }
    if ($borderXs.Count -gt 0) {
        Write-Output ("Card {0}: left={1}, right={2}, width={3}" -f $cIdx, $borderXs[0], $borderXs[-1], ($borderXs[-1] - $borderXs[0]))
    }
}

$bmp.Dispose()
