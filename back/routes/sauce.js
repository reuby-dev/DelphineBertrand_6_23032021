const express = require('express');
const router = express.Router();

//middleware protection des routes
const auth = require('../middleware/auth');

const sauceCtrl = require('../controllers/sauce');

// router.get('/', auth, sauceCtrl, getAllSauces);
// router.post('/', auth, sauceCtrl.createSauce);
// router.get('/:id', auth, sauceCtrl.getOneSauce);
// router.put('/:id', auth, sauceCtrl.modifySauce);
// router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;