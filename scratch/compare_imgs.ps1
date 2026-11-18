Add-Type -AssemblyName System.Drawing
$img1 = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1794942116103_c1f42141.jpg'
$img2 = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'

$bmp1 = [System.Drawing.Bitmap]::FromFile($img1)
$bmp2 = [System.Drawing.Bitmap]::FromFile($img2)

Write-Output "Img1: $($bmp1.Width) x $($bmp1.Height)"
Write-Output "Img2: $($bmp2.Width) x $($bmp2.Height)"

$bmp1.Dispose()
$bmp2.Dispose()
