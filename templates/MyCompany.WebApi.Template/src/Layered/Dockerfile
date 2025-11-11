# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY src/Layered/Api/MyService.Api.csproj src/Layered/Api/
COPY src/Layered/Business/MyService.Business.csproj src/Layered/Business/
COPY src/Layered/Data/MyService.Data.csproj src/Layered/Data/
COPY src/Layered/Domain/MyService.Domain.csproj src/Layered/Domain/
RUN dotnet restore src/Layered/Api/MyService.Api.csproj
COPY . .
WORKDIR /src/src/Layered/Api
RUN dotnet build MyService.Api.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish MyService.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "MyService.Api.dll"]
