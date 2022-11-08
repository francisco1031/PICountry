const { Router } = require('express');
const all_info  = require('../server/all_info')
const post_Activity = require('../server/post_Activity')
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/countries', all_info);
router.use('/activity', post_Activity )

module.exports = router;
