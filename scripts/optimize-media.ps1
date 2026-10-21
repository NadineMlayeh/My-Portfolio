# Run from the portfolio root with FFmpeg installed. Originals are never modified.
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$publicRoot = Join-Path $projectRoot 'public'
$outputRoot = Join-Path $publicRoot 'optimized'
New-Item -ItemType Directory -Force $outputRoot | Out-Null
foreach ($image in Get-ChildItem (Join-Path $publicRoot 'projects') -Recurse -Filter '*.png') {
  $relative = $image.FullName.Substring($publicRoot.Length + 1)
  $target = Join-Path $outputRoot ([IO.Path]::ChangeExtension($relative, '.webp'))
  New-Item -ItemType Directory -Force (Split-Path $target) | Out-Null
  & ffmpeg -hide_banner -loglevel error -y -i $image.FullName -vf "scale='min(1200,iw)':-2" -c:v libwebp -quality 80 $target
  if ($LASTEXITCODE -ne 0) { throw "Failed to optimize $relative" }
}
& ffmpeg -hide_banner -loglevel error -y -i (Join-Path $projectRoot 'assets/portrait-source.png') -vf 'scale=800:-2' -c:v libwebp -quality 87 (Join-Path $outputRoot 'portrait.webp')
if ($LASTEXITCODE -ne 0) { throw 'Portrait optimization failed' }
foreach ($demo in @(@{Source='hakki';Poster='hakki'}, @{Source='life';Poster='life'}, @{Source='innovas';Poster='innova'}, @{Source='electrohamza';Poster='electro'})) {
  $source = Join-Path $publicRoot "projects/$($demo.Source).mp4"
  if (!(Test-Path -LiteralPath $source)) { continue }
  & ffmpeg -hide_banner -loglevel error -y -ss 3 -i $source -frames:v 1 -vf 'scale=960:-2' -c:v libwebp -quality 80 (Join-Path $outputRoot "$($demo.Poster)-poster.webp")
  if ($LASTEXITCODE -ne 0) { throw "Poster generation failed for $($demo.Source)" }
}
& ffmpeg -hide_banner -loglevel error -y -i (Join-Path $publicRoot 'projects/hakki.mp4') -vf "scale='min(1280,iw)':-2,fps=24" -c:v libx264 -preset fast -crf 28 -an -movflags +faststart (Join-Path $outputRoot 'hakki.mp4')
if ($LASTEXITCODE -ne 0) { throw 'Hakki encoding failed' }
