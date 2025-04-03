const express = require('express');
const { create_affiliate, get_all_affiliate, get_affiliate, redeem_affiliate } = require('../Controller/affiliate');
const router = express.Router();

router.post('/affiliate', create_affiliate);
router.get('/affiliate', get_all_affiliate);
router.get('/affiliate/:id', get_affiliate);
router.put('/affiliate/redeem/:id/:userId', redeem_affiliate);

module.exports = router;