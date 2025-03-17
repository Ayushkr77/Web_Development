const express=require("express");
function sum(a,b) {
    return a+b;
}
const app=express();
app.get("/sum",function(req,res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const ans=sum(a,b);
    // res.send(ans);    // This will cause error   
    res.send(ans.toString());    // or res.json({ result: ans });
})
// app.listen(3001);  In the same file, there cant be two app.listen() statements even with different ports. Neither the routes in app.get can have same path thats why /sum and /calcSum written. Otherwise, the second app.get will override the first one.

function calculateSum(n) {
    let ans=0;
    for(i=1;i<=n;i++) {
        ans+=i;
    }
    return ans;   
}
app.get("/calcSum",function(req,res) {
    const n = parseInt(req.query.n);
    const ans=calculateSum(n);
    // res.send(ans);    
    res.send(ans.toString());    // or res.json({ result: ans });
})

app.get("/",function(req,res) {
    res.send("Hello World");
})
// http://localhost:3000/sum?a=5&b=10
// http://localhost:3000/calcSum?n=5
app.listen(3000, () => {
    console.log("Server running on port 3000");
});