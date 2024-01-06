FROM node:18.13.0 as development
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY ./ ./
RUN npm install
RUN npm run build

FROM node:18.13.0  as production
COPY --from=development /home/node/app/package.json ./package.json
RUN npm install
COPY --from=development /home/node/app/dist ./dist
COPY .env.staging .env
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
