# EjercicioInfortec
Excercise Infortec
- [![Build Status](https://travis-ci.org/david-espinosa-fari/EjercicioInfortec.svg?branch=master)](https://travis-ci.org/david-espinosa-fari/EjercicioInfortec)

[![Actions Status](https://github.com/github/EjercicioInfortec/workflows/Node.jsCI/badge.svg)](https://github.com/github/EjercicioInfortec/actions)

![](https://github.com/actions/hello-world/workflows/Greet%20Everyone/badge.svg)
## How to
### Clon proyect
- `git clone https://github.com/david-espinosa-fari/EjercicioInfortec.git`
- cd EjercicioInfortec/App

### Install
- `npm install`

### Run
- `npm start` 

POST /login
body{username=david,password=a}
return token

GET the list of policies linked to a user name
GET /user/:name/policies
headers{
Authorization:token
}

Get user data filtered by user id
GET /user
headers{
Authorization:token
}
query{id=xxxx}

Get user data filtered by user name
GET /user
headers{
Authorization:token
}
query{name=xxxx}
return list of user with name

Get user linked to a police number
GET /policies/:number/user
headers{
Authorization:token
}
### test
- `npm run test`

#### Notas
Although I have already put it in the commit, I put it here too.
In the login, it was not clear which field to compare because "name" could be repeated and "email" probably also, so what I did was to create a fakeUserAdmin object for authentication.

The logic to follow in a real case would be to search the user in a database or wherever, obtain the password identifier, go to the password database with the ID and obtain the password to compare it with the request, from there, build the token and return it if everything ok   


