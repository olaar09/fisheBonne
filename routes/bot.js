let express = require('express');
let router = express.Router();
let botController = require('../controllers/botController');

/* bot router */
router.post('/bot', botController);

module.exports = router;
