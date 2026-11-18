Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795016228249_4df461c4.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)
$w = $bmp.Width
$h = $bmp.Height
Write-Output "Figma Image Size: $w x $h"

# Let's inspect the step area in detail:
# x around 480 to 540, y around 20 to 180
Write-Output "--- Sampling step at x = 500..530, y = 20..180 ---"
for ($y = 20; $y -le 160; $y += 10) {
    $line = ("y={0,3}: " -f $y)
    for ($x = 490; $x -le 540; $x += 5) {
        $c = $bmp.GetPixel($x, $y)
        $line += ("({0,2},{1,2},{2,2}) " -f $c.R, $c.G, $c.B)
    }
    Write-Output $line
}

# Inspect the right card's glassiness:
# x = 700, y = 200..500
Write-Output "--- Sampling right card pixels at x = 700 ---"
for ($y = 160; $y -le 500; $y += 30) {
    $c = $bmp.GetPixel(700, $y)
    Write-Output ("y={0,3}: R={1,3} G={2,3} B={3,3}" -f $y, $c.R, $c.G, $c.B)
}

# Inspect the left card's pixels:
# x = 200, y = 200..500
Write-Output "--- Sampling left card pixels at x = 200 ---"
for ($y = 160; $y -le 500; $y += 30) {
    $c = $bmp.GetPixel(200, $y)
    Write-Output ("y={0,3}: R={1,3} G={2,3} B={3,3}" -f $y, $c.R, $c.G, $c.B)
}

# Inspect the wallpaper outside at x = 700, y = 50
$cWall = $bmp.GetPixel(700, 50)
Write-Output ("Wallpaper at x=700, y=50: R={0} G={1} B={2}" -f $cWall.R, $cWall.G, $cWall.B)

$bmp.Dispose()
