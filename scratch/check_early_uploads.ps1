Add-Type -AssemblyName System.Drawing
foreach ($name in @('media_1794930029963_a5916eeb.jpg', 'media_1794930213665_f889b9e4.jpg', 'media_1794930346512_760494b2.jpg', 'media_1794931917278_38f16edd.jpg')) {
    $p = "C:/Users/OTS/.gemini/antigravity/brain/0e4decaa-555e-422c-9eb3-aa7afb12ec0f/.user_uploaded/$name"
    $bmp = [System.Drawing.Bitmap]::FromFile($p)
    Write-Output ("{0}: {1} x {2}" -f $name, $bmp.Width, $bmp.Height)
    $bmp.Dispose()
}
