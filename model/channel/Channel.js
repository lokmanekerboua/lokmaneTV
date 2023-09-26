const mongoose = require('mongoose');
const Category = require('../category/Category');

//create the schemaof channel
const channelSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'channel name is required'],
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        channelurl: {
            type: String,
            required: [true, 'channel url is required'],
            trim: true,
        },
        channelPhoto: {
            type: String,
            required: false,
            default: 'https://res.cloudinary.com/dmujoqmoq/image/upload/v1695481963/samples/channelslogo/pngwing.com_w3l1jo.png',
        }
    },
    {
        timestamps: true,
        toJSON: {virtuals: true},
    }
);

const Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;