#!/usr/bin/env pwsh
# Script to push games to GitHub in small batches

$batchSize = 15
$batchNum = 3

# Get all untracked game directories
$untrackedHTML = git ls-files --others --exclude-standard "public/games/html" | Where-Object { $_ -match "public/games/html/[^/]+/" } | ForEach-Object { ($_ -split "/")[0..2] -join "/" } | Select-Object -Unique
$untrackedSWF = git ls-files --others --exclude-standard "public/games/swf" | Where-Object { $_ -match "public/games/swf/[^/]+/" } | ForEach-Object { ($_ -split "/")[0..2] -join "/" } | Select-Object -Unique

Write-Host "Found $($untrackedHTML.Count) HTML games and $($untrackedSWF.Count) SWF games to push"

# Push HTML games first
for ($i = 0; $i < $untrackedHTML.Count; $i += $batchSize) {
    $batch = $untrackedHTML[$i..[Math]::Min($i + $batchSize - 1, $untrackedHTML.Count - 1)]
    
    Write-Host "`n=== Batch $batchNum: Adding $($batch.Count) HTML games ===" -ForegroundColor Cyan
    
    foreach ($dir in $batch) {
        git add "$dir"
    }
    
    git commit -m "feat: add games batch $batchNum ($($batch.Count) HTML games)"
    
    Write-Host "Pushing batch $batchNum..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Push failed! Exiting." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Batch $batchNum pushed successfully!" -ForegroundColor Green
    $batchNum++
    
    Start-Sleep -Seconds 2
}

# Push SWF games
for ($i = 0; $i < $untrackedSWF.Count; $i += $batchSize) {
    $batch = $untrackedSWF[$i..[Math]::Min($i + $batchSize - 1, $untrackedSWF.Count - 1)]
    
    Write-Host "`n=== Batch $batchNum: Adding $($batch.Count) SWF games ===" -ForegroundColor Cyan
    
    foreach ($dir in $batch) {
        git add "$dir"
    }
    
    git commit -m "feat: add games batch $batchNum ($($batch.Count) SWF games)"
    
    Write-Host "Pushing batch $batchNum..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Push failed! Exiting." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Batch $batchNum pushed successfully!" -ForegroundColor Green
    $batchNum++
    
    Start-Sleep -Seconds 2
}

Write-Host "`n=== All games pushed successfully! ===" -ForegroundColor Green
