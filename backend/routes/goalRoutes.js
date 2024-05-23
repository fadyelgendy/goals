const express = require('express');
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const {auth} = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(auth,getGoals).post(auth,setGoal);
router.route('/:id').put(auth,updateGoal).delete(auth,deleteGoal);

module.exports = router;