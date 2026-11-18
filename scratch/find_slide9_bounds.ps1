Add-Type -AssemblyName System.Drawing
$img = 'D:\MTMS\ppt\public\office\figma_slide9_2560.png'
$bmp = [System.Drawing.Bitmap]::FromFile($img)
Write-Output ("Resolution: {0} x {1}" -f $bmp.Width, $bmp.Height)

# Find the slide bounds (the canvas is centered in the 2560x1440 viewport)
# Scan horizontally at y = 720 (middle)
$minX = 0
$maxX = $bmp.Width - 1
for ($x = 0; $x -lt 600; $x++) {
    $c = $bmp.GetPixel($x, 720)
    # Background outside slide is dark or specific color
    if ($c.R -gt 15 -or $c.G -gt 25 -or $c.B -gt 35) {
        $minX = $x
        break
    }
}
for ($x = $bmp.Width - 1; $x -gt 2000; $x--) {
    $c = $bmp.GetPixel($x, 720)
    if ($c.R -gt 15 -or $c.G -gt 25 -or $c.B -gt 35) {
        $maxX = $x
        break
    }
}

Write-Output ("Slide horizontal bounds: {0} to {1} (width = {2})" -f $minX, $maxX, ($maxX - $minX))

$bmp.Dispose()
