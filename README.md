# EjercicioInfortec
Ejercicio para Infortec

###
https://www.mocky.io/v2/5808862710000087232b75ac
##Policies
https://www.mocky.io/v2/580891a4100000e8242b75c5

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



