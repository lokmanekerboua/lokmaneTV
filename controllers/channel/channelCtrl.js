const Channel = require('../../model/channel/Channel');
const appErr = require('../../utils/appErr');
const Category = require('../../model/category/Category');

const addChannelCtrl = async (req, res, next) => {
    const {name, category, channelurl} = req.body;
    try {
        let channelPhoto = '';
        if (req.file) {
            channelPhoto = req.file.path;
        }
        const categoryOfChannel = await Category.findById(category)

        const newChannel = await Channel.create({
            name,
            category,
            channelurl,
            channelPhoto
        });

        //add the channel to the category channels array
        categoryOfChannel.channels.push(newChannel._id);
        await categoryOfChannel.save();
        res.json({
            status: 'success',
            data: newChannel
        })
    } catch (error) {
        return next(appErr(error.message))
    }
}

const getChannelsCtrl = async (req, res, next) => {
    try {
        const channels = await Channel.find();
        res.json({
            status: 'success',
            data: channels
        })
    } catch (error) {
        return next(appErr(error.message))
    }
}

const updateChannelCtrl = async (req, res, next) => {
    const {name, category, channelurl} = req.body;
    try {
        const channelToUpdate = await Channel.findById(req.params.id);
        let channelPhoto = '';
        if (req.file) {
            channelPhoto = req.file.path;
        } else {
            channelPhoto = channelToUpdate.channelPhoto
        }

        await Channel.findByIdAndUpdate(req.params.id,
            {
                name,
                category,
                channelurl,
                channelPhoto
            },
            {
                new: true,
                runValidators: true,
            });
        res.json({
            status: 'success',
            data: 'channel has been updated'
        })
    } catch (error) {
        return next(appErr(error.message))
    }
}

const deleteChannelCtrl = async (req, res, next) => {
    try {
        const channelToDelete = await Channel.findById(req.params.id);
        const channelCategory = await Category.findById(channelToDelete.category);
        channelCategory.channels.splice(channelCategory.channels.indexOf(req.params.id), 1);

        await channelToDelete.deleteOne();
        await channelCategory.save();
        res.json({
            status: 'success',
            data: 'channel has been deleted successfully'
        })
    } catch (error) {
        return next(appErr(error.message))
    }
}

module.exports = {
    addChannelCtrl,
    getChannelsCtrl,
    updateChannelCtrl,
    deleteChannelCtrl
}