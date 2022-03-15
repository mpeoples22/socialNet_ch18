const { User, Thought} = require('../models');

const thoughtController = {
    //get all thoughts
  getThoughts(req, res) {
      Thought.find()
         .sort({createdAt: -1})
         .then((dbThoughtData) => { res.json(dbThoughtData);
        })
         .catch((err) => {
             console.log(err);
             res.status(500).json(err);
         });
  },
//get single thought by id
  getSingleThought({params}, res) {
    Thought.findOne({_id: params.Id })
      .then((dbThoughtData) => {
          //return error if no thoght
        if(!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!"});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err)=> {
       console.log(err);
       res.status(500).json(err);
      });
  },
  //create a thought
  createThought(req, res) {
      Thought.create(req.body)
        .then((dbThoughtData) => {
          return User.findOneAndUpdate(
             {_id: req.body.userId },
             { $push: {thoughts: dbThoughtData._id} },
             { new: true }
          );
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'Thought created, but no user with this id!'});
            }
            res.json({message: 'Thought successfully created!'});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
  },

  updateThought(reg, res) {
       Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {$set: req.body }, {runValidators: true, new: true })
         .then((dbThoughtData)=> {
           if(!dbThoughtData) {
               return res.status(404).json({ message: 'No thought with this id!'});
           }
           res.json(dbThoughtData);
        })
         .catch((err) => {
             console.log(err);
             res.status(500).json(err);
         });
   },

   deleteThought(req, res) {
       Thought.findOneAndRemove({ _id: req.params.thoughtId})
         .then((dbThoughtData)=> {
             if(!dbThoughtData) {
                 return res.status(404).json({message: 'No thought with this id!'});
             }
             //romove thought id 
             return User.findOneAndUpdate(
                 { thoughts: req.params.thoughtId },
                 {$pull:{ thoughts: req.params.thoughtId} },
                 { new: true}
             );
         })
         .then((dbUserData)=> {
             if(!dbUserData) {
                 return res.status(404).json({ message: 'Thought created but no user with this id'});
             }
             res.json({message: 'Thought successfully deleted!'});   
          })
         .catch((err)=> {
             console.log(err);
             res.status(500).json(err);
         });
    },
    //add a thought reaction
    addReaction(req, res) {
        Thought.findOndAndUpdate(
            { _id: req.params.thoughId },
            { $addToSet: {reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then ((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!'});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //remove reaction
    removeReaction(req, res) {
      Thought.findOndAndUpdate(
        { _id: req.params.thoughtId},
        {$pull: { reactions: {reactionId: req.params.reactionId}}},
        { runValidators: true, new: true}
      )
      .then((dbThoughtData) => {
          if(!dbThoughtData) {
              return res.status(404).json({ message: 'No thught with this id!'});
          }
          res.json(dbThoughtData);    
      })
      .catch((err)=> {
          console.log(err);
          res.status(500).json(err);
      });
    },

};

module.exports = thoughtController;