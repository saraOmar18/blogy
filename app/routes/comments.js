// Require necessary NPM Packages
const express = require('express');
// Require Mongoose Model for comments
const Comment = require('../models/comment');
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();
/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/comments
 * Description: Get All comments
 */
router.get('/api/comments', (req, res) => {
    Comment.find()
  .then((comments) => {
    res.status(200).json({ comments: comments });
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});
/**
* Action:       SHOW
* Method:       GET
* URI:          /api/comments/5d664b8b68b4f5092aba18e9
* Description:  Get An comments by comments ID
*/
router.get('api/comments/:id', (req, res) => {
    Comment.findById(req.params.id, (error, comments) => {
      if (!error) {
          // return comments if exist
          if (comments) {
              res.status(200).json({ comments: comments });
          } else {
              // if there is no comments with a matching id
              res.status(404).json({
                  error: {
                      name: 'DocumentNotFoundError',
                      message: 'The provided id doesn\'t match any document'
                  }
              })
          }
      } else {
          res.status(500).json({ error: error });
      }
  })
});

/**
 * Action:      CREATE
 * Method:      POST
 * URI:         /api/comments
 * Description: Create a new comments
*/
router.post('/api/comments', (req, res) => {
    Comment.create(req.body.comments)
  
  .then((comments) => {
    res.status(201).json({ comments: comments });
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});
/**
 * Action:      UPDATE
 * Method:      PATCH
* URI:          /api/comments/5d664b8b68b4f5092aba18e9
* Description:  Update An comments by comments ID
 */
router.patch('api/comments/:id', (req, res) => {
    Comment.findById(req.params.id, (error, comments) => {
      if (!error) {
          if (comments) {
            comments.update(req.body, (error, comments) => {
                  if (!error) {
                      res.status(204).end();
                  } else {
                      res.status(500).json({ error: error })
                  }
              })
          } else {
              res.status(404).json({
                  error: {
                      name: 'DocumentNotFoundError',
                      message: 'The provided id doesn\'t match any document'
                  }
              })
          }
      } else {
          res.status(500).json({ error: error })
      }
  })
});

/**
 * Action:      DESTROY
 * Method:      DELETE
* URI:          /api/comments/5d664b8b68b4f5092aba18e9
* Description: Delete An comments by comments ID
 */
router.delete('/api/comments/:id', (req, res) => {
    Comment.findByid(req.params.id)
      .then((comments) => {
        if(comments) {
          return comments.remove();
        } else {
          // If we couldn't find a document with the matching ID
          res.status(404).json({
            error: {
              name: 'DocumentNotFoundError',
              message: 'The provided ID doesn\'t match any documents'
            }
          });
        }
      })
      .then(() => {
        // If the deletion succeeded, return 204 and no JSON
        res.status(204).end();
      })
      // Catch any errors that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });
  // Export the Router so we can use it in the server.js file
  module.exports = router;