const express = require('express');
const router = express.Router();
const GetHelp = require('../../models/GetHelp');
const CanHelp = require('../../models/CanHelp');


router.post('/me',async(req,res)=>{
    try{
        const newHelp = new GetHelp({
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
      const canHelps = await GetHelp.find().sort({ date: -1 });
      res.json(canHelps);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const getHelp = await GetHelp.findOne({mobileNumber: req.params.id});
  
      if (!getHelp) {
        const canHelp = await CanHelp.findOne({mobileNumber: req.params.id});
        
        if(!canHelp){
          return res.status(404).json({ msg: 'Number not found' });
        }
        await canHelp.remove();
        res.json({ msg: 'User removed' });
      }
  
  
      await getHelp.remove();
  
      res.json({ msg: 'User removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  }); 

module.exports = router;