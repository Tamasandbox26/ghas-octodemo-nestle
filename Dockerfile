FROM node:20.19.0-alpine
LABEL org.opencontainers.image.source="https://github.com/Tamasandbox26/ghas-octodemo-nestle"
LABEL org.opencontainers.image.description="Octodemo GHAS + Defender for Cloud (DCSPM) Demo Application"
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
