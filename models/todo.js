const mongoose = require('mongoose');

// creating a Schema here
const taskSchema = new mongoose.Schema({
    description: {
        type : String,
        required:true

    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    }

});

const Task = mongoose.model('Task',taskSchema);
// exporting the Task here
module.exports=Task;


 