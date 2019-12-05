const express =require('express'); 
const router =express.Router(); 
const Article = require ('../models/article');


//GET ALL ARTICLES 
router.get('/articles',(req,res)=> {
    res.json({message:'welcome to articles'});
}); 

// SHOW ARTICLE BY ID --GET 
router.get('/articles', (req, res) => {
    Article.find({}, (error, articles) => {
        if (!error) { 
            res.status(200).json({ articles: articles });
        } else {
            res.status(500).json({ error: error})
        }
    });
});

// CREATE NEW ARTICLE --POST
// router.post('/articles', (req, res) => {
//     res.json(req.body)
// });


// UPDATE ARTICLE BY ID --PATCH 



// DELETE ARTICLE BY ID --DESTROY 




module.exports=router;