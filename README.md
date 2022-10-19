```
dotnet dev-certs https -ep $env:USERPROFILE\.aspnet\https\ServiceA.pfx -p crypticpassword
dotnet user-secrets -p .\ServiceA\ServiceA.csproj set "Kestrel:Certificates:Production:Password" "crypticpassword"
dotnet dev-certs https --trust

docker-compose -f docker-compose-a.yaml up --build
```

```
dotnet dev-certs https -ep $env:USERPROFILE\.aspnet\https\ServiceB.pfx -p crypticpassword
dotnet user-secrets -p .\ServiceB\ServiceB.csproj set "Kestrel:Certificates:Production:Password" "crypticpassword"
dotnet dev-certs https --trust

docker-compose -f docker-compose-b.yaml up --build
```

// Service A https/http

localport: 4000/4001 docker:5100/5101 envoy:10000

// Service B https/http

localport: 5000/5001 docker:6100/6101 envoy:10000

// Routes https://localhost:5100/sa/weatherforecast
https://localhost:6100/sb/weatherforecast
https://localhost:10000/sa/weatherforecast
https://localhost:10000/sb/weatherforecast
