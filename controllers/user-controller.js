const { Thought, User} = require("..models");
const userController = {
    //get users
    getUsers(req, res){
        User.find()
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch(() => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //get single user id
    getSingleUser(req, res){
        User.findOne({_id: req.params.userId})
           .populate("friends")
           .populate("thoughts")
           .then((dbUserData) =>{
               if(!dbUserData) {
                   return res.status(404).json({message: "No user with this id!" });
               }
               res.json(dbUserData);
           })
           .catch((err)=>{
               console.log(err);
               res.status(500).json(err);
           });
    },
    //create users
    createUser(req, res) {
        User.create(req.body)
           .then((dbUserData)=> {
               res.json(dbUserData);
           })
           .catch((err)=>{
               console.log(err);
               res.status(500).json(err);
           });
    },
    //update user
    updateUser(req, res) {
        User.finOneAndUpdate(
            {_id: req.params.userId },
            {
                $set: req.body,
            },
            {
                runValidatores:true,
                new: true,
            }
        )
        .then((dbUserData)=>{
            if(!dbUserData){
                return res.status(404).json({
                    message: "No user with this id!"
                });
            }
            res.json(dbUserData);
        })
        .catch((err)=> {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //delete user
    deleteUser(req, res) {
        User.finOneAndDelete({_id: req.params.userId})
            .then((dbUserData)=>{
                if(!dbUserData){
                    return res.status(404).json({ message: "No user with this id!"});
                }
                //remove user thought ids
                return Thought.deleteMany({_id: {$in: dbUserData.thoughts }});
            })
            .then(() =>{
                res.json({ message: "User and associated thoughts deleted!"});
            })
            .catch((err)=>{
                console.log(err);
                res.status(500).jason(err);
            });
    },
    //add friend to friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { new: true}
        )
        .then ((dbUserData)=>{
            if(!dbUserData){
                return res.status(404).json({ message: "No user with this id!"});
            }
            res.json(dbUserData);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    //remove friend from list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId },
            { $pull: {friends: req.params.friendId} },
            { new: truen}
        )
        .then((dbUserData)=> {
            if(!dbUserData){
                return res.status(404).json({message: "No user with this id!"});
            }
            res.json(dbUserData);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });

    },
};