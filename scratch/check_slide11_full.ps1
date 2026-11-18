Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1794942202912_7193032b.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)
$w = $bmp.Width
$h = $bmp.Height
Write-Output "Image size: $w x $h"

# Find image boundaries in media_1794942202912_7193032b.jpg
# Scan y = 20, 100, 300, 500 across x = 450..550 (to find left edge of image)
# and x = 950..1024 (to find right edge of image)

for ($x = 480; $x -le 540; $x += 4) {
    $c = $bmp.GetPixel($x, 300)
    Write-Output ("x={0,3}: R={1,3} G={2,3} B={3,3}" -f $x, $c.R, $c.G, $c.B)
}

# Check top of image at x = 700:
Write-Output "--- Scan y around 0..40 at x = 700 ---"
for ($y = 0; $y -le 40; $y += 5) {
    $c = $bmp.GetPixel(700, $y)
    Write-Output ("y={0,3}: R={1,3} G={2,3} B={3,3}" -f $y, $c.R, $c.G, $c.B)
}

# Check bottom of image at x = 700:
Write-Output "--- Scan y around 530..570 at x = 700 ---"
for ($y = 530; $y -lt $h; $y += 5) {
    $c = $bmp.GetPixel(700, $y)
    Write-Output ("y={0,3}: R={1,3} G={2,3} B={3,3}" -f $y, $c.R, $c.G, $c.B)
}

$bmp.Dispose()
