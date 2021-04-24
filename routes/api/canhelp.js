const express = require('express');
const router = express.Router();
const CanHelp = require('../../models/CanHelp');


router.post('/me',async(req,res)=>{
    try{
        const newHelp = new CanHelp({
            name: req.body.name,
            mobileNumber: req.body.mobileNumber,
            type: req.body.type,
          });
    
          const help = await newHelp.save();
    
          res.json(help);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/', async (req, res) => {
    try {
      const canHelps = await CanHelp.find().sort({ date: -1 });
      res.json(canHelps);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;