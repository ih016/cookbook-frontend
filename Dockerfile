# build stage
FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist/cookbook-frontend /usr/share/nginx/html
COPY .nginx/cookbook.conf /etc/nginx/conf.d/cookbook.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]