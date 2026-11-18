Add-Type -AssemblyName System.Drawing
foreach ($f in Get-ChildItem public/office/*.jpg) {
    $bmp = [System.Drawing.Bitmap]::FromFile($f.FullName)
    Write-Output ("{0,-20}: {1} x {2} ({3} KB)" -f $f.Name, $bmp.Width, $bmp.Height, [Math]::Round($f.Length / 1024, 1))
    $bmp.Dispose()
}
