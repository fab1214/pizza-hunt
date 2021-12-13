const { Comment, Pizza } = require('../models');

const commentController = {
    //add comment to pizza
    addComment({ params, body }, res){
        console.log(body);
        Comment.create(body)
        .then(({ _id }) => {
            return Pizza.findOneAndUpdate(
                { _id: params.pizzaId },
                { $push: { comments: _id }},
                //receieve back updated pizza record
                { new: true }
            );
        })
        .then(dbPizzaData => {
             if(!dbPizzaData){
                 res.status(404).json({message: 'No pizza with this id exists'});
                 return;
             }
             res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    //remove comment
    removeComment({ params }, res){
        Comment.findOneAndDelete({ _id: params.commentId })
        .then(deletedComment => {
            if(!deletedComment){
                res.status(404).json({ message: 'No comment found with this id' });
            }
            return Pizza.findOneAndUpdate(
                { _id: params.pizzaId },
                { $pull: { comments: params.commentId } },
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({message: 'No pizza with this id exists'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = commentController;