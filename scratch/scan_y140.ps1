Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

Write-Output "--- Scan y around 135-150 across x=450 to 950 ---"
foreach ($x in @(480, 500, 520, 550, 600, 700, 800, 900, 950)) {
    $foundY = -1
    for ($y = 120; $y -le 165; $y++) {
        $c1 = $bmp.GetPixel($x, $y)
        $c2 = $bmp.GetPixel($x, $y+1)
        # Check gradient in green or blue (border detection)
        $diff = [Math]::Abs($c1.G - $c2.G) + [Math]::Abs($c1.B - $c2.B)
        if ($diff -gt 15) {
            $foundY = $y
            break
        }
    }
    Write-Output ("x={0,3}: border at y={1}" -f $x, $foundY)
}

$bmp.Dispose()
