Add-Type -AssemblyName System.Drawing
$img1 = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1794942116103_c1f42141.jpg'
$img2 = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'

$bmp1 = [System.Drawing.Bitmap]::FromFile($img1)
$bmp2 = [System.Drawing.Bitmap]::FromFile($img2)

# Check around y = 540..560, x = 450..550 in both images
function CheckDock($bmp, $name) {
    $dockText = $false
    for ($y = 520; $y -lt $bmp.Height; $y++) {
        for ($x = 450; $x -lt 550; $x++) {
            $c = $bmp.GetPixel($x, $y)
            if ($c.R -gt 80 -and $c.G -gt 80 -and $c.B -gt 80) {
                $dockText = $true
                break
            }
        }
        if ($dockText) { break }
    }
    Write-Output ("{0} has dock: {1}" -f $name, $dockText)
}

CheckDock $bmp1 "Img1"
CheckDock $bmp2 "Img2"

$bmp1.Dispose()
$bmp2.Dispose()
