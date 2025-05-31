FROM mcr.microsoft.com/playwright:v1.42.1-jammy

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install --force
RUN npx playwright install