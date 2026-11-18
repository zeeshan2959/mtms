Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

# Row 1 cards are at y around 210 to 330
# Let's find card borders along y = 250
Write-Output "--- Scan card borders across row 1 at y = 250 ---"
$borders = @()
for ($x = 20; $x -lt 1000; $x++) {
    $c1 = $bmp.GetPixel($x, 250)
    $c2 = $bmp.GetPixel($x+1, 250)
    $diff = [Math]::Abs($c1.R - $c2.R) + [Math]::Abs($c1.G - $c2.G) + [Math]::Abs($c1.B - $c2.B)
    if ($diff -gt 40) {
        $borders += $x
    }
}

# Group borders within 10px
$clustered = @()
$current = @()
foreach ($b in $borders) {
    if ($current.Count -eq 0 -or ($b - $current[-1]) -le 12) {
        $current += $b
    } else {
        $avg = [int](($current | Measure-Object -Average).Average)
        $clustered += $avg
        $current = @($b)
    }
}
if ($current.Count -gt 0) {
    $clustered += [int](($current | Measure-Object -Average).Average)
}

Write-Output ("Detected vertical borders at: " + ($clustered -join ", "))

$bmp.Dispose()
