const express = require('express')
const router = express.Router()
const profileCtrl = require('../../controllers/api/profile')

router.get('/', profileCtrl.index)
router.post('/new', profileCtrl.create)

module.exports = router;