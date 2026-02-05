$ErrorActionPreference = "Stop"
Write-Host "Setting up Posh-SSH..."
try {
    if (-not (Get-Module -ListAvailable -Name Posh-SSH)) {
        Write-Host "Installing Posh-SSH..."
        Install-Module -Name Posh-SSH -Force -Scope CurrentUser -AllowClobber -SkipPublisherCheck
    }
    Import-Module Posh-SSH
    Write-Host "Posh-SSH Installed and Imported."
} catch {
    Write-Error "Failed to install Posh-SSH: $_"
}
