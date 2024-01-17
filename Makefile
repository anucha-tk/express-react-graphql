start:
	docker compose --env-file .env up -d
start-mongo:
	docker compose --env-file .env up -d mongodb
stop:
	docker compose stop
down:
	docker compose down
restart:
	docker compose restart
