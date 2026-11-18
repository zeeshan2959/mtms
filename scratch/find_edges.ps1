Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)
$w = $bmp.Width
$h = $bmp.Height

# Let's find horizontal borders:
# Look for sharp changes in luminosity or color along vertical lines (finding top and bottom edges)
# and along horizontal lines (finding left and right edges)

Write-Output "--- Sampling vertical profile at x = 200 (inside Card 1/Col 1) ---"
for ($y = 0; $y -lt $h; $y += 10) {
    $c = $bmp.GetPixel(200, $y)
    Write-Output ("y={0,3}: R={1,3} G={2,3} B={3,3}" -f $y, $c.R, $c.G, $c.B)
}

Write-Output "--- Sampling vertical profile at x = 700 (inside Card 4/Col 4) ---"
for ($y = 0; $y -lt $h; $y += 10) {
    $c = $bmp.GetPixel(700, $y)
    Write-Output ("y={0,3}: R={1,3} G={2,3} B={3,3}" -f $y, $c.R, $c.G, $c.B)
}

Write-Output "--- Sampling horizontal profile at y = 300 (through middle of cards) ---"
for ($x = 0; $x -lt $w; $x += 25) {
    $c = $bmp.GetPixel($x, 300)
    Write-Output ("x={0,3}: R={1,3} G={2,3} B={3,3}" -f $x, $c.R, $c.G, $c.B)
}

Write-Output "--- Sampling horizontal profile at y = 80 (through 'Why Us' / top area) ---"
for ($x = 0; $x -lt $w; $x += 25) {
    $c = $bmp.GetPixel($x, 80)
    Write-Output ("x={0,3}: R={1,3} G={2,3} B={3,3}" -f $x, $c.R, $c.G, $c.B)
}

$bmp.Dispose()
