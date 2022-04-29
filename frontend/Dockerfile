# Stage 1 - build image
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2 - run app
FROM nginx:alpine
COPY --from=node /app/dist/frontend /usr/share/nginx/html
