@echo off
echo MAKE PANO (NORMAL)

IF "%~1" == "" GOTO ERROR
IF NOT EXIST "%~1" GOTO ERROR

set KRPANOTOOLSEXE=krpanotools64.exe
if "%PROCESSOR_ARCHITECTURE%" == "x86" set KRPANOTOOLSEXE=krpanotools32.exe

"%~dp0\%KRPANOTOOLSEXE%" makepano "%~dp0\templates\normal_custom.config" %1
"%~dp0\%KRPANOTOOLSEXE%" makepreview "%~dp0\templates\normal_custom.config" %1
GOTO DONE

:ERROR
echo.
echo Drag and drop panoramic images to create automatically 
echo normal (not-tiled, not-multiresolution) panoramas from it.

:DONE
echo.
pause
