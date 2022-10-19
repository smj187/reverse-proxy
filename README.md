# Envoy with React

A sample project demonstrating how to use Envoy with react and a C# backend

![image](https://i.gyazo.com/18795ae77ce93780469c674063863ba4.png)

## Local-isolated API development

```
// generate dotnet core https certificate
dotnet dev-certs https -ep $env:USERPROFILE\.aspnet\https\ServiceA.pfx -p crypticpassword
dotnet dev-certs https -ep $env:USERPROFILE\.aspnet\https\ServiceB.pfx -p crypticpassword

// set user secret
dotnet user-secrets -p .\ServiceA\ServiceA.csproj set "Kestrel:Certificates:Production:Password" "crypticpassword"
dotnet user-secrets -p .\ServiceA\ServiceB.csproj set "Kestrel:Certificates:Production:Password" "crypticpassword"

// trust generated certificate
dotnet dev-certs https --trust

// run local
cd ServiceA/ && dotnet watch
cd ServiceB/ && dotnet watch

// or with docker compose
docker-compose -f docker-compose-a.yaml up --build
docker-compose -f docker-compose-b.yaml up --build
```

## Envoy setup

1. From the root directory, run the `create-ca-cert.sh` script to generate the
   Certificate Authority.
2. From the root directory, run the `create-cert.sh` script.
3. Add the generated `ca.crt` (from the `keystore` directory) to you machine's
   Trusted Root Certificates (I used this
   [guide](https://support.kaspersky.com/CyberTrace/1.0/en-US/174127.htm)) 4
   Generate pfx

```
openssl pkcs12 -export -out ServiceA/certificates/ServiceA.pfx -inkey .\keystore\server.key -in .\keystore\server.crt
openssl pkcs12 -export -out ServiceB/certificates/ServiceB.pfx -inkey .\keystore\server.key -in .\keystore\server.crt
```

## Run Setup

```
docker-compose -f docker-compose-a.yaml up --build
docker-compose -f docker-compose-b.yaml up --build
docker-compose -f docker-compose-envoy.yaml up --build
cd webapp && pnpm i && pnpm dev
```

## Routes

- `GET` -> https://localhost:10000/health
- `GET` -> https://localhost:10000/sa/weatherforecast
- `GET` -> https://localhost:10000/sb/weatherforecast

## Resources

- [gRPC Web Chat](https://github.com/angelomelonas/grpc-web-chat)
- [Envoy POC implementation](https://github.com/smj187/dotnet-6-envoy-poc)
- [Envoy HTTPS documentation](https://www.envoyproxy.io/docs/envoy/latest/start/quick-start/securing#start-quick-start-securing)
