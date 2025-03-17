const express=require("express");
const app=express();
const users=[{
    name:"John",
    kidneys:[{
        healthy:true
    },{
        healthy:false
    }]
}];


// GET
app.get("/",function(req,res) {
    const johnKidneys=users[0].kidneys;
    const numberOfKidneys=johnKidneys.length;
    let numberOfHealthyKidneys=0;
    for(i=0;i<johnKidneys.length;i++) {
        if(johnKidneys[i].healthy) {
            numberOfHealthyKidneys++;
        }
    }
    const numberOfUnHealthyKidneys=numberOfKidneys-numberOfHealthyKidneys;
    res.json({
        numberOfKidneys: numberOfKidneys,  // key can be set anything
        numberOfHealthyKidneys,  // both key and val will be set equal to numberOfHealthyKidneys
        numberOfUnHealthyKidneys
    })
})


app.use(express.json());   // middleware.   Without app.use(express.json()), req.body will be undefined or {} when you try to access req.body.isHealthy.

// POST
// POSTMAN
app.post("/",function(req,res) {
    const newKidney=req.body.isHealthy;
    users[0].kidneys.push({
        healthy:newKidney
    })
    res.json({  // Necessary to write res when POST
        msg: "Kidney added successfully",
    })
})

// PUT
// Make all unhealthy kidneys healthy
// Use postman
app.put("/",function(req,res) {
    for(let i=0;i<users[0].kidneys.length;i++) {
        users[0].kidneys[i].healthy=true;
    }
    res.json({});
})

// DELETE
// Delete all kidneys
app.delete("/",function(req,res) {
    // deleting all kidneys
    // users[0].kidneys=[];
    // res.json({});

    // deleting unhealthy kidneys
    const johnKidneys = users[0].kidneys;
    // kind of validation or edge cases if no unhealthy kidneys found. U can also add other edge cases like in put if all the kidneys are healthy only, then no unhealthy will be converted to healthy and so on...
    let hasUnhealthy = false;
    for(let i=0;i<johnKidneys.length;i++) {
        if(!johnKidneys[i].healthy) {
            hasUnhealthy = true;
            break;
        }
    }
    if(!hasUnhealthy) {
        res.status(400).json({
            msg: "No unhealthy kidneys to remove"
        });
        return;
    }

    const newKidneys=[];
    for(let i=0;i<users[0].kidneys.length;i++) {
        if(users[0].kidneys[i].healthy) {
            newKidneys.push(users[0].kidneys[i]);
        }
    }
    users[0].kidneys=newKidneys;
    res.json({
        msg: "Unhealthy Kidney removed successfully"
    });
})

app.listen(3000,()=> {
    console.log("Server is running on port 3000");
});


// req.query, req.body learnt, now search req.params. Also search req.query, req.body if doubt.