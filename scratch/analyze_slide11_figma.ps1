Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795014584988_d0e17f87.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)
$w = $bmp.Width
$h = $bmp.Height
Write-Output "Image size: $w x $h"

# Let's inspect along y = 80, 140, 200, 300, 400, 500 across x = 0 to w
foreach ($y in @(50, 100, 150, 200, 300, 450, 520)) {
    $line = ("y={0,3}: " -f $y)
    for ($x = 0; $x -lt $w; $x += 32) {
        $c = $bmp.GetPixel($x, $y)
        $lum = [int](0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B)
        if ($lum -lt 15) { $ch = "." }
        elseif ($c.B -gt $c.R + 20) { $ch = "b" }
        elseif ($c.G -gt $c.R + 15) { $ch = "g" }
        elseif ($lum -gt 150) { $ch = "#" }
        else { $ch = ":" }
        $line += $ch
    }
    Write-Output $line
}

$bmp.Dispose()
