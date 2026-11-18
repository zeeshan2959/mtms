Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\browser_evidence\c1394840-d496-4191-b657-d2d1fe10f0c6\final_step_31.png'
if (Test-Path $img) {
    $bmp = [System.Drawing.Bitmap]::FromFile($img)
    Write-Output ("final_step_31: {0} x {1}" -f $bmp.Width, $bmp.Height)
    $bmp.Dispose()
} else {
    Write-Output "Not found"
}
