# Layered Architecture Template

This folder contains the Layered Architecture variant: Api, Business, Data, Domain.

## Structure
```
src/Layered
├── Api/
├── Business/
├── Data/
└── Domain/
```

## Quick start
```
./create-solution.ps1
 dotnet build
cd src/Layered/Api
 dotnet run
```

## Docker
```
docker compose -f src/Layered/docker-compose.yml up --build
```

Swagger: http://localhost:8080/swagger
Health:  http://localhost:8080/health
