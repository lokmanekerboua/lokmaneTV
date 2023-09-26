const express = require('express');

const categoryRouter = express.Router();

const {
    addCategoryCtrl,
    getCategorysCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl
} = require('../../controllers/category/categoryCtrl');

//Post Category: /api/loktv/v1/category/addcategory
categoryRouter.post('/addcategory', addCategoryCtrl);

//Get Categorys: /api/loktv/v1/category/getcategorys
categoryRouter.get('/getcategorys', getCategorysCtrl);

//Update Category: /api/loktv/v1/category/updatecategory/:id
categoryRouter.put('/updatecategory/:id', updateCategoryCtrl);

//Delete Category: /api/loktv/v1/category/deletecategory/:id
categoryRouter.delete('/deletecategory/:id', deleteCategoryCtrl);

module.exports = categoryRouter;