Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

# Let's inspect along y = 338 (bottom edge of row 1 cards)
Write-Output "--- Scan border points at bottom of row 1 (y = 335..345) ---"
for ($x = 40; $x -le 920; $x += 10) {
    # find brightest pixel in y=330..350
    $maxLum = 0
    $bestY = 0
    for ($y = 330; $y -le 350; $y++) {
        $c = $bmp.GetPixel($x, $y)
        $lum = [int](0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B)
        if ($lum -gt $maxLum) {
            $maxLum = $lum
            $bestY = $y
        }
    }
    if ($maxLum -gt 25) {
        Write-Output ("x={0,3}: maxLum={1,3} at y={2}" -f $x, $maxLum, $bestY)
    }
}

$bmp.Dispose()
