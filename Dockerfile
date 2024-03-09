FROM node:20-alpine as BUILD_IMAGE
WORKDIR /app
COPY . ./
RUN npm install
RUN npm install --save-dev vite
RUN npm run build

FROM node:20-alpine as PRODUCTION_IMAGE
WORKDIR /app
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/package.json ./package.json
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "serve"]
