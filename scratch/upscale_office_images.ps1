Add-Type -AssemblyName System.Drawing

function Upscale-Image {
    param(
        [string]$Path,
        [double]$Scale = 2.5
    )
    $src = [System.Drawing.Bitmap]::FromFile($Path)
    $newW = [int]($src.Width * $Scale)
    $newH = [int]($src.Height * $Scale)
    
    $dst = New-Object System.Drawing.Bitmap($newW, $newH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($dst)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $g.DrawImage($src, 0, 0, $newW, $newH)
    $g.Dispose()
    $src.Dispose()
    
    # Save as high-quality JPEG
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)
    
    $dst.Save($Path, $codec, $encoderParams)
    $dst.Dispose()
    Write-Output ("Upscaled {0} to {1} x {2}" -f (Split-Path $Path -Leaf), $newW, $newH)
}

Upscale-Image -Path 'D:\MTMS\ppt\public\office\work-env-1.jpg' -Scale 2.5
Upscale-Image -Path 'D:\MTMS\ppt\public\office\work-env-2.jpg' -Scale 2.5
Upscale-Image -Path 'D:\MTMS\ppt\public\office\work-env-3.jpg' -Scale 2.5
Upscale-Image -Path 'D:\MTMS\ppt\public\office\work-env-4.jpg' -Scale 2.5
