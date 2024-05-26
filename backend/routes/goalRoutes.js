const express = require('express');
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', auth, getGoals)
router.post('/create/', auth, setGoal);
router.route('/:id').put(auth, updateGoal).delete(auth, deleteGoal);

module.exports = router;