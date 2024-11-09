FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 5555

CMD ["nginx", "-g", "daemon off;"]
