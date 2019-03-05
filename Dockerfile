#THIS IS NOT A PRODUCTION READY FILE
FROM node:11

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .
EXPOSE 8889

CMD ["npm", "run", "start:prod"]
