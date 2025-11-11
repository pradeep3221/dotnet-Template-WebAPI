# Vertical Slice QuickStart

- Create solution: `./create-solution.ps1`
- Build: `dotnet build`
- Run API: `cd src/VerticalSlice/Api && dotnet run`
- Docker: `docker compose -f src/VerticalSlice/docker-compose.yml up --build`
- Tests: `dotnet test tests/UnitTests && dotnet test tests/IntegrationTests`
