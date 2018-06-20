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

    //MySQL connection and insta
    const mysql = require('mysql');
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "rahul123",
      database: "FirstDatabase"
    })

    //JSON body parser
    var bodyParser = require('body-parser');
    app.use(bodyParser.json({ type: 'application/json' }));
    app.use(bodyParser.json())

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    var router = express.Router();

      // test route
      router.get('/', function(req, res) {
        res.json({ message: 'welcome to our upload module apis' });
      });
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
             res.json(rows);
          })
        })

        app.post('/addNewUser', (req, res) => {
          console.log("Analysing user with emailaddress: " + req.body.email_address + req.body.password);

          const userEmailAddress = req.body.email_address
          const userPassword = req.body.password
          const checkUserQuery = "SELECT * FROM users WHERE email_address = ? AND password = ?"
           var query = connection.query(checkUserQuery,[userEmailAddress,userPassword],function (err,results,fields) {
            
              if (results.length  > 0) {
                console.log('Already exists');
                return  res.json({
                 success: true,
                 message:"User Already registered",
                 user: results
                });
            
            } else {
              if(req.body.email_address && req.body.password && req.body.first_name && req.body.last_name != null){
                console.log('insert successfully ');
                var query = connection.query (
                    'INSERT INTO users '+
                    'SET email_address = ?, password = ?, first_name = ?, last_name = ?',
                    [req.body.email_address, req.body.password, req.body.first_name, req.body.last_name]
                );
                return res.json(
                  {
                    message: 'Registered Successfully',
                    error: false
                  }
                )
              }
              else{
                return res.json(
                  {
                    message: 'Unsufficient details provided.',
                    error: true
                  }
                )
              }
                    
            }
              //res.json(rows);
              
            
          });
          console.log(query.sql);

          
          //route to handle user registration
//router.post('/register',login.register);
//router.post('/login',login.login)
// app.use('/api', router);

// exports.register = function(req,res){
//   // console.log("req",req.body);
//   var today = new Date();
//   var users={
//     "first_name":req.body.first_name,
//     "last_name":req.body.last_name,
//     "email":req.body.email,
//     "password":req.body.password,
//     "created":today,
//     "modified":today
//   }
//   connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
//   if (error) {
//     console.log("error ocurred",error);
//     res.send({
//       "code":400,
//       "failed":"error ocurred"
//     })
//   }else{
//     console.log('The solution is: ', results);
//     res.send({
//       "code":200,
//       "success":"user registered sucessfully"
//         });
//   }
//   });
// }

// exports.login = function(req,res){
//   var email= req.body.email;
//   var password = req.body.password;
//   connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
//   if (error) {
//     // console.log("error ocurred",error);
//     res.send({
//       "code":400,
//       "failed":"error ocurred"
//     })
//   }else{
//     // console.log('The solution is: ', results);
//     if(results.length >0){
//       if([0].password == password){
//         res.send({
//           "code":200,
//           "success":"login sucessfull"
//             });
//       }
//       else{
//         res.send({
//           "code":204,
//           "success":"Email and password does not match"
//             });
//       }
//     }
//     else{
//       res.send({
//         "code":204,
//         "success":"Email does not exits"
//           });
//     }
//   }
//   });
// }

            // console.log("successfully created user");
            // res.json(req.body);
                    

          // if(!req.body.name){
          //   return res.json(
          //     {
          //       message: 'name missing',
          //       error: true
          //     }
          //   )
          // }
          // else{
          //   return res.json(
          //     {
          //       message: 'name present',
          //       error: false
          //     }
          //   )
          // }


        });


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
