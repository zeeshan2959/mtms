Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

# Let's inspect the top borders of the 4 cards in Row 1:
# Card 1, Card 2, Card 3, Card 4
# Let's scan y at x = 140, 360, 580, 800 (center of cards) to find card top and bottom:
foreach ($col in @(
    @{name="Card 1"; x=140},
    @{name="Card 2"; x=350},
    @{name="Card 3"; x=560},
    @{name="Card 4"; x=780}
)) {
    $x = $col.x
    $topY = -1
    $botY = -1
    for ($y = 170; $y -le 240; $y++) {
        $c = $bmp.GetPixel($x, $y)
        # card border has specular white/cyan highlight
        if ($c.R -gt 30 -or $c.G -gt 40 -or $c.B -gt 50) {
            $topY = $y
            break
        }
    }
    for ($y = 300; $y -le 380; $y++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 25 -or $c.G -gt 35 -or $c.B -gt 45) {
            $botY = $y
        }
    }
    Write-Output ("{0} (x={1}): topY={2}, botY={3}" -f $col.name, $x, $topY, $botY)
}

# Now let's find the left and right edges of Card 1, 2, 3, 4 at y = 220:
Write-Output "--- Finding card X ranges at y = 210 ---"
foreach ($col in @(
    @{name="Card 1"; searchX=40..250},
    @{name="Card 2"; searchX=250..470},
    @{name="Card 3"; searchX=470..690},
    @{name="Card 4"; searchX=690..910}
)) {
    # find where card border is
    $pts = @()
    foreach ($x in $col.searchX) {
        $c = $bmp.GetPixel($x, 210)
        # Look for the card hairline border
        if ($c.B -gt 40 -and ($c.R -gt 25 -or $c.G -gt 35)) {
            $pts += $x
        }
    }
    if ($pts.Count -gt 0) {
        Write-Output ("{0}: x range approx {1} to {2}" -f $col.name, $pts[0], $pts[-1])
    }
}

$bmp.Dispose()
