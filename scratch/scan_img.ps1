Add-Type -AssemblyName System.Drawing
$imgPath = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($imgPath)
$w = $bmp.Width
$h = $bmp.Height

Write-Output "Image size: $w x $h"

# Let's inspect horizontal lines across the image to find card borders and container borders
# For example, let's sample points along x at y = 30, 80, 140, 200, 300, 450, 520
$ySamples = @(25, 50, 100, 140, 180, 250, 350, 450, 520, 545)
foreach ($y in $ySamples) {
    $line = ""
    for ($x = 0; $x -lt $w; $x += 32) {
        $c = $bmp.GetPixel($x, $y)
        # classify: B (black/dark navy), T (teal/green bg facet), C (cyan), W (white/text)
        $lum = [int](0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B)
        if ($lum -lt 15) { $ch = "." }
        elseif ($c.B -gt $c.R + 20 -and $c.B -gt 40) { $ch = "b" }
        elseif ($c.G -gt $c.R + 15 -and $c.G -gt 40) { $ch = "g" }
        elseif ($lum -gt 150) { $ch = "#" }
        else { $ch = ":" }
        $line += $ch
    }
    Write-Output ("y={0,3}: {1}" -f $y, $line)
}

$bmp.Dispose()
