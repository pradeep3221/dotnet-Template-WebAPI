# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
# Copy csproj files per project to leverage layer caching
COPY src/Clean/Api/MyService.Api.csproj src/Clean/Api/
COPY src/Clean/Application/MyService.Application.csproj src/Clean/Application/
COPY src/Clean/Domain/MyService.Domain.csproj src/Clean/Domain/
COPY src/Clean/Infrastructure/MyService.Infrastructure.csproj src/Clean/Infrastructure/
RUN dotnet restore src/Clean/Api/MyService.Api.csproj
# Copy the rest of the source
COPY . .
WORKDIR /src/src/Clean/Api
RUN dotnet build MyService.Api.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish MyService.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "MyService.Api.dll"]
