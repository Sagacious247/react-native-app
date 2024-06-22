const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, 'Order must belong to a user']
    },
   
    products: [
        {
           name: {
            type: String,
            required: [true, 'Product must have a name']
           },
           quantity: {
            type: Number,
            required: [true, "Product can not ba empty"]
           },
           price: {
            type: Number,
            required: [true, "Product must have a price"]
           },
           image: {
            type: String,
            required: [true, "Product must have an image"]
           }
        }
    ],
    totalPrice: {
        type: Number, 
        required: true
    },
    status: {
       type: String,
       default: "pending"
    },
    shippingAddress: {
        name: {
            type: String,
            required: true
        },
        mobileNo: {
            type: Number,
            required: true
        },
        houseNo: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        landMark: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model("Order", orderSchema)


// const mongoose = require('mongoose')

// const orderSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.ObjectId,
//         ref: "User",
//         required: true
//     },
//     products:[
//         {
//             name: {
//                 type: String,
//                 required: true
//             },
//             quantity: {
//                 type: Number,
//                 required: true
//             }, 
//             price: {
//                 type: Number,
//                 required: true,
//             },
//             image: {
//                 type: String,
//                 required: true
//             }
//         },
//     ],
//     totalPrice: {
//         type: Number, 
//         required: true
//     },
//     status: {
//        type: String,
//        default: "pending"
//     },
//     shippingAddress: {
//         name: {
//             type: String,
//             required: true
//         },
//         mobileNo: {
//             type: Number,
//             required: true
//         },
//         houseNo: {
//             type: String,
//             required: true
//         },
//         street: {
//             type: String,
//             required: true
//         },
//         landMark: {
//             type: String,
//             required: true
//         },
//         postalCode: {
//             type: String,
//             required: true
//         }
//     },
//     paymentMethod: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now()
//     }
// })

// // orderSchema.pre(/^find/, function(next) {
// //     this.populate({
// //         path: 'product',
// //         select: '-createdAt -description -rating'
// //     })
// //     next()
// // } )

// module.exports = mongoose.model("Order", orderSchema)