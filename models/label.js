const mongoose = require("mongoose");

const LabelSchema = new mongoose.Schema({ 
    id:{
        type: Number,
        default: null
    },
    name:{
        type: String,
        default: null
    },
    description:{
        type: String,
        default: null
    },
    description_html:{
        type: String,
        default: null
    },
    text_color:{
        type: String,
        default: null
    },
    color:{
        type: String,
        default: null
    },
    subscribed:{
        type: Boolean,
        default: null
    },
    priority:{
        type: String,
        default: null
    },
    is_project_label:{
        type: Boolean,
        default: null
    },
});

const Label = mongoose.model("Label", LabelSchema);

module.exports = Label;
