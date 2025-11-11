# Vertical Slice Architecture Template

Feature-first structure using CQRS+MediatR with slices in `src/VerticalSlice/Features`.

## Structure
```
src/VerticalSlice
├── Api/
├── Features/
├── Domain/
├── Infrastructure/
└── Shared/
```

## Quick start
```
./create-solution.ps1
 dotnet build
cd src/VerticalSlice/Api
 dotnet run
```

## Docker
```
docker compose -f src/VerticalSlice/docker-compose.yml up --build
```

Swagger: http://localhost:8080/swagger
Health:  http://localhost:8080/health
