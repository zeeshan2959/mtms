Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795014584988_d0e17f87.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)
$w = $bmp.Width
$h = $bmp.Height

Write-Output "Image size: $w x $h"

# Let's find all borders in the image:
# Scan horizontal lines at y = 30, 80, 140, 200, 300, 400, 500
# Look for border pixels where color changes noticeably

function FindBordersInRow($y) {
    $borders = @()
    for ($x = 10; $x -lt ($w - 10); $x++) {
        $c1 = $bmp.GetPixel($x, $y)
        $c2 = $bmp.GetPixel($x+1, $y)
        $diff = [Math]::Abs($c1.R - $c2.R) + [Math]::Abs($c1.G - $c2.G) + [Math]::Abs($c1.B - $c2.B)
        if ($diff -gt 35) {
            $borders += $x
        }
    }
    # group nearby
    $res = @()
    $curr = @()
    foreach ($b in $borders) {
        if ($curr.Count -eq 0 -or ($b - $curr[-1]) -le 8) {
            $curr += $b
        } else {
            $res += [int](($curr | Measure-Object -Average).Average)
            $curr = @($b)
        }
    }
    if ($curr.Count -gt 0) {
        $res += [int](($curr | Measure-Object -Average).Average)
    }
    Write-Output ("y={0,3}: borders at x = {1}" -f $y, ($res -join ", "))
}

foreach ($y in @(40, 80, 120, 160, 200, 250, 300, 350, 400, 450, 500, 540)) {
    FindBordersInRow $y
}

$bmp.Dispose()
