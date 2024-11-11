@echo off
title Iniciando API Node.js

:: Executar npm install para garantir as dependencias
echo Executando npm install para garantir as dependencias...
call npm install

:: Limpar a tela antes de iniciar a API
cls

echo.
echo ---------------------------------
echo Iniciando a API...

:: Pausa opcional para verificar a execução do script
pause

:: Iniciar o servidor Node.js
start /B npm start

:: Mantém a janela aberta enquanto o servidor estiver rodando
echo.
echo API iniciada com sucesso! Pressione CTRL+C para parar o servidor.
pause >nul
