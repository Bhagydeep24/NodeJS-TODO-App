var express=require('express');
var todoController=require('./controller/todocontroller.js')

var app=express();


//Set templates
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controller;
todoController(app);

//listen to PORT
app.listen(5000);
console.log('Listening at port:5000');
