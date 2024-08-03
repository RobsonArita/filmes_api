FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh



EXPOSE 3000

CMD ["/app/start.sh"]
