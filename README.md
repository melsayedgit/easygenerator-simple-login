![eg-icon](https://github.com/user-attachments/assets/aef46dd0-dbb8-4134-9551-04a51e50b4d3)
# Easygenerator Login

A production-ready user authentication module built with React (TypeScript) and NestJS (MongoDB).


## API Documentation
| Method | Endpoint           | Desc                     | Protected | Request Body                                      | Response                            |
|--------|--------------------|--------------------------|-----------|-------------------------------------------------|-------------------------------------|
| POST   | `/auth/signup`     | Register user            | No        | `{email, name, password}`                       | `{message, user}`                   |
| POST   | `/auth/signin`     | Login user               | No        | `{email, password}`                             | `{message, token}`                  |
| GET    | `/app/welcome`     | Welcome Page (Protected)         | Yes       | None                                            | `{message}`                         |


##  Features
- **Logging**: Winston for request/error logs.
- **Security**: Bcrypt for password hashing, JWT and Refresh token passport, Helmet, rate limiting.
- **Error Handling**: Consistent error responses.
- **Testing**: Unit and E2E tests (Jest).
- **CI/CD**: GitHub Actions for automated testing.

## Tech Stack
- **Frontend**: React, TypeScript.
- **Backend**: NestJS, MongoDB.

Access the app at `http://localhost:3000` after setup.
