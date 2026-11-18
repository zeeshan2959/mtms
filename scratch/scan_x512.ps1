Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

Write-Output "--- Scan x around 505-525 across y=30 to 140 ---"
foreach ($y in @(40, 60, 80, 100, 120)) {
    $foundX = -1
    for ($x = 500; $x -le 530; $x++) {
        $c1 = $bmp.GetPixel($x, $y)
        $c2 = $bmp.GetPixel($x+1, $y)
        $diff = [Math]::Abs($c1.G - $c2.G) + [Math]::Abs($c1.B - $c2.B)
        if ($diff -gt 15) {
            $foundX = $x
            break
        }
    }
    Write-Output ("y={0,3}: border at x={1}" -f $y, $foundX)
}

$bmp.Dispose()
