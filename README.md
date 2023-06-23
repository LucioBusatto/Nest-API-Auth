
# API / NEST JS

This project consists of 2 microservices:
 - Auth
 - Users

# Install & Run

Install dependencies
```json
npm i
```

Run
```json
npm run start
```
PD: Needs a mongodb up in 

```json
mongodb://localhost:27017/api
```

# Users
Contains the USER module that handles their CRUDs (connection with the db).
It has no exposed endpoints, can only be access through Auth

# Auth
Contains /login and /register endpoints, both communicate with Users MS via @MessagePattern and require to be authenticated with a JWT (response of /login).


also contains /user/list that list users if previously authenticated.



## Usage/Examples

path
```json
localhost:3200/api/auth/register
```
body
```json
{
  "name" : "batin",
  "password": "safe",
  "email": "batin@gmail.com"
}
```

path
```json
localhost:3200/api/auth/login
```
body
```json
{
  "password": "safe", 
  "email": "batin@gmail.com"
}
```
