Add-Type -AssemblyName System.Drawing
$imgPath = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($imgPath)
Write-Output "Image size: $($bmp.Width) x $($bmp.Height)"
$bmp.Dispose()
