const express =require('express'); 
const mongoose=require('mongoose'); 

const indexRouter=require('./app/routes/index'); 


const app=express(); 

app.use(indexRouter); 



const port=process.env.PORT || 5000; 
app.listen(port,()=> {
console.log(`blogy is listening on port ${port}`); 
});

