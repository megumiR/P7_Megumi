# Groupomania #

This is the front end and back end server for Project 7 of the Web Developer path.

### Database Prerequisites and Installation ###

You will need to create tables called "user", "post" and "post_likes".

Attributes for each table
"user"        : ( id(INT, PRYMARY, AUTO-INCREMENT), name(STRING), email(STRING), password(STRING), roll(STRING) ).
"post"        : ( id(INT, PRYMARY, AUTO-INCREMENT), postname(STRING), comment(STRING), image(STRING), user_id(INT) ).
"post_likes"  : ( post_id(INT, PRYMARY), user_id(INT, PRYMARY), like(BOOLEAN) ).

Details are at ### MySQL.

### Back end Prerequisites and Installation ###

```
npm install
npm run start
```
You will need to have Node and `npm` installed locally on your machine and then run the server. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.


### Front end Prerequisites and Installation ###

```
npm install
npm run serve
``` 
You will need to have Node and `npm` installed locally on your machine and then run.
The server should run on `localhost` with default port `8080`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 8081`.

### ID of Administrateur 
email: admin@gmail.com
password: 12@Awerty

cf.
### MySQL
Please check the file called "Dump20220608.sql"

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
