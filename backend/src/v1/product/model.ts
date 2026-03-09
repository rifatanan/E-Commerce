import { model, Schema } from "mongoose";

const ProductSchema = new Schema({

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

const Product = model('Product', ProductSchema);

export default Product;