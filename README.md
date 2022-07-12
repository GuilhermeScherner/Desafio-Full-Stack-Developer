# Desafio Full-Stack Developer

### Run Api

- After clone the project install dependencies with poetry

```sh
$ cd api
```

```sh
$ poetry install
```

```sh
$ poetry run python src/main.py
```

- Access swagger
```sh
$ http://localhost:8000/docs
```

### Run Rates Service

- After clone the project install dependencies with poetry

```sh
$ cd rates-service
```

```sh
$ poetry install
```

```sh
$ poetry run python src/main.py
```


### Run Dashboard

- After clone the project install dependencies with yarn

```sh
$ cd frontend
```

```sh
$ yarn
```

- Start the frontend

```sh
$ yarn start
```

- Access site
```sh
$ http://localhost:3000
```


# Run by docker

```sh
$ docker-compose up -d --build
```

- Access swagger api
```sh
$ http://localhost:8000/docs
```

- Access swagger site
```sh
$ http://localhost:8080
```


# Run Test

## Run test api
```sh
$ cd api
```
```sh
$ poetry run pytest
```

## Run test api
```sh
$ cd rates-service
```
```sh
$ poetry run pytest
```
