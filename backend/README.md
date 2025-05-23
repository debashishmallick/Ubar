# User API Documentation

## POST `/user/register`

Register a new user account in the system.

### Request Format

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"        // Optional
  },
  "email": "john@example.com",
  "password": "password123"
}
```

### Validation Rules

- **firstName**: Required, minimum 3 characters
- **lastName**: Optional, but if provided must be minimum 3 characters
- **email**: Required, must be a valid email format
- **password**: Required, minimum 6 characters

### Responses

#### Success Response (201 Created)

```json
{
  "user": {
    "_id": "647d85e810c1a8785a889f23",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "soketId": null,
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdkODVlODEwYzFhODc4NWE4ODlmMjMiLCJpYXQiOjE2ODU5NTQ0NzJ9.qwertyuiopasdfghjklzxcvbnm"
}
```

#### Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters",
      "param": "fullName.firstName",
      "location": "body"
    }
  ]
}
```

#### Server Error (500 Internal Server Error)

```json
{
  "message": "Error generating token"
}
```

---

## POST `/user/login`

Authenticate an existing user and retrieve a JWT token.

### Request Format

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Validation Rules

- **email**: Required, must be a valid email format
- **password**: Required, minimum 6 characters

### Responses

#### Success Response (200 OK)

```json
{
  "user": {
    "_id": "647d85e810c1a8785a889f23",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "soketId": null,
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdkODVlODEwYzFhODc4NWE4ODlmMjMiLCJpYXQiOjE2ODU5NTQ0NzJ9.qwertyuiopasdfghjklzxcvbnm"
}
```

#### Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Authentication Error (401 Unauthorized)

```json
{
  "message": "Invalid email or password"
}
```

---

## GET `/user/profile`

Retrieve the profile of the authenticated user.

### Request Format

No request body is required. The user must provide a valid JWT token in the `Authorization` header or as a cookie.

### Responses

#### Success Response (200 OK)

```json
{
  "_id": "647d85e810c1a8785a889f23",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "soketId": null,
  "__v": 0
}
```

#### Authentication Error (401 Unauthorized)

```json
{
  "message": "Unauthorized access"
}
```

---

## GET `/user/logout`

Log out the authenticated user by clearing the token and blacklisting it.

### Request Format

No request body is required. The user must provide a valid JWT token in the `Authorization` header or as a cookie.

### Responses

#### Success Response (200 OK)

```json
{
  "message": "Logged out successfully"
}
```

#### Authentication Error (401 Unauthorized)

```json
{
  "message": "Unauthorized access"
}
```

---

### Example Requests

#### Register User

```bash
curl -X POST http://localhost:3000/user/register \
-H "Content-Type: application/json" \
-d '{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}'
```

#### Login User

```bash
curl -X POST http://localhost:3000/user/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john@example.com",
  "password": "password123"
}'
```

#### Get User Profile

```bash
curl -X GET http://localhost:3000/user/profile \
-H "Authorization: Bearer <JWT_TOKEN>"
```

#### Logout User

```bash
curl -X GET http://localhost:3000/user/logout \
-H "Authorization: Bearer <JWT_TOKEN>"
```

---

### Security Notes

- Passwords are hashed using bcrypt before storage.
- JWT tokens are generated upon successful authentication.
- Email addresses must be unique in the system.
- Blacklisted tokens are stored to prevent reuse after logout.