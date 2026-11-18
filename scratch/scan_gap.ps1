Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

Write-Output "--- Scan x between 480 and 540 at y = 200, 300, 400, 480 ---"
foreach ($y in @(200, 300, 400, 480)) {
    $line = ("y={0,3}: " -f $y)
    for ($x = 480; $x -le 540; $x += 4) {
        $c = $bmp.GetPixel($x, $y)
        $line += ("{0,2} " -f $c.G)
    }
    Write-Output $line
}

$bmp.Dispose()
