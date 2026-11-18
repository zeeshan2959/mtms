Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1794942202912_7193032b.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)
$w = $bmp.Width
$h = $bmp.Height

Write-Output "Image size: $w x $h"

# Left Card: find top and bottom of left card at x = 100
for ($y = 0; $y -lt $h; $y += 5) {
    $c = $bmp.GetPixel(100, $y)
    if ($y -lt 60 -or $y -gt 500) {
        Write-Output ("Left card at x=100, y={0,3}: R={1,3} G={2,3} B={3,3}" -f $y, $c.R, $c.G, $c.B)
    }
}

# Right Image: find top and bottom of image at x = 800
Write-Output "--- Right Image at x=800 ---"
for ($y = 0; $y -lt $h; $y += 5) {
    $c = $bmp.GetPixel(800, $y)
    if ($y -lt 60 -or $y -gt 500) {
        Write-Output ("Right image at x=800, y={0,3}: R={1,3} G={2,3} B={3,3}" -f $y, $c.R, $c.G, $c.B)
    }
}

$bmp.Dispose()
