#!/bin/bash

# Quiz Master API Test Script
# Make sure backend is running on http://localhost:5000

API_BASE="http://localhost:5000/api"

echo "==================================="
echo "Quiz Master API Test"
echo "==================================="
echo ""

# Test 1: Health Check
echo "1. Testing Health Check..."
curl -s "$API_BASE/health" | json_pp
echo ""

# Test 2: Register Student
echo "2. Registering Student User..."
STUDENT_RESPONSE=$(curl -s -X POST "$API_BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "email": "student@test.com",
    "password": "student123",
    "role": "student"
  }')
echo "$STUDENT_RESPONSE" | json_pp
STUDENT_TOKEN=$(echo "$STUDENT_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo ""

# Test 3: Register Teacher
echo "3. Registering Teacher User..."
TEACHER_RESPONSE=$(curl -s -X POST "$API_BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Teacher",
    "email": "teacher@test.com",
    "password": "teacher123",
    "role": "teacher"
  }')
echo "$TEACHER_RESPONSE" | json_pp
TEACHER_TOKEN=$(echo "$TEACHER_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo ""

# Test 4: Get Current User (Student)
echo "4. Getting Current User (Student)..."
curl -s "$API_BASE/auth/me" \
  -H "Authorization: Bearer $STUDENT_TOKEN" | json_pp
echo ""

# Test 5: Create Quiz (Teacher)
echo "5. Creating Quiz (Teacher)..."
curl -s -X POST "$API_BASE/quizzes" \
  -H "Authorization: Bearer $TEACHER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Quiz",
    "description": "A test quiz",
    "subject": "Math",
    "questions": [
      {
        "text": "What is 2+2?",
        "options": [
          {"text": "3"},
          {"text": "4"},
          {"text": "5"}
        ],
        "correctOptionIndex": 1,
        "points": 1
      }
    ],
    "isPublished": true
  }' | json_pp
echo ""

# Test 6: List Quizzes (Teacher)
echo "6. Listing Quizzes (Teacher)..."
curl -s "$API_BASE/quizzes" \
  -H "Authorization: Bearer $TEACHER_TOKEN" | json_pp
echo ""

echo "==================================="
echo "Tests Complete!"
echo "==================================="
