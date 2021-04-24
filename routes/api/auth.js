const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {check, validationResult} = require('express-validator/check');

router.get('/',auth,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// authenticate user and get token
router.post('/',[
    check('email','please include a valid email id').isEmail(),
    check('password','Password is required').exists()
], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    // check for duplication 
    const { email, password} = req.body;
    console.log(req.body);
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors: [{msg:'Invalid credentials'}]});
        } 

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errors: [{msg:'Invalid credentials'}]});
        }

        // use jwt
        const payload = {
            user:{
                id: user.id
            }
        };
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn: 360000},(err,token)=>{
            if(err) throw err;
            res.json({token})
        })
       // res.send('user registered');
    }catch(error){
        console.log(error.message);
    }
    
});
    
module.exports = router;