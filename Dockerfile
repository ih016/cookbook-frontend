FROM node:lts-alpine as build-stage

ARG AUTHORITY
ARG CLIENTID
ARG BASEURL
ARG BACKEND

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist/cookbook-frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]