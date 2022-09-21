#!/usr/bin/env zx

const config = {
  name: 'gateway',
  prefix: 'staging',
  paths: {
    docker: path.join(__dirname, '../'),
  },
};

Object.assign(
  process.env,
  {
    DOCKER_BUILDKIT: 1,
    COMPOSE_DOCKER_CLI_BUILD: 1,
    BUILD_APP_PREFIX: config.prefix,
  },
);

// Build application
cd(config.paths.docker)
await $`docker compose --project-name="${config.name}" build --parallel`
await $`docker compose --project-name="${config.name}" push`
await $`docker stack deploy --compose-file docker-compose.yml ${config.name}`
