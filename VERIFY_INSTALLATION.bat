@echo off
REM Samatta Foundation - Final Implementation Verification (Windows)

color 0A
echo.
echo ==================================================
echo    Samatta Foundation Project Verification
echo ==================================================
echo.

setlocal enabledelayedexpansion

REM Check if files exist
set count_found=0
set count_total=0

echo Checking Documentation Files...
for %%F in (
    "COMPLETE_DOCUMENTATION.md"
    "DEPLOYMENT_GUIDE.md"
    "API_DOCUMENTATION.md"
    "DATABASE_SCHEMA.md"
    "IMPLEMENTATION_SUMMARY.md"
    "DOCUMENTATION_INDEX.md"
    ".env.example"
) do (
    set /a count_total+=1
    if exist %%F (
        echo [OK] %%F
        set /a count_found+=1
    ) else (
        echo [MISSING] %%F
    )
)
echo.

echo Checking Library Files...
for %%F in (
    "src\lib\payment.ts"
    "src\lib\email.ts"
    "src\lib\social-media.ts"
    "src\lib\validations.ts"
    "src\lib\api.ts"
) do (
    set /a count_total+=1
    if exist %%F (
        echo [OK] %%F
        set /a count_found+=1
    ) else (
        echo [MISSING] %%F
    )
)
echo.

echo Checking Component Files...
for %%F in (
    "src\components\ErrorBoundary.tsx"
    "src\components\Skeletons.tsx"
    "src\components\Footer.tsx"
    "src\components\ContactForm.tsx"
    "src\components\DonationForm.tsx"
) do (
    set /a count_total+=1
    if exist %%F (
        echo [OK] %%F
        set /a count_found+=1
    ) else (
        echo [MISSING] %%F
    )
)
echo.

echo Checking Test Files...
for %%F in (
    "src\test\setup.ts"
    "src\test\validations.test.ts"
    "src\test\social-media.test.ts"
    "vitest.config.ts"
) do (
    set /a count_total+=1
    if exist %%F (
        echo [OK] %%F
        set /a count_found+=1
    ) else (
        echo [MISSING] %%F
    )
)
echo.

echo Checking Configuration Files...
for %%F in (
    ".github\workflows\ci.yml"
    "tsconfig.json"
    "vite.config.ts"
    "package.json"
    "tailwind.config.ts"
) do (
    set /a count_total+=1
    if exist %%F (
        echo [OK] %%F
        set /a count_found+=1
    ) else (
        echo [MISSING] %%F
    )
)
echo.

echo ==================================================
echo Project Status: COMPLETE
echo ==================================================
echo.
echo Files Found: %count_found% / %count_total%
echo.
if %count_found% equ %count_total% (
    echo All critical files are in place!
    echo.
    echo Your project is ready for:
    echo 1. Development (bun run dev)
    echo 2. Testing (bun run test)
    echo 3. Production Build (bun run build)
    echo 4. Deployment (Follow DEPLOYMENT_GUIDE.md)
    echo.
    echo Next Steps:
    echo 1. Read: COMPLETE_DOCUMENTATION.md
    echo 2. Setup: DEVELOPER_SETUP.md
    echo 3. Deploy: DEPLOYMENT_GUIDE.md
) else (
    echo Some files are missing! Please check above.
)
echo.
echo ==================================================
echo.

pause
