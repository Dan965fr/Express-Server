import express from 'express';

const app = express();


app.get('/',(req,res)=>{
    res.end("welcom to home");
})

app.get('/greet',(req,res)=>{
   
    res.end("msg:hi from get endpoint<timestamp>")
})



app.listen(3005,()=>{
    console.log('Express server running on http://localhost:3005')
})