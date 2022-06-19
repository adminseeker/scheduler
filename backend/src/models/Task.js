const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        default:""
    },
    notify:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:["completed","pending","In Progress","Timeout"],
        default:"pending"
    },
    score:{
        type:Number,
        default:0
    },
    start_time:{
        type:Date,
        default:Date.now
    },
    end_time:{
        type:Date,
        default:Date.now
    },
    user:{
        ref:"User"
    }  
});

module.exports = mongoose.model("Task",TaskSchema);