import { error } from 'console';
import express from 'express';

const app = express();
app.use(express.json())



app.get('/',(req,res)=>{
    res.end("welcom to home");
})



app.get('/greet',(req,res)=>{
    const timestamp = new Date().toString()
   
    res.json({msg:`hi from get endpoint ${timestamp}`})
})



app.get('/greet/:name',(req,res)=>{
    const name = req.params.name;
    console.log(`I got name ${name}`)
    res.json({msg:`got name ${name}`})
})



app.get('/test',async (req,res)=>{
    const name ="Bob";
    try{
        const response = await fetch(`http://localhost:3005/greet/${name}`);
        const data = await response.json();
        
        if(data.msg && data.msg.includes(name)){
            res.json({result:"ok"});
        }else{
            res.json({result:"fail"});
        }
    }catch(error){
        console.log("fetch fai",error);
        res.json({result:"fail"});

    }

})




app.post('/action',async (req,res)=>{
    const {action} = req.body 

    const validAction = ["joke","cat fact"];

    if(!action || !validAction.includes(action)){
        return res.status(400).json({msg:"body is malformed"})
    }
   
     if(action === "joke"){
        try{
            const response = await fetch(`https://official-joke-api.appspot.com/random_joke`)
            const data = await response.json();

            const joke = `${data.setup} ${data.punchline}`.toUpperCase();
            return res.status(200).json({joke});

        }catch{
            console.error("error fetching:",error)
            return res.status(500).json({msg:"faild to fetch"})
        }
    }
    if (action === "cat fact") {
    try {
      const catApiKey = "live_x6BDBCskee0sEyAiO1EwBK5O9qEJOxWJsEFrdzDHNlX6xh6YhnTzCpATq3BbgtiT"
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=11", {
        headers: {
          "x-api-key": catApiKey
        }
      });

      const data = await response.json();

      return res.status(200).json({ length: data.length.toString() }); 
      
    }catch(error){
         console.error("Cat fetch failed:", error);
      return res.status(500).json({ msg: "Failed to fetch cat images" });
    }
  }



 res.status(200).json({ msg: `Action received: ${action}` });
})








app.listen(3005,()=>{
    console.log('Express server running on http://localhost:3005')
})