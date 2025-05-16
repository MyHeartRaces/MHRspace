# frontend/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Install dependencies and required packages
RUN npm install && \
    npm install --save-dev @types/js-cookie && \
    npm install @hookform/resolvers
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]