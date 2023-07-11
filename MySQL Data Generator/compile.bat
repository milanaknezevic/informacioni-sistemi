@echo off
echo Compilation started.
echo 	Compiling Engine...
javac engine/*.java
echo 	Compiling Utilities...
javac util/*.java
echo 	Compiling Engine Core...
javac core/*.java
javac core/lang/*.java
javac core/nativetypes/*.java
javac core/config/*.java

echo Compilation finished.
timeout /t 2
