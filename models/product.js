import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true
    },
    productName : {
        type : String,
        required : true,
    },
    altName : {
        type : [String],
        default : []
    },
    price : {
        type : Number,
        required : true
    },
    labeledPrice : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    images : {
        type : [String],
        required : true,
        default : ["https://th.bing.com/th/id/R.2455f019e0bd71a20d685ffd2e1c816e?rik=1a6bQWqUuJpE%2bw&pid=ImgRaw&r=0"]
    },
    stock : {
        type : Number,
        required : true
    }
});

const Product = mongoose.model("products", productSchema)
export default Product;