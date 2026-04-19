import { model, Schema } from "mongoose";

const productSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },

    thumbnail: {
        type: String,
        required: true
    },

    images: [{
        type: String
    }],

    ratings: {
        average: { 
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },

    }, { timestamps: true }
);

const Product = model('Product', productSchema);

export default Product;