const express = require('express');
const router = express.Router();

//middleware protection des routes
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.get('/', sauceCtrl.getAllSauces);
router.post('/', multer, sauceCtrl.createSauce);
router.get('/:id', sauceCtrl.getOneSauce);
// router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;