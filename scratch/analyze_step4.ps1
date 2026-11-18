Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\c1394840-d496-4191-b657-d2d1fe10f0c6\.system_generated\logs\media\step_4_media_0.png'
$bmp = [System.Drawing.Bitmap]::FromFile($img)
$w = $bmp.Width
$h = $bmp.Height
Write-Output "Browser step 4 image size: $w x $h"

# Find boundaries of the shapes on slide 11 in Figma
# Let's inspect along y = 100, 200, 300, 500, 700, 900
foreach ($y in @(100, 250, 400, 550, 700, 850)) {
    $line = ("y={0,3}: " -f $y)
    for ($x = 0; $x -lt $w; $x += 40) {
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
