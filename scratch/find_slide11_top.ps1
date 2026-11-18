Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795014584988_d0e17f87.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

Write-Output "--- Scan vertical profile at x = 750 (inside Right Card) ---"
for ($y = 100; $y -le 180; $y += 5) {
    $c = $bmp.GetPixel(750, $y)
    Write-Output ("y={0,3}: R={1,3} G={2,3} B={3,3}" -f $y, $c.R, $c.G, $c.B)
}

$bmp.Dispose()
