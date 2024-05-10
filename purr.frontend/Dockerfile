FROM node:20.13.0-alpine3.19 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN rm -rf .env && mv .env.production .env
RUN npm run build

# etapa de producción
FROM httpd:2.4-alpine as production-stage
COPY --from=build-stage /app/dist /usr/local/apache2/htdocs/
COPY --from=build-stage /app/.htaccess /usr/local/apache2/htdocs/

RUN sed -i 's/#LoadModule\ rewrite_module/LoadModule\ rewrite_module/' /usr/local/apache2/conf/httpd.conf
RUN sed -i 's/AllowOverride\ None/AllowOverride\ All/' /usr/local/apache2/conf/httpd.conf

EXPOSE 80
CMD ["httpd", "-D", "FOREGROUND"]