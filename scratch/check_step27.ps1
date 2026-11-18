Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\c1394840-d496-4191-b657-d2d1fe10f0c6\.system_generated\logs\media\step_27_media_0.png'
if (Test-Path $img) {
    $bmp = [System.Drawing.Bitmap]::FromFile($img)
    Write-Output ("step_27: {0} x {1}" -f $bmp.Width, $bmp.Height)
    $bmp.Dispose()
} else {
    Write-Output "File not found"
}
