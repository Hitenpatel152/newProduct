const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../../controller/userController/user');

const fileUploadController = require('../../controller/productController/fileupload');

const productController = require('../../controller/productController/product');
const userModel = require('../../models/user');
const userAuth = async(req,res,next)=>{
    try
	{
		let usertoken = req.cookies.userTokenRefreshVariable || 'NoToken';
		if(usertoken === 'NoToken' ){
			res.status(403).send({
			success: false,
			message: 'You Need To Login.',
		});
		}else{
			let data = jwt.verify(usertoken, process.env.SECRETJWTKEY);
            console.log(data);
			let token = await userModel.find({usejwtToken:usertoken , EmailId:data.EmailId});
			if(token !== null){
				next();
			}else{
				res.status(403).send({
					success: false,
					message: 'You Need To Login.',
				});
			}
		}
	}
	catch(err){
		console.log(err);
		res.status(403).send({
			success: false,
			message: 'You Need To Login.',
		});
	}
}

router.get('/', userController.userRegister);

router.get('/login', userController.userLoginPage);


router.get('/deshboard',userAuth, userController.deshboard);

router.post('/createnewacc', userController.userRegisterData);

router.post('/loginacc', userController.userLogin);

router.post('/FileUpload',fileUploadController.userFileUpload);

router.post('/addproduct' , productController.addNewProduct)

router.get('/getproduct' ,productController.getAllProducts );


router.get('/getoneproduct' ,productController.getoneProducts );

router.post('/updateproduct',productController.updateProduct);

module.exports = router;