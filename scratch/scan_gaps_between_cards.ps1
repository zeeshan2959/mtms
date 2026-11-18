Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

Write-Output "--- Scan horizontal slice at y = 220 between x = 400 and x = 520 ---"
for ($x = 400; $x -le 520; $x += 5) {
    $c = $bmp.GetPixel($x, 220)
    Write-Output ("x={0,3}: R={1,3} G={2,3} B={3,3}" -f $x, $c.R, $c.G, $c.B)
}

Write-Output "--- Scan horizontal slice at y = 220 between x = 600 and x = 700 ---"
for ($x = 600; $x -le 700; $x += 5) {
    $c = $bmp.GetPixel($x, 220)
    Write-Output ("x={0,3}: R={1,3} G={2,3} B={3,3}" -f $x, $c.R, $c.G, $c.B)
}

$bmp.Dispose()
