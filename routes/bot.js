let express = require('express');
let router = express.Router();
let botController = require('../controllers/botController');

/* GET home page. */
router.post('/bot', botController);

module.exports = router;
