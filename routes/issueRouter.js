const express = require('express')
const Issue = require('../models/issue.js')
const Comment = require('../models/comments.js')
const User = require('../models/user')
const issueRouter = express.Router()

// Get all issues
issueRouter.get('/', (req, res, next) =>  {
    Issue.find((err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })   
})

// Get all issues from user
issueRouter.get('/user', (req, res, next) => {
    Issue.find({ user: req.user._id }, 
        (err, issue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(issue)
        })
})

// Post new issue
issueRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

// Delete issue
issueRouter.delete('/:issueId', (req, res, next) => {
    Issue.findOneAndDelete(
        { _id: req.params.issueId, user: req.user._id }, 
        (err, deletedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted issue: ${deletedIssue}`)
        }
    )
})

// Update issue
issueRouter.put('/:issueID', (req, res, next) => {
    Issue.findByIdAndUpdate({ _id: req.params.issueID },
        req.body,
        { new: true },
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(201).send(updatedIssue)
        })
})

// Get Issue Creator
issueRouter.get('/user/:userID', (req, res, next) => {
    User.findOne( { _id: req.params.userID }, 
        (err, username) => {
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(username)
        })
})

// ------------- Voting --------------- //

// Upvoting
issueRouter.put('/upvote/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        { $inc: { upvotes: 1} },
        { new: true },
        (err, updatedVote) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedVote)
        }
    )
})

// Downvoting
issueRouter.put('/downvote/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        { $inc: { downvotes: 1 } },
        { new: true },
        (err, updatedVote) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedVote)
        }
    )
})


// ------------- Comments --------------- //

// Post new comment
issueRouter.route('/:issueId/comment').post ( (req, res, next) => {
    const newComment = new Comment(req.body)

    newComment.user = req.user._id;
    newComment.issue = req.params.issueId;

    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        { $push: { comments: newComment } },
        { new: true },
        (err, changed) => {
            if (err) {
                res.status(500);
                return next(err);
            }
        }
    );

    newComment.save((err, saved) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        res.status(201).send(saved);
    });
})

// Get all comments from an issue
issueRouter.get("/:issueId/comment", (req, res, next) => {
    Comment.find({ issue: req.params.issueId}, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// Delete comment
issueRouter.delete('/:issueId/comment/:commentID', (req, res, next) => {
    Comment.findOneAndDelete(
        { _id: req.params.commentId, user: req.user._id },
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Succesfully deleted comment: ${deletedComment.title}`)
        }
    )
})

// Update comment
issueRouter.put('/:issueId/comment/:commentId ', (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentId},
        req.body,
        { new: true },
        (err, updatedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        }
    )
})

// Get comment author
issueRouter.get('/comment/user/:userId', (req, res, next) => {
    User.findOne({ _id: req.params.userId }, (err, username) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(username)
    })
})

module.exports = issueRouter