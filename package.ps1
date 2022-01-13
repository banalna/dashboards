#!/usr/bin/env pwsh

# Pack generated static files
if (Test-Path "dist") {
    $compress = @{
        Path             = "./dist/*"
        CompressionLevel = "Optimal" #"NoCompression"
        DestinationPath  = "./public.zip"
    }
    # Archiving
    Compress-Archive @compress

    Write-Host "The archive was successfully created."
} else {
    Write-Host "The dist folder is absent. Run build.ps1 before."
}