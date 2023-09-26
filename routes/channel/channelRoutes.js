const express = require('express');
const storage = require('../../config/cloudinary');
const multer = require('multer');

const upload = multer({storage});
const {
    addChannelCtrl,
    getChannelsCtrl,
    updateChannelCtrl,
    deleteChannelCtrl
} = require('../../controllers/channel/channelCtrl');

const channelRouter = express.Router();

//Post Channel: /api/loktv/v1/channel
channelRouter.post('/addchannel', upload.single("logo"), addChannelCtrl);

//Get Channels: /api/loktv/v1/channel
channelRouter.get('/getchannels', getChannelsCtrl);

//Update Channel: /api/loktv/v1/channel/updatechannel/:id
channelRouter.put('/updatechannel/:id', updateChannelCtrl);

//Delete Channel: /api/loktv/v1/channel/deletechannel/:id
channelRouter.delete('/deletechannel/:id', deleteChannelCtrl);

module.exports = channelRouter;