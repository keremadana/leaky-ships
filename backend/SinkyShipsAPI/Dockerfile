FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["SinkyShipsAPI/SinkyShipsAPI.csproj", "SinkyShipsAPI/"]
RUN dotnet restore "SinkyShipsAPI/SinkyShipsAPI.csproj"
COPY . .
WORKDIR "/src/SinkyShipsAPI"
RUN dotnet build "SinkyShipsAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SinkyShipsAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SinkyShipsAPI.dll"]
