# Quiz Master API Test Script (PowerShell)
# Make sure backend is running on http://localhost:5000

$API_BASE = "http://localhost:5000/api"

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Quiz Master API Test" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "1. Testing Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_BASE/health" -Method Get
    $response | ConvertTo-Json
    Write-Host "✓ Health check passed" -ForegroundColor Green
} catch {
    Write-Host "✗ Health check failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test 2: Register Student
Write-Host "2. Registering Student User..." -ForegroundColor Yellow
try {
    $studentBody = @{
        name = "Test Student"
        email = "student@test.com"
        password = "student123"
        role = "student"
    } | ConvertTo-Json

    $studentResponse = Invoke-RestMethod -Uri "$API_BASE/auth/register" -Method Post -Body $studentBody -ContentType "application/json"
    $studentToken = $studentResponse.token
    Write-Host "✓ Student registered successfully" -ForegroundColor Green
    Write-Host "Token: $studentToken"
} catch {
    Write-Host "✗ Student registration failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test 3: Register Teacher
Write-Host "3. Registering Teacher User..." -ForegroundColor Yellow
try {
    $teacherBody = @{
        name = "Test Teacher"
        email = "teacher@test.com"
        password = "teacher123"
        role = "teacher"
    } | ConvertTo-Json

    $teacherResponse = Invoke-RestMethod -Uri "$API_BASE/auth/register" -Method Post -Body $teacherBody -ContentType "application/json"
    $teacherToken = $teacherResponse.token
    Write-Host "✓ Teacher registered successfully" -ForegroundColor Green
    Write-Host "Token: $teacherToken"
} catch {
    Write-Host "✗ Teacher registration failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test 4: Get Current User (Student)
Write-Host "4. Getting Current User (Student)..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $studentToken"
    }
    $meResponse = Invoke-RestMethod -Uri "$API_BASE/auth/me" -Method Get -Headers $headers
    $meResponse | ConvertTo-Json
    Write-Host "✓ User info retrieved" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to get user info: $_" -ForegroundColor Red
}
Write-Host ""

# Test 5: Create Quiz (Teacher)
Write-Host "5. Creating Quiz (Teacher)..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $teacherToken"
    }
    $quizBody = @{
        title = "Test Quiz"
        description = "A test quiz"
        subject = "Math"
        questions = @(
            @{
                text = "What is 2+2?"
                options = @(
                    @{ text = "3" }
                    @{ text = "4" }
                    @{ text = "5" }
                )
                correctOptionIndex = 1
                points = 1
            }
        )
        isPublished = $true
    } | ConvertTo-Json -Depth 10

    $quizResponse = Invoke-RestMethod -Uri "$API_BASE/quizzes" -Method Post -Body $quizBody -ContentType "application/json" -Headers $headers
    Write-Host "✓ Quiz created successfully" -ForegroundColor Green
    $quizResponse | ConvertTo-Json
} catch {
    Write-Host "✗ Failed to create quiz: $_" -ForegroundColor Red
}
Write-Host ""

# Test 6: List Quizzes (Teacher)
Write-Host "6. Listing Quizzes (Teacher)..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $teacherToken"
    }
    $quizzesResponse = Invoke-RestMethod -Uri "$API_BASE/quizzes" -Method Get -Headers $headers
    Write-Host "✓ Quizzes retrieved" -ForegroundColor Green
    $quizzesResponse | ConvertTo-Json
} catch {
    Write-Host "✗ Failed to list quizzes: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Tests Complete!" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
