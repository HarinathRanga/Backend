const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPass = "1234567";

const app = express();
app.use(express.json());
const ALL_USERS = [
    {
        usernname : "harinath@gmail.com",
        password : "Hari@123",
        name : "Harinath"
    },
    {
        usernname : "chinna@gmail.com",
        password : "Chinna@123",
        name : "Chitesh chakra"
    },
    {
        usernname : "prakash@gmail.com",
        password : "Prakash@123",
        name : "Prakash raju"
    }
];

function userExists(user,pass){
    for(var i = 0;i<ALL_USERS.length;i++){
        const data = ALL_USERS[i];
        if(data.usernname == user && pass == data.password){
            return true;
        }
    }
    return false;
}

app.post("/signup", function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    if(!userExists(username,password)){
        return res.status(403).json({
            msg : "User not exist"
        });
    }
    var token = jwt.sign({username : username},jwtPass);
    return res.json({
        token
    });
});

app.get("/users",function(req,res){
    const token = req.headers.authorization;
    try {
        const decode = jwt.verify(token,jwtPass);
        const username = decode.username;
        return res.json({
            user : ALL_USERS.filter(function(value){
                if(value.usernname==username){
                    return false;
                } else {
                    return true;
                }
            })
        });
    } catch(err){
        return res.status(403).json({
            msg : "Invalid Token"
        });
    }
});

app.listen(3000);