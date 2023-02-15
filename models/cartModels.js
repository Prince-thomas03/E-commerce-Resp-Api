import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

    userId:{type:String,required:true}, //every user has one cart
    products:[
        {
            productId:{
                type:String,
            },
            quantitiy:{
                type:Number,
                default:1,
            }
        }
    ]
} ,

{timestamps:true});

const  cartModel= mongoose.model("cart",cartSchema)
export default cartModel 