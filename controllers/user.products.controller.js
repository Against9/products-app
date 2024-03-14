const User = require("../models/user.model")

exports.findAll = async (req, res) => {
    console.log("Find all users products")

    try {
        const result = await User.find({}, {_id: 0, username: 1, products: 1})
        res.status(200).json({
            data: result
        })
        console.log("Reading all users products")
    } catch (err) {
        res.status(400).json({
            data: err
        })
        console.log("Failed in reading all users products")
    }
}

exports.findOne = async (req, res) => {
    const username = req.params.username
    console.log("Find products for user :", username)
    try {
        const result = await User.findOne({
                username: username
            },
            {_id: 0, username: 1, products: 1})
        res.status(200).json({data: result})
        console.log("Success in finding products", username)
    } catch (err) {
        res.status(400).json({data: err})
        console.log("Failed in finding products")
    }
}

exports.create = async (req, res) => {
    const username = req.body.username
    const products = req.body.products
    console.log("Inserting products for user", username)


    try {
        const result = await User.updateOne({
                username: username
            },
            {
                $push: {
                    products: products
                }
            })
        res.status(200).json({data: result})
        console.log("Insert Success")
    } catch (err) {
        res.status(400).json({data: err})
        console.log("Failed")
    }
}

exports.update = async (req, res) => {
    const username = req.params.username

    const product = req.body.product.product
    const quantity = req.body.product.quantity
    console.log("Update product for username")
    try {
        const result = await User.updateOne({
                username: username
            }, {"products.product": product},
            {
                $set: {
                    "products.$.quantity": quantity
                }
            })
        res.status(200).json({
            data: result
        })
        console.log("Success update")
    } catch (err) {
        res.status(400).json({
            data: err
        })
        console.log("Problem")
    }
}

exports.delete = async (req,res)=>{
    const username = req.params.username
    const product = req.params.product

    console.log("Delete product")

    try {
        const result = await User.updateOne({
            username:username,
        },{
            $pull:{
                products :{
                    product:product
                }
            }
        })
        res.status(200).json({data: result})
        console.log("Success")
    }catch (err){
        res.status(400).json({data: err})
        console.log("Failed")
    }
}