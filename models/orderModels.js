import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

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
    ],
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"pending"}
} ,

{timestamps:true});

const  orderModel= mongoose.model("order",orderSchema)
export default orderModel 