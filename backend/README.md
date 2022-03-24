# Groupomania #

This is the front end and back end server for Project 7 of the Web Developer path.

### Database Prerequisites and Installation ###

You will need to create a table called "utilisateur" and it contains attributes like 
( id(INT, PRYMARY, AUTO-INCREMENT), name(STRING), email(STRING), password(STRING), roll(STRING) ).
Also you wiill need a table called "post" which includes attributes like 
( id(INT, PRYMARY, AUTO-INCREMENT), postname(STRING), comment(STRING), image(BLOB), utilisateur_id(INT) ).


### Back end Prerequisites and Installation ###

```
npm install
npm run start
```
You will need to have Node and `npm` installed locally on your machine and then run the server. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

???????install nodemon too?

### Front end Prerequisites and Installation ###

```
npm install
npm run serve
``` 
You will need to have Node and `npm` installed locally on your machine and then run.
The server should run on `localhost` with default port `8080`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 8081`.



cf.
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
