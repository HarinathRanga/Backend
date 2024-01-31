const express = require("express");

function calculate(n){
    var sum =0;
    for(var i = 1;i<=n;i=i+1){
        sum = sum + i;
    }
    return (sum);
}

const app = express();

app.get("/",function(req,res){
    n = req.query.n;
    var sum = calculate(n);
    res.send("sum of numbers form 1 to "+n.toString() + " is "+sum.toString());
});

app.listen(3000);