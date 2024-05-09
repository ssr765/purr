FROM node:20.13.0-alpine3.19 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# etapa de producción
FROM httpd:2.4-alpine as production-stage
COPY --from=build-stage /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
CMD ["httpd", "-D", "FOREGROUND"]