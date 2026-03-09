import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"

const categorySchema = new Schema({

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


const Category = model('Category', categorySchema);

export default Category;