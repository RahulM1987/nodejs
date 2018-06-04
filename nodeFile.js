// var http = require("http");
//
// http.createServer(function (request, response) {
//
//    // Send the HTTP header
//    // HTTP Status: 200 : OK
//    // Content Type: text/plain
//    response.writeHead(200, {'Content-Type': 'text/plain'});
//    // Send the response body as "Hello World"
//    // var json = JSON.parse(require('fs').readFileSync('./jsonData.json', 'utf8'));
//    // console.log(json);
//    response.end('Hello World\n');
//    response.end(json);
// }).listen(8081);
//
// // Console will print the message
// console.log('Server running at http://127.0.0.1:8081/');
//
//
// // // test/users.test.js
// // var fx = require('node-fixtures');
// // fx.users.dearwish.name; // => "David"
// // console.console.log(fx);

// var http = require('http');
//
// var app = http.createServer(function(req,res){
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify({ a: 1 }, null, 3));
// });
// app.listen(3000);

// alert('Hello');

    const express = require('express')
    const app = express()
    const mysql = require('mysql');
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "rahul123",
      database: "FirstDatabase"
    })


        app.get("/",(req,res) => {
          console.log("Responding to nodejs");
          res.send("Hello from nodejs")
        })

        app.get('/users/:id', (req,res) => {
          console.log("Fetching user with id: " + req.params.id);



          const userid = req.params.id
          const querystring = "SELECT * FROM users WHERE id = ?"
          connection.query(querystring,[userid],(err, rows, fields) => {
            if (err){
              console.log("Failed to get the querystring" + err);
              res.sendStatus(500)
              return
            }

            console.log("I think we fetch user id successfully");
            res.json(rows)

          })

        })



        app.get("/users", (req,res) => {
          // var user1 = {First: "user 1", Second: "Address1"}
          // var user2 = {First: "user 2", Second: "Address2"}
          // res.json([user1,user2])

          connection.query("SELECT * FROM users",(err, rows, fields) => {
            if (err){
              console.log("Failed to get the querystring" + err);
              res.sendStatus(500)
              return
            }

            console.log("I think we fetch users successfully");
            res.json(rows)

          })
        })

        app.get("/adduser/:firstname/:lastname", (req,res) =>{

          const firstname = req.params.firstname
          const lastname = req.params.lastname
          const querystring = "INSERT INTO users (first_name,last_name) VALUES (?,?)"
          connection.query(querystring, [firstname,lastname],(err, rows, fields) => {
            if (err){
              console.log("Failed to get the querystring" + err);
              res.sendStatus(500)
              return
            }

            console.log("successfully inserted values");

          })


        })



        app.listen(3003, () => {
          console.log("Server is up and running on 3003")
        })

// var http=require('http');
//
// var server=http.createServer(function(req,res){
//     res.end('test');
// });
//
// server.on('listening',function(){
//     console.log('ok, server is running');
// });
//
// server.listen(3306);
