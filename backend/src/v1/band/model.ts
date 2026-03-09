import { model, Schema } from "mongoose";

const bandSchema = new Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },

    description:{
        type:String,
        required:true,
        trim:true,
    },
},
    {
        timestamps: true,
    }
);

const Band = model('Band', bandSchema);

export default Band;