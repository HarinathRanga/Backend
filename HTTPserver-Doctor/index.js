const express = require("express");

const users = [{
    user:"Harinath",
    kidneys : [{
        healthy : false
    },
    {
        healthy : true
    }]
}];

const app = express();
app.use(express.json());
app.get("/",function(req,res){
    const kidneys = users[0].kidneys;
    const totalKidneys = kidneys.length;
    var healthy = 0;
    for(let i =0;i<kidneys.length;i=i+1){
        if(kidneys[i].healthy){
            healthy = healthy + 1;
        }
    } 
    const unHealthy = totalKidneys - healthy ;
    res.json({
        totalKidneys,
        healthy,
        unHealthy
    });
});

app.post("/",function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        "healthy" : isHealthy
    });
    res.json({
        message : "Done"
    })
});

// app.put("/",function(req,res){

// });

// app.delete("/",function(req,res){

// });

app.listen(3000);