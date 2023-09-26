const mongoose = require('mongoose');
const Channel = require('../channel/Channel');

//create the schemaof channel
const categorySchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, 'channel name is required'],
            trim: true,
        },
        channels: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel',
        }],
    },
    {
        timestamps: true,
        toJSON: {virtuals: true},
    }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;