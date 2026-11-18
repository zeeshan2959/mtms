Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

Write-Output "--- Sampling Background Card 1 (around x=100..450, away from text/cards) ---"
# At y = 60 (above 'Why Us' or below it)
# At y = 180 (gap between 'Why Us' and cards)
foreach ($pt in @(
    @{x=80; y=180},
    @{x=200; y=180},
    @{x=350; y=180},
    @{x=450; y=180},
    @{x=480; y=100}
)) {
    $c = $bmp.GetPixel($pt.x, $pt.y)
    Write-Output ("Card1 x={0,3} y={1,3}: R={2,3} G={3,3} B={4,3}" -f $pt.x, $pt.y, $c.R, $c.G, $c.B)
}

Write-Output "--- Sampling Background Card 2 (around x=550..950, away from text/cards) ---"
# At y = 180 (gap above Row 1 cards in Card 2)
# At y = 350 (gap between Row 1 and Row 2 in Card 2)
# At y = 480 (empty slot in Col 4 Row 2!)
foreach ($pt in @(
    @{x=550; y=180},
    @{x=650; y=180},
    @{x=750; y=180},
    @{x=850; y=180},
    @{x=950; y=180},
    @{x=750; y=450},
    @{x=850; y=450}
)) {
    $c = $bmp.GetPixel($pt.x, $pt.y)
    Write-Output ("Card2 x={0,3} y={1,3}: R={2,3} G={3,3} B={4,3}" -f $pt.x, $pt.y, $c.R, $c.G, $c.B)
}

Write-Output "--- Sampling Outside Geometric Wallpaper ---"
foreach ($pt in @(
    @{x=10; y=10},
    @{x=600; y=50},
    @{x=800; y=50},
    @{x=950; y=50},
    @{x=1010; y=300}
)) {
    $c = $bmp.GetPixel($pt.x, $pt.y)
    Write-Output ("Wallpaper x={0,3} y={1,3}: R={2,3} G={3,3} B={4,3}" -f $pt.x, $pt.y, $c.R, $c.G, $c.B)
}

$bmp.Dispose()
