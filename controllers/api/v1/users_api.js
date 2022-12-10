const User = require('../../../models/users');
const jwtToken = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: "Invalid username or password"
            });
        }
        return res.status(200).json({
            message: "Sign in successfull, here is yyour token, keep it secret",
            data:{
                token: jwtToken.sign(user.toJSON(),'Codeial',{expiresIn: '1000000'})
            }
        })
    } catch (error) {
        console.log("********",error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}