FROM golang:1.26-alpine AS build
WORKDIR /src
COPY main.go .
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /demo main.go

FROM mcr.microsoft.com/azurelinux/base/core:3.0
COPY --from=build /demo /demo
USER 10001:10001
HEALTHCHECK CMD ["/demo", "health"]
ENTRYPOINT ["/demo"]
