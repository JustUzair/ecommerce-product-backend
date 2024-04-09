# [stdv Backend Internship Assignment](https://stdv.notion.site/Backend-Engineer-Assignment-52ce701ca7e240eb841e1f2a84abbf8d)

## Authors

- [@JustUzair](https://www.github.com/JustUzair)

## Implemented Features

- Develop a REST API using Express.js to manage users, characters and relations in a screenplay.
- Implement CRUD operations for characters, relations.
- Used a mongodb cluster to store and retrieve data.
- API is gated by email and password authentication and jsonwebtoken (JWT) and only authorized users can access it (in our case authorized users are admins).
  - This includes:
    - Login
    - Sign Up
      - send custom welcome template when the new user registers.
      - sign up as an admin.
      - sign up as a normal user.
    - Forgot password (Receive reset link on email to reset password)
    - Reset password (Reset link expires after 10 mins of issuance)
    - JWT is embedded into the headers as http-cookie only.
- Security features include but not limited to are:
  - prevention parameter pollution
  - prevention of no-sql query injection
  - Secure http headers with help of [helmet](https://github.com/helmetjs/helmet)
- Implemented multiple types of API routes
  - Public Routes : Accessible by anyone
  - Protected Routes : Accessible by only logged in users
  - Restricted Routes : Accessible by only the users of a particular role (ex : admin)
- Tested API and written API documentation using postman

## Installation and Working of the Project

The API is developed using node version 20
To install and run this this project

```bash
    git clone https://github.com/JustUzair/stdv-backend-assignment.git
    cd stdv-backend-assignment
    npm install
    npm start
```

NOTE : If you encounter any issues while installing the dependencies try installing them using

```bash
    npm install --legacy-peer-deps
```

## API Reference

### Request methods

The request method is the way we distinguish what kind of action our endpoint is being "asked" to perform. For example, `GET` pretty much gives itself. But we also have a few other methods that we use quite often.

| Method   | Description                                                              |
| -------- | ------------------------------------------------------------------------ |
| `GET`    | Used to retrieve a single item or a collection of items.                 |
| `POST`   | Used when creating new items e.g. a new user, post, comment etc.         |
| `PATCH`  | Used to update one or more fields on an item e.g. update e-mail of user. |
| `DELETE` | Used to delete an item.                                                  |

## HTTP Response Status Codes

One of the most important things in an API is how it returns response codes. Each response code means a different thing and consumers of your API rely heavily on these codes.

| Code  | Title                   | Description                                                                                                                                                     |
| ----- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200` | `OK`                    | When a request was successfully processed (e.g. when using `GET`, `PATCH`, `PUT` or `DELETE`).                                                                  |
| `201` | `Created`               | Every time a record has been added to the database (e.g. when creating a new user or post).                                                                     |
| `304` | `Not modified`          | When returning a cached response.                                                                                                                               |
| `400` | `Bad request`           | When the request could not be understood (e.g. invalid syntax).                                                                                                 |
| `401` | `Unauthorized`          | When authentication failed.                                                                                                                                     |
| `403` | `Forbidden`             | When an authenticated user is trying to perform an action, which he/she does not have permission to.                                                            |
| `404` | `Not found`             | When URL or entity is not found.                                                                                                                                |
| `440` | `No accept header`      | When the required "Accept" header is missing from the request.                                                                                                  |
| `422` | `Unprocessable entity`  | Whenever there is something wrong with the request (e.g. missing parameters, validation errors) even though the syntax is correct (ie. `400` is not warranted). |
| `500` | `Internal server error` | When an internal error has happened (e.g. when trying to add/update records in the database fails).                                                             |
| `502` | `Bad Gateway`           | When a necessary third party service is down.                                                                                                                   |

## Documentation

[Refer to the API documentation here](https://documenter.getpostman.com/view/20867739/2s9Xy2Nrip)

## Environment Variables

To run this project, you will need to add the following environment variables to your config.env file

### NOTE - FOR TESTING PURPOSES, THE config.example file is already provided rename it to config.env and it should work just fine

`DATABASE`=`mongodb+srv://JustUzair:<PASSWORD>@cluster0.6v3zt0l.mongodb.net/test`

`DATABASE_PASSWORD`=`MONGODB_CLUSTER_PASSWORD`

`PORT`=`3000`

`JWT_SECRET`=`YOUR_JWT_SECRET_SIGNATURE`

`JWT_EXPIRES_IN`=`90d`

`JWT_COOKIE_EXPIRES_IN`=`90`

`EMAIL_USERNAME`=`YOUR_MAILTRAP_USERNAME`

`EMAIL_PASSWORD`=`YOUR_MAILTRAP_PASSWORD`

`EMAIL_HOST`=`smtp.mailtrap.io`

`EMAIL_PORT`=`2525`

`EMAIL_FROM`=`justuzairsaiyed@gmail.com`

`SENDGRID_USERNAME`=`YOUR_SENDGRID_USERNAME`

`SENDGRID_PASSWORD`=`YOUR_SENDGRID_PASSWORD`
