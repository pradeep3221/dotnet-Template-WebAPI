# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY src/VerticalSlice/Api/MyService.Api.csproj src/VerticalSlice/Api/
COPY src/VerticalSlice/Features/MyService.Features.csproj src/VerticalSlice/Features/
COPY src/VerticalSlice/Domain/MyService.Domain.csproj src/VerticalSlice/Domain/
COPY src/VerticalSlice/Infrastructure/MyService.Infrastructure.csproj src/VerticalSlice/Infrastructure/
COPY src/VerticalSlice/Shared/MyService.Shared.csproj src/VerticalSlice/Shared/
RUN dotnet restore src/VerticalSlice/Api/MyService.Api.csproj
COPY . .
WORKDIR /src/src/VerticalSlice/Api
RUN dotnet build MyService.Api.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish MyService.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "MyService.Api.dll"]
