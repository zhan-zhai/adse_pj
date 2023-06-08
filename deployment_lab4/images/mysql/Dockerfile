FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD 123456

COPY sql/*.sql /docker-entrypoint-initdb.d/
