const express =require('express'); 
const router =express.Router(); 


//GET THE ROOT ROUTE 
router.get('/',(req,res)=> {
    res.json({message:'welcome to blogy'});
}); 



module.exports=router; 