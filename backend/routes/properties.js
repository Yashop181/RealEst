const express = require('express');
const Property = require('../models/Property');
const auth = require('../middleware/auth');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Add a property
  router.post('/', [auth, upload.array('images')], async (req, res) => {
    const { title, description, price, location, amenities } = req.body;
    
    try {
      let images = [];
      if (req.files && req  .files.length > 0) {
        images = req.files.map(file => file.path);
      }
  
      const property = new Property({
        title,
        description,
        price,
        location,
        images,
        amenities: amenities.split(','),
        createdBy: req.user.id
      });
  
      await property.save();
      res.json(property);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
router.get('/', async (req,res)=>{
    try{
        const properties = await Property.find().populate('createdBy','name email').populate('images'); 
        res.json(properties);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/:id',async (req,res)=>{
    try {
        const property = await Property.findById(req.params.id).populate('createdBy', 'name email').populate('images');
        if (!property) return res.status(404).json({ msg: 'Property not found' });
        res.json(property)
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.put('/:id', auth, async (req,res)=>{
    const { title, description, price, location, amenities } = req.body;
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ msg: 'Property not found' });
    
        // Check user
        if (property.createdBy.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
        property.title = title;
        property.description = description;
        property.price = price;
        property.location = location;
        property.amenities = amenities.split(',');
        await property.save();
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


router.delete('/:id', auth, async (req, res) => {
    try {
      const property = await Property.findById(req.params.id);
      if (!property) return res.status(404).json({ msg: 'Property not found' });
  
      // Check user
      if (property.createdBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await property.remove();
      res.json({ msg: 'Property removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  module.exports = router;