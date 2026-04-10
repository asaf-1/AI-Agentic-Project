$ErrorActionPreference = "Stop"

Write-Host "[pre-push] Running local Playwright suite..."
npm.cmd run test:e2e
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host "[pre-push] Running local Docker build..."
docker build -t ai-agentic-project-prepush .
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host "[pre-push] Local validation passed. Push may continue."
