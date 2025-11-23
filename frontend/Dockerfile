FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true
CMD ["npm", "start"]