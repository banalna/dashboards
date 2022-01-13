#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json

# Get buildnumber from github actions
if ($env:GITHUB_RUN_NUMBER -ne $null) {
    $component.build = $env:GITHUB_RUN_NUMBER
    Set-Content -Path "component.json" -Value $($component | ConvertTo-Json)
}

$buildImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-build"
$container=$component.name

# Remove build files
if (Test-Path "dist") {
    Remove-Item -Recurse -Force -Path "dist"
}

# Build docker image
docker build -f docker/Dockerfile.build -t $buildImage .

# Create and copy compiled files, then destroy
docker create --name $container $buildImage
docker cp "$($container):/src/public" ./dist
docker rm $container

if (!(Test-Path ./dist)) {
    Write-Host "dist folder doesn't exist in root dir. Build failed. Watch logs above."
    exit 1
}
