FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

ENV OPENAI_API_KEY=dummy_key
ENV DATABASE_URL=postgres://user:password@db:5432/notes


RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]