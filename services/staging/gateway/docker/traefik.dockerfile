FROM traefik:v2.9

COPY ./configs/traefik.toml /etc/traefik/
COPY ./envs/dashboard_basic_auth.env /etc/traefik/
