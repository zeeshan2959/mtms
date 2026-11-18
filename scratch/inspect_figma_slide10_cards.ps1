Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

Write-Output "Figma Slide 10: $($bmp.Width) x $($bmp.Height)"

# Let's inspect Card 1 in Figma Slide 10 (top left card)
# Where is Card 1?
# Let's crop or sample across Card 1 (around x=50 to 250, y=200 to 320)
Write-Output "--- Card 1 Interior Colors in Figma ---"
for ($y = 220; $y -le 300; $y += 20) {
    for ($x = 70; $x -le 230; $x += 40) {
        $c = $bmp.GetPixel($x, $y)
        Write-Output ("x={0,3} y={1,3}: R={2,3} G={3,3} B={4,3}" -f $x, $y, $c.R, $c.G, $c.B)
    }
}

# Inspect Card 1 borders
Write-Output "`n--- Card 1 Border in Figma ---"
# top border of card 1 around y=210..220
for ($y = 205; $y -le 225; $y += 2) {
    $c = $bmp.GetPixel(150, $y)
    Write-Output ("Top border y={0}: R={1,3} G={2,3} B={3,3}" -f $y, $c.R, $c.G, $c.B)
}

# Inspect Card 4 (the highlighted card in Figma)
Write-Output "`n--- Card 4 (Highlighted) in Figma ---"
for ($y = 205; $y -le 225; $y += 2) {
    $c = $bmp.GetPixel(780, $y)
    Write-Output ("Card 4 Top border y={0}: R={1,3} G={2,3} B={3,3}" -f $y, $c.R, $c.G, $c.B)
}

$bmp.Dispose()
