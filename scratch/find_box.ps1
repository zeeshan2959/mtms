Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)
$w = $bmp.Width
$h = $bmp.Height

# At y = 200 (between row 1 cards and top of card 2), let's scan x from 450 to 600 in steps of 2 pixels:
Write-Output "--- Scan x between 460 and 560 at y = 180 (above Row 1 cards) ---"
for ($x = 460; $x -le 560; $x += 5) {
    $c = $bmp.GetPixel($x, 180)
    Write-Output ("x={0,3}: R={1,3} G={2,3} B={3,3}" -f $x, $c.R, $c.G, $c.B)
}

Write-Output "--- Scan x between 460 and 560 at y = 100 (where only Left Card exists) ---"
for ($x = 460; $x -le 560; $x += 5) {
    $c = $bmp.GetPixel($x, 100)
    Write-Output ("x={0,3}: R={1,3} G={2,3} B={3,3}" -f $x, $c.R, $c.G, $c.B)
}

Write-Output "--- Scan right edge of Card 2 (x between 950 and 1020) at y = 300 ---"
for ($x = 950; $x -le 1010; $x += 5) {
    $c = $bmp.GetPixel($x, 300)
    Write-Output ("x={0,3}: R={1,3} G={2,3} B={3,3}" -f $x, $c.R, $c.G, $c.B)
}

Write-Output "--- Scan left edge of Card 1 (x between 10 and 60) at y = 100 ---"
for ($x = 10; $x -le 60; $x += 5) {
    $c = $bmp.GetPixel($x, 100)
    Write-Output ("x={0,3}: R={1,3} G={2,3} B={3,3}" -f $x, $c.R, $c.G, $c.B)
}

$bmp.Dispose()
