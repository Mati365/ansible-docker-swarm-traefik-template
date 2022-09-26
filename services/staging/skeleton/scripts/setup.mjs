#!/usr/bin/env zx

const config = {
  prefix: 'staging',
  name: argv.name || argv.branch,
  paths: {
    docker: path.join(__dirname, '../'),
    envs: path.join(__dirname, '../envs'),
  },
};

Object.assign(
  process.env,
  {
    DOCKER_BUILDKIT: 1,
    COMPOSE_DOCKER_CLI_BUILD: 1,

    GLOBAL_BASIC_AUTH: await fs.readFile(
      path.join(config.paths.envs, 'basic_auth.env'),
    ),

    BUILD_NAME: config.name,
    BUILD_APP_PREFIX: config.prefix,
  },
);

// Build application
cd(config.paths.docker)
await $`docker compose --project-name="${config.name}" build --parallel`
await $`docker compose --project-name="${config.name}" push`
await $`docker stack deploy --compose-file docker-compose.yml ${config.name}`
