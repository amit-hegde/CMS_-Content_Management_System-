const { urlencoded } = require('express');
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const _ = require('lodash');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const opn = require('opn');

const app = express()


app.use(urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static("public"))

app.use(session({
    secret: "our long secret",
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session())

mongoose.connect("mongodb://localhost:27017/factsDB", { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
})
const FactsSchema = {
    title: String,
    content: String
}

AdminSchema.plugin(passportLocalMongoose);


const Admin = mongoose.model("admin", AdminSchema);
const Facts = mongoose.model("post", FactsSchema);

passport.use(Admin.createStrategy());

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());


app.get('/', (req, res) => {
    Facts.find({}, (err, post) => {
        if (err) {
            console.log(err);
        }
        else {

            res.render("home", { Data: post })
        }
    })
})

app.get("/post/:id", (req, res) => {
    let postid = req.params.id;
    Facts.findById(postid, (err, post) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("post", { Title: post.title, Body: post.content })
        }
    })
})

app.get("/admin", (req, res) => {

    if (req.isAuthenticated()) {
        Facts.find({}, (err, post) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render("admin", { Data: post })
            }
        })
    }
    else {
        res.redirect("/admin/login")
    }
})


app.get("/admin/login", (req, res) => {
    res.render("login")
})

app.post("/admin/login", (req, res) => {
    Admin.findOne({ username: req.body.username }, function (err, uname) {
        if (uname) {
            const user = new Admin({
                username: req.body.username,
                password: req.body.password
            });
            passport.authenticate("local", function (err, user) {
                if (err) {
                    console.log(err);
                } else {
                    if (user) {
                        req.login(user, function () {
                            res.redirect("/admin")
                        })
                    } else {
                        res.redirect("/admin/login")
                    }
                }
            })(req, res);
        } else {
            res.redirect("/")
        }
    })
})

app.post("/admin", (req, res) => {
    let data = req.body
    Facts.insertMany({
        title: data.Title,
        content: data.Content
    })
    res.redirect("/admin")
})

app.get("/admin/register", (req, res) => {
    if (req.isAuthenticated()) {

        res.render("create")
    } else {
        // res.redirect("/")
        res.render("create")
    }
})
app.post("/admin/register", function (req, res) {
    Admin.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/admin/register")
        } else {

            res.redirect("/admin")
        }
    })
})


app.post('/admin/logout', (req, res) => {
    req.logout();
    res.redirect("/")
})

app.post("/delete", (req, res) => {

    let id = req.body.id.trim();
    Facts.deleteOne({ _id: id }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/admin")
        }
    })
})

app.listen(3000, () => {
    console.log("server started at localhost:3000")
    opn("http://localhost:3000/")
})