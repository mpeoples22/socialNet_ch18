const router = require('express').Router();
const apiRouter = require('./api');

router.use('/api', appRoutes);

router.use((req, res) => {
    return res.send('Wrong route!');
});

module.exports = router;