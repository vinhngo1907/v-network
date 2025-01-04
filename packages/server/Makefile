# Define variables
NPM = npm
DOCKER_COMPOSE = docker-compose

# Define the subdirectory where the frontend is located
FRONTEND_DIR = frontend

# Define targets and their commands
.PHONY: install-backend install-frontend start-docker stop-docker setup-database setup-redis start-mongodb start-influxdb

install-backend:
	@cd backend && $(NPM) install

install-view:
	@cd ${FRONTEND_DIR} && $(NPM) install

start-docker:
	$(DOCKER_COMPOSE) up -d

stop-docker:
	$(DOCKER_COMPOSE) down

setup-database:
	# Add commands to set up your database here

setup-redis:
	# Add commands to set up Redis here

start-mongodb:
	# Add commands to start MongoDB here

start-influxdb:
	# Add commands to start InfluxDB here

# Add more targets and commands as needed

