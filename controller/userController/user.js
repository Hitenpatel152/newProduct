const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/user');
module.exports = {
    userRegister: (req, res) => {
        res.render('userregister');
    },
    userLoginPage: (req, res) => {
        res.render('userlogin');
    },
    deshboard: (req,res) => {
        res.render('dashboard');
    },
    userRegisterData: async(req, res) => {
        console.log(req.body);
        try {
            let { Name, EmailId, Password } = req.body;
            const emailidfind = await userModel
			.find({
				EmailId: EmailId,
			})
                .select('EmailId');
            
            if (emailidfind.length != 0) {
                res.json({
                    status: 'error',
                    message: 'EmailId already registered by other.',
                });
            } else {
                const saltRounds = 10;
                bcrypt.hash(Password, saltRounds).then((pass) => {
                    Password = pass;
                    userModel.create({
                        Name:Name, EmailId:EmailId, Password:Password
                    })
					.then(() => {
						
						res.json({
							status: 'success',
							message: 'user Successfully Registered.',
						});
					})
					.catch((err) => console.log(err));
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    userLogin:async(req,res)=> {
        let { EmailId, Password } = req.body;
        const emailidfind = await userModel
            .find({
                EmailId: EmailId,
            });
            
            if (emailidfind.length == 0) {
                res.json({
                    status: 'error',
                    message: 'Invalid EmailId or Password.',
                });
            } else {
                bcrypt.compare(Password,emailidfind[0].Password, async (err, result) => {
                    if (result) {
                        const userJwt = {
                            EmailId:EmailId 	
                        };
                        const userJwtTokenRefresh = await jwt.sign(
                            userJwt,
                            process.env.SECRETJWTKEY,
                            {
                                algorithm: process.env.ALGORITHM,
                                expiresIn: process.env.EXPIRESIN_REFRESH,
                            }
                        );
        
                        res.cookie('userTokenRefreshVariable', userJwtTokenRefresh, {
                            maxAge: process.env.MAXAGE,
                        });
                        res.json({
                            status: "success",
                            message: 'Successfully Login.',
                        });
                    } else {
                        res.json({
                            status: 'error',
                            message: 'Invalid EmailId or Password.',
                        });
                    }
                });
            } 
    }
};