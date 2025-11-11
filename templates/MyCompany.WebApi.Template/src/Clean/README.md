# Clean Architecture Template

This folder contains the Clean Architecture variant of the template. It includes:

- Projects: Api, Application, Domain, Infrastructure
- Ready-to-run Docker setup scoped to this architecture
- Focus on separation of concerns with MediatR, validation, mappings, and persistence

## Structure
```
src/Clean
├── Api/
├── Application/
├── Domain/
└── Infrastructure/
```

## Quick start

1) Create solution and add projects
```
./create-solution.ps1
```

2) Build and run locally
```
dotnet build
cd src/Clean/Api
dotnet run
```

3) Run with Docker
```
# from repository root (contains src/ and tests/)
docker compose -f src/Clean/docker-compose.yml up --build
```

API will be available at http://localhost:8080

## Notes
- Dockerfile paths are already set to the Clean projects.
- Update `appsettings.Development.json` for local configuration if needed.
