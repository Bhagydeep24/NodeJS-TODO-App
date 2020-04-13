var bodyParser=require('body-parser');
var mongoose=require('mongoose');

var data=[{item: 'Do homework'},{item: 'Buy groceries from walmart'}, {item: 'Go for a walk'}];
var urlencodedParser=bodyParser.urlencoded({extended:false});

//setup connection to database
mongoose.connect('mongodb+srv://<username>:<password>@todo-scewe.mongodb.net/<databasename>?retryWrites=true&w=majority')

//Create a schema-this is like a blueprint
var todoSchema=new mongoose.Schema({
  item:String
});

var Todo=mongoose.model('Todo',todoSchema);

//Add new dummy data
// var itemOne=Todo({item:'Do homework'}).save(function(err){
//   if(err) throw err;
//   console.log('item saved');
// });

module.exports = function(app){

app.get('/todo',function(req,res){

  //get data from db
  Todo.find({},function(err,data){
    if(err) throw err;
    res.render('todo',{todos:data});
  });
  //res.render('todo',{todos:data});
});

app.post('/todo',urlencodedParser,function(req,res){

  //get data from the view and add it to the db
  var newTodo=Todo(req.body).save(function(err,data){
    if(err) throw err;
    res.json(data);
  });
  // data.push(req.body);
  // res.json(data);
});

app.delete('/todo/:item',function(req,res){
  //delete requested item from db
  Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
    if(err) throw err;
    res.json(data);
  });
  // data=data.filter(function(todo){
  //   return todo.item.replace(/ /g,'-') !==req.params.item;
  // });
  // res.json(data);
});


}
