Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

Write-Output "--- Scan y=130..155 from x=480 to 540 in 2px steps ---"
for ($x = 480; $x -le 540; $x += 4) {
    $line = ("x={0,3}: " -f $x)
    for ($y = 135; $y -le 150; $y += 2) {
        $c = $bmp.GetPixel($x, $y)
        $line += ("{0,2} " -f $c.G)
    }
    Write-Output $line
}

$bmp.Dispose()
