import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const categorySchema = new Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            totalPrice: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            }
        }
    ]
},
    {
        timestamps: true,
    }
);


const Category = model('Category', categorySchema);

export default Category;