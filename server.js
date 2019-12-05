const express =require('express'); 
const mongoose=require('mongoose'); 

const indexRouter=require('./app/routes/index'); 
const articlesRouter=require('./app/routes/articles'); 


const db = require('./config/db')
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> {
    console.log("Connected to MongoDB")
});

const app=express(); 

app.use(indexRouter); 
app.use(articlesRouter); 




const port=process.env.PORT || 5000; 
app.listen(port,()=> {
console.log(`blogy is listening on port ${port}`); 
});

