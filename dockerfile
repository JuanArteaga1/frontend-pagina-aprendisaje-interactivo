FROM node:24-bullseye

WORKDIR /app-node

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 5173
