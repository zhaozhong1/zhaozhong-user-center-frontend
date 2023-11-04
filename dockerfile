FROM nginx

WORKDIR /usr/share/nginx/html/
USER root

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY dist /usr/share/nginx/html/dist

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
