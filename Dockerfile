FROM mcr.microsoft.com/playwright:v1.53.1-noble

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install --force
RUN npx playwright install --force