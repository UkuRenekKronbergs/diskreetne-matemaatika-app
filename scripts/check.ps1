$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
Push-Location $root

try {
  Write-Host 'Checking JavaScript syntax...'
  Get-ChildItem -Path 'js' -Recurse -Filter '*.js' | ForEach-Object {
    node --check $_.FullName
  }
  node --check 'service-worker.js'

  Write-Host 'Checking JSON files...'
  @('manifest.webmanifest', 'data/extracted.json') | ForEach-Object {
    if (Test-Path $_) {
      node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8'))" $_
    } else {
      Write-Host "Skipping optional file: $_"
    }
  }

  if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host 'Checking diff whitespace...'
    git diff --check
    git diff --cached --check
  }

  Write-Host 'All checks passed.'
} finally {
  Pop-Location
}
