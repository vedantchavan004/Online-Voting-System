var express=require("express");
var bodyParser=require('body-parser');
var path = require('path');
var connection = require('./config');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var candidateController=require('./controllers/candidate-controller');
var adminController=require('./controllers/admin-controller');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})  
app.get('/register.html', function (req, res) {  
    res.sendFile( __dirname + "/" + "register.html" );  
 }) 
app.get('/login.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "login.html" );  
})  
app.get('/votingpage.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "votingpage.html" );  
})
app.get('/contact.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "contact.html" );  
})
app.get('/adminlogin.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "adminlogin.html" );  
}) 
app.get('/howitworks.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "howitworks.html" );  
}) 

app.get('/votingpage', function(req, res, next) {
   var sql='SELECT * FROM candidatelist';
   connection.query(sql, function (err, data, fields) {
   if (err) throw err;
   res.render('votingpage', { title: 'Candiate List', candidateData: data});
});
});

app.get('/adminpage', function(req, res, next) {
   var sql='SELECT * FROM candidatelist';
   connection.query(sql, function (err, data, fields) {
   if (err) throw err;
   res.render('adminpage', { title: 'Candiate List', candidateData: data});
 });
 });

app.get('/resultdata', function(req, res, next) {
   var sql='SELECT * FROM candidatelist ORDER BY votingcount DESC';
   connection.query(sql, function (err, data, fields) {
   if (err) throw err;
   res.render('resultdata', { title: 'Candiate List', candidateData: data});
 });
});
app.get('/delete/:candidate', function(req, res, next) {
   var candidate= req.params.candidate;
     var sql = 'DELETE FROM candidatelist WHERE candidate = ?';
     connection.query(sql, [candidate], function (err, data) {
     if (err) throw err;
     console.log(data.affectedRows + " record(s) updated");
   });
   res.redirect('/adminpage');
 });

var u="";
 app.post('/endpoint', function(req, res){
    var c=req.body.candidate;
   var sql='SELECT * FROM candidatelist where candidate=?';
   connection.query(sql,[c], function (err, data, fields) {
   if (err) throw err;
   console.log(data[0].votingcount);
   var u=data[0].candidate;
   var vcount=data[0].votingcount + 1;
   var update='UPDATE candidatelist SET votingcount = "'+vcount+'" where candidate=?' ;
 connection.query(update,[u], function (err, data, fields) {
 if (err) throw err;
});
});
 
var obj = {};
console.log(req.body.candidate);
// console.log('body:data ' );
res.send(req.body);
});

app.post('/validateUser', function(req, res){
   var c=req.body.username;
  var sql='SELECT * FROM users where username=?';
  connection.query(sql,[c], function (err, data, fields) {
   if(data.length>0)
      res.send("1");
   else
      res.send("0");
});

});


app.post('/validatevoterid', function(req, res){
   var v=req.body.voterID;
  var pql='SELECT * FROM voteridinfo where voterID=?';
  connection.query(pql,[v], function (err, data, fields) {
   if(data.length>0)     
      res.send("1");  
   else
      res.send("0");
});
});
app.post('/validatevoterid1', function(req, res){
   var i=req.body.voterID;
  var mql='SELECT * FROM users where voterID=?';
  connection.query(mql,[i], function (err, data, fields) {
   if(data.length>0)     
      res.send("1");  
   else
      res.send("0");
});
});
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
app.post('/controllers/candidate-controller', candidateController.add);
app.post('/controllers/admin-controller', adminController.admin);
app.listen(9000);
console.log("App is listening on port 9000");