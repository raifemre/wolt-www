FROM node:13.7.0-alpine3.11 as build

COPY . .

RUN npm install --production

RUN npm run build

FROM node:13.7.0-alpine3.11

COPY --from=build package.json package.json
COPY --from=build package-lock.json package-lock.json
COPY --from=build .next .next

RUN npm install --production

EXPOSE 3000

CMD npm start
