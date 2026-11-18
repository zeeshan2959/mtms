Add-Type -AssemblyName System.Drawing
$img = 'D:\MTMS\ppt\public\office\figma_slide9_2560.png'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

Write-Output "Image size: $($bmp.Width) x $($bmp.Height)"

# In this screenshot, let's find the 4 photo rectangles:
# Let's save a test crop of Photo 1, Photo 2, Photo 3, Photo 4 to check clarity
# Photo 1 (left):
# Let's check bounding box:
# Top: around y=210, Left: around x=40..x=280, Bottom: around y=680
# Let's find exact coordinates by scanning edges

# Find Photo 1:
# Top-left of Photo 1 has wood panel or ceiling light
Write-Output "--- Finding photo boundaries ---"

# Let's scan y=400 from x=0 to 1000 to find photo columns
$edges = @()
for ($x = 20; $x -lt 1000; $x++) {
    $c1 = $bmp.GetPixel($x, 400)
    $c2 = $bmp.GetPixel($x+1, 400)
    $diff = [Math]::Abs($c1.R - $c2.R) + [Math]::Abs($c1.G - $c2.G) + [Math]::Abs($c1.B - $c2.B)
    if ($diff -gt 50) {
        $edges += $x
    }
}
Write-Output ("Detected edges along y=400: " + ($edges -join ", "))

$bmp.Dispose()
