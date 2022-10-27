# mysql-connector
[![Build Status](https://travis-ci.org/pteyssedre/mysql-connector.svg?branch=master)](https://travis-ci.org/pteyssedre/mysql-connector) [![Coverage Status](https://coveralls.io/repos/github/pteyssedre/mysql-connector/badge.svg?branch=master)](https://coveralls.io/github/pteyssedre/mysql-connector?branch=master) [![David-dm](https://david-dm.org/pteyssedre/mysql-connector.svg)](https://david-dm.org/pteyssedre/mysql-connector.svg)

NodeJs mysql helper. This library will help you to manage connection and operation with your MySQL server. Base 
on [mysql](https://github.com/mysqljs/mysql) module, this library add helpers to simply you interaction with the data layer
of your application

## Introduction

To install simply run the `npm install` command
```bash
npm i mysqlconnector
```

The library offer two main approach of a SQL operation: `query` and `transaction`  
To connect to the database you have to use the `MySqlConnection` class
````typescript
    // const connection = new MySqlConnection('localhost', 'username', 'password');
    const connection = new MySqlConnection({
        hostname: "localhost",
        username: "root",
        password: "",
        port: 3306,
    });  
     
    connection.connectAsync().then(() => { 
        
        connection.queryAsync('SELECT * FROM users').then((results) => {
        
            results.forEach(user => { console.log(user); });
            
            connection.closeAsync().then(() => { console.log('connection closed'); })
          });
     });
````

The use of `Promise` simplify the use of the `MySqlConnection` object
````typescript
    const connection = new MySqlConnection({
            hostname: "localhost",
            username: "root",
            password: "root"
        });
     
    connection.connectAsync()
        .then(() => { })
        .catch((exception) => {
            console.error('something bad happened', exception)
        });
````

The same goes for the use of a query

````typescript
    const connection = new MySqlConnection({
        hostname: "localhost",
        username: "root",
        password: "root"
    });
     
     ...
     
    connection.queryAsync('SELECT * FROM user')
        .then((results) => {
            ...
         })
        .catch((exception) => {
            console.error('something bad happened',exception)
        });
````

## Helpers

To simplify basic queries like `create`, `drop`, `insert`, `select` ... The library contains some query builder than can
be use in a fluent way  
  
Example of select
````typescript
    const query = Select.Table("users");
    console.log(query.toString());
    // SELECT * FROM users
    
    const select = Select.Properties("username", "email").table("users").where("email = 'user@email.com'");
    console.log(select.toString());
    // SELECT username, email FROM users WHERE email = 'user@email.com'
````
  
  
Example of update
````typescript
    
    let user = { username : 'user', email: 'user@email.com' };
    
    user.email = 'user1@email.com';
    
    const update = Update.Table("user").fromModel(user).where("email = 'user@email.com");
    console.log(update.toString());
    // UPDATE user SET username = 'user', email = 'user1@email.com' WHERE email = 'user@email.com'
````

## Transaction

The library contains also a helper for `transaction`. The transaction will be automatically `commit` if no error occurred.
If any thing goes wrong the `rollback` will be executed. Using TypeScript with `async` / `await` it allows you to have
a nicer way to make sure all your operation happen in the same transaction

````typescript
        const mySql = new MySqlConnection({
            hostname: "localhost",
            username: "root",
            password: "root",
            database: "test"
        });
        const dbContext = new DbContext(mySql);
        
        await dbContext.inTransactionAsync(async () => {
            
           await dbContext.executeAsync(Insert.InTo("user").fromModel({
                Email: "user1@email.com",
                FirstName: "toto",
                LastName: "toto",
                username: "toto",
            }).toString());
        });
````

The `dbContext` can be pass to other function and the `inTransactionAsync` function can be call again with impacting the first call,
it still will be one transaction  

````typescript
        const mySql = new MySqlConnection({
            hostname: "localhost",
            username: "root",
            password: "root",
            database: "test"
        });
        const dbContext = new DbContext(mySql);
        
        
        function async addUserAsync(dbContext, user) {
            
            await dbContext.inTransactionAsync(async (dbContext) => {
                
               await dbContext.executeAsync(Insert.InTo("user").fromModel(user).toString());
               
               await this.addPasswordToUserAsync(dbContext)
            });
        }
        
        function async addPasswordToUserAsync(dbContext, user) {
            
            await dbContext.inTransactionAsync(async (dbContext) => {
            
                // Generation of complex password hash
               await dbContext.executeAsync(Insert.InTo("user").property('password', user.password).toString());
               
            });
        }
````