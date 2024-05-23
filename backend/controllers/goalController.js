const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    List Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).send(goals);
});

// @desc    Set Goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please Add Goal Text!");
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    });

    res.status(201).send(goal);
});

// @desc    Update Goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error("Goal Not Found!");
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error('User Not Found!');
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Unauthorized Access!');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).send(updatedGoal);
});

// @desc    Delete Goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error("Goal Not Found!");
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error('User Not Found!');
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Unauthorized Access!');
    }

    await goal.deleteOne();

    res.status(200).send({ id: req.params.id });
});


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}