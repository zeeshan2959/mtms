Add-Type -AssemblyName System.Drawing
$img = 'D:\MTMS\ppt\public\office\figma_slide9_2560.png'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

# Let's inspect where the 4 photos are located:
# In the 1024x822 image:
# Where is the title "Excellent Work Environment"?
Write-Output "--- Finding photo regions ---"

# Let's sample along y = 400 across x from 50 to 950
# Photo 1 (left) is around x = 50..300
# Photo 2 & 3 (middle) are around x = 320..520
# Photo 4 (right) is around x = 540..950

# Let's scan y at x = 180 (inside Photo 1)
$p1Top = 0; $p1Bot = 0
for ($y = 150; $y -lt 700; $y++) {
    $c = $bmp.GetPixel(180, $y)
    # Inside Photo 1, wall is warm orange/brown or floor is white
    if ($p1Top -eq 0 -and ($c.R -gt 80 -or $c.G -gt 60 -or $c.B -gt 50)) {
        $p1Top = $y
    }
    if ($p1Top -gt 0 -and ($c.R -lt 20 -and $c.G -lt 25 -and $c.B -lt 35)) {
        $p1Bot = $y
        break
    }
}
Write-Output ("Photo 1 Y bounds at x=180: {0} to {1}" -f $p1Top, $p1Bot)

# Now scan x at y = 350
$p1Left = 0; $p1Right = 0
for ($x = 20; $x -lt 400; $x++) {
    $c = $bmp.GetPixel($x, 350)
    if ($p1Left -eq 0 -and ($c.R -gt 60 -or $c.G -gt 60 -or $c.B -gt 60)) {
        $p1Left = $x
    }
    if ($p1Left -gt 0 -and ($c.R -lt 25 -and $c.G -lt 30 -and $c.B -lt 40)) {
        $p1Right = $x
        break
    }
}
Write-Output ("Photo 1 X bounds at y=350: {0} to {1}" -f $p1Left, $p1Right)

$bmp.Dispose()
