Add-Type -AssemblyName System.Drawing
$img = 'C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795011230377_3cdceb3d.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($img)

Write-Output "--- Finding 'Why Us' text bounding box ---"
$textPts = @()
for ($y = 40; $y -le 150; $y++) {
    for ($x = 40; $x -le 350; $x++) {
        $c = $bmp.GetPixel($x, $y)
        $lum = [int](0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B)
        if ($lum -gt 150) {
            $textPts += [PSCustomObject]@{x=$x; y=$y}
        }
    }
}
$minX = ($textPts | Measure-Object -Property x -Minimum).Minimum
$maxX = ($textPts | Measure-Object -Property x -Maximum).Maximum
$minY = ($textPts | Measure-Object -Property y -Minimum).Minimum
$maxY = ($textPts | Measure-Object -Property y -Maximum).Maximum

Write-Output ("'Why Us' text box: x={0}..{1} (w={2}), y={3}..{4} (h={5})" -f $minX, $maxX, ($maxX-$minX), $minY, $maxY, ($maxY-$minY))

$bmp.Dispose()
