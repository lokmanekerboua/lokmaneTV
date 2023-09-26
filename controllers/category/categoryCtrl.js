const Category = require('../../model/category/Category');
const Channel = require('../../model/channel/Channel');
const appErr = require('../../utils/appErr');


const addCategoryCtrl = async (req, res, next) => {
    const {title} = req.body;
    try {
        const category = await Category.create({title});
        res.json({
            status: 'success',
            data: 'Category has been added'
        })
    } catch
        (error) {
        return next(appErr(error.message))
    }
}

const getCategorysCtrl = async (req, res, next) => {
    try {
        const categoies = await Category.find();
        res.json({
            status: 'success',
            data: categoies
        })
    } catch
        (error) {
        return next(appErr(error.message))
    }
}


const updateCategoryCtrl = async (req, res, next) => {
    const {id} = req.params;
    const {title} = req.body;
    try {
        const category = await Category.findByIdAndUpdate(id, {title});
        res.json({
            status: 'success',
            data: 'update category route'
        })
    } catch
        (error) {
        return next(appErr(error.message))
    }
}


const deleteCategoryCtrl = async (req, res, next) => {
    const {id} = req.params;
    try {
        const channellsToDelete = await Channel.find({category: id});
        await Channel.deleteMany({_id: {$in: channellsToDelete}});
        await Category.findByIdAndDelete(id);
        res.json({
            status: 'success',
            data: 'Category has been delete'
        })
    } catch
        (error) {
        return next(appErr(error.message))
    }
}

module.exports = {
    addCategoryCtrl,
    getCategorysCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl
}