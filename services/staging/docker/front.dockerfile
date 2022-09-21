FROM nginx:1.21.6-alpine

ARG app_path

COPY ./configs/web.nginx.conf /etc/nginx/conf.d/
COPY ./web/ $app_path/

RUN rm /etc/nginx/conf.d/default.conf \
    && chmod 755 -R $app_path/
