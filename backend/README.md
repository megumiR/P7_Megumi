# Groupomania #

This is the front end and back end server for Project 7 of the Web Developer path.

### Database Prerequisites and Installation ###

You will need to create a table called "user", "post" and "post_likes".

Attributes for each table
"user" : ( id(INT, PRYMARY, AUTO-INCREMENT), name(STRING), email(STRING), password(STRING), roll(STRING) ).
"post"        : ( id(INT, PRYMARY, AUTO-INCREMENT), postname(STRING), comment(STRING), image(BLOB), user_id(INT, FOREIGN) ).
"post_likes"  : ( post_id(INT, FOREIGN, PRYMARY), user_id(INT, FOREIGN, PRYMARY), like(BOOLEAN) ).
Details are at ###MySQL.

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
### MySQL
"user" 
```
    CREATE TABLE user (
       id                     INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
       name                   VARCHAR(30) NOT NULL, 
       email                  VARCHAR(255) NOT NULL UNIQUE,
       password               VARCHAR(100) NOT NULL,
       roll                   VARCHAR(255)
    );
```

"post"  
```
    CREATE TABLE post (
       id                     INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
       postname               VARCHAR(100) NOT NULL,
       comment                VARCHAR(500) NOT NULL,        
       image                  BLOB,
       user_id                INT NOT NULL, 
       FOREIGN KEY            (user_id) REFERENCES user (id)
    );
```

"post_likes"
```
    CREATE TABLE post_likes (
       post_id                INT NOT NULL, 
       user_id                INT NOT NULL, 
       likes                  BOOLEAN NOT NULL,         
       FOREIGN KEY            (post_id) REFERENCES post (id),
       FOREIGN KEY            (user_id) REFERENCES user (id),
       PRIMARY KEY            (user_id, post_id) 
    );
```

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
