# User Registration API Documentation

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

### Common Validation Errors Examples

1. **Invalid First Name Length**
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

2. **Invalid Email Format**
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

3. **Invalid Password Length**
```json
{
  "errors": [
    {
      "msg": "Password must be at least 6 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Example Request

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

### Security Notes

- Password is hashed using bcrypt before storage
- JWT token is generated upon successful registration
- Email must be unique in the system