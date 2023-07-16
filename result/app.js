var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student_result"
})

con.connect();

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');

// ====================== get result =====================

app.get('/', function (req, res) {
    var data = "select * from result";
    con.query(data, function (error, results, fields) {
        if (error) throw error;
        res.render("index", { results })
    })
})

// ================== add result data ======================

app.post('/', function (req, res) {

    var name = req.body.name;
    var rollnu = req.body.rollnu;
    var sub1 = req.body.sub1;
    var sub2 = req.body.sub2;
    var sub3 = req.body.sub3;
    var sub4 = req.body.sub4;
    var sub5 = req.body.sub5;

    const total = parseInt(sub1) + parseInt(sub2) + parseInt(sub3) + parseInt(sub4) + parseInt(sub5);
    const min = Math.min(sub1, sub2, sub3, sub4, sub5);
    const max = Math.max(sub1, sub2, sub3, sub4, sub5);
    const percentage = ((total / 500) * 100).toFixed(2);
    let grade;

    if (percentage >= 90) {
        grade = 'A+';
    } else if (percentage >= 80) {
        grade = 'A';
    } else if (percentage >= 70) {
        grade = 'B';
    } else if (percentage >= 60) {
        grade = 'C';
    } else if (percentage >= 50) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    var query = "insert into result (name,rollnu,sub1,sub2,sub3,sub4,sub5,total,percentage,min,max,grade) values ('" + name + "','" + rollnu + "','" + sub1 + "','" + sub2 + "','" + sub3 + "','" + sub4 + "','" + sub5 + "','" + total + "','" + percentage + "','" + min + "','" + max + "','" + grade + "')";
    con.query(query, function (error, results, fields) {
        if (error) throw error;
        res.redirect('/');
    })
})

// ================= update =======================

app.get('/update/:id', function (req, res) {
    var id = req.params.id;
    var query = "select * from result where id ='" + id + "'";

    con.query(query, function (error, results, fields) {
        if (error) throw error;
        res.render('update', { results })
    })
})

app.post('/update/:id', function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var rollnu = req.body.rollnu;
    var sub1 = req.body.sub1;
    var sub2 = req.body.sub2;
    var sub3 = req.body.sub3;
    var sub4 = req.body.sub4;
    var sub5 = req.body.sub5;

    const total = parseInt(sub1) + parseInt(sub2) + parseInt(sub3) + parseInt(sub4) + parseInt(sub5);
    const min = Math.min(sub1, sub2, sub3, sub4, sub5);
    const max = Math.max(sub1, sub2, sub3, sub4, sub5);
    const percentage = ((total / 500) * 100).toFixed(2);
    let grade;

    if (percentage >= 90) {
        grade = 'A+';
    } else if (percentage >= 80) {
        grade = 'A';
    } else if (percentage >= 70) {
        grade = 'B';
    } else if (percentage >= 60) {
        grade = 'C';
    } else if (percentage >= 50) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    var query = "update result set name='" + name + "',rollnu='" + rollnu + "',sub1='" + sub1 + "',sub2='" + sub2 + "',sub3='" + sub3 + "',sub4='" + sub4 + "',sub5='" + sub5 + "',total='" + total + "',min='" + min + "',max='" + max + "',percentage='" + percentage + "',grade='" + grade + "' where id='" + id + "' "
    con.query(query, function (error, results, fields) {
        if (error) throw error;

        res.redirect('/');
    })

})

// ================ delete ===================

app.get('/delete/:id', function (req, res) {
    var id = req.params.id;
    var query = "delete from result where id='" + id + "'"
    con.query(query, function (error, results, fields) {
        if (error) throw error;
        res.redirect("/")
    })
})

app.listen(4000);   