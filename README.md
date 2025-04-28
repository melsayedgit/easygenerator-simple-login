![eg-icon](https://github.com/user-attachments/assets/aef46dd0-dbb8-4134-9551-04a51e50b4d3)

# Easygenerator Login

A production-ready user authentication module built with React (TypeScript) and NestJS (MongoDB).

## API Documentation

| Method | Endpoint            | Desc                     | Protected | Request Body                          | Response       |
| ------ | ------------------- | ------------------------ | --------- | ------------------------------------- | -------------- |
| POST   | `/auth/signup`      | Register user            | No        | `{email,password,profile:{name,bio}}` | `{201}`        |
| POST   | `/auth/signin`      | Login user               | No        | `{email, password}`                   | `{acesstoken}` |
| GET    | `/usere/my-details` | Welcome Page (Protected) | Yes       | None                                  | `{User}`       |

## Features

- **Logging**: pino for request/error logs.
- **Security**: Bcrypt for password hashing, JWT and Refresh token passport, rate limiting.
- **Error Handling**: Consistent error responses.
- **Testing**: Jest.
- **CI/CD**: Vercal,github Actions.

## Tech Stack

- **Frontend**: React, TypeScript, MUI, axios,ZOD.
- **Backend**: NestJS, MongoDB, Passport.

```bash
pnpm install
pnpm dev
```
Access the app at http://localhost:5173 after setup [dev mode].

.env
```.env
MONGO_URL=mongodb://localhost:27017/easy-generator
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secretv
```
