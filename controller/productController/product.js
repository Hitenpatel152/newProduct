const productmodel = require('../../models/product.js');
const ObjectId = require('mongodb').ObjectID;
module.exports = {
    productUpdatePage:(req,res)=> {
        res.render('updateProduct');
    },
    getAllProducts: async (req, res) => {
        try {

            
                const productdata = await productmodel.find();
                console.log(productdata);
                res.set(200).json({
                    status: true,
                    data:productdata
                })
    

            
        } catch (err) {
            console.log(err);
        }
        
    },
    getoneProducts:async(req,res)=>{
        const id = req.query.id//ObjectId(req.body.id);
        console.log(id);
        const productdata = await productmodel.find({"_id" : id});
                console.log(productdata);
                res.set(200).json({
                    status: true,
                    data:productdata
                })
    },
    addNewProduct: async (req, res) => {
        try {
            const { FU_ProductImage, ProductName, ProductPrice, ProductQty, ProductCategory } = req.body;
            console.log(req.body);
            await productmodel.create({
                FU_ProductImage, ProductName, ProductPrice, ProductQty, ProductCategory
            });
            res.set(200).json("Product created");
        } catch (error) {
            console.log(error);
        }
    },
    updateProduct: async (req, res) => {
        try {
            let {id, FU_ProductImage, ProductName, ProductPrice, ProductQty, ProductCategory } = req.body;
            productmodel.updateOne({_id: id},{$set:{FU_ProductImage:FU_ProductImage ,ProductName:ProductName, ProductPrice:ProductPrice, ProductQty:ProductQty, ProductCategory:ProductCategory  }},{new:false})
            .then((result)=>{
                res.set(200).json("Product Updated");
            });
        } catch (err) {
            console.log(err);
        }
    }
};