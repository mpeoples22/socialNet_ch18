const { Schema, model } = require("mongoose");
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "A username is required!",
            trim: true,
        },
        email: {
            type: String,
            uniquie: true,
            required: "An email address is required!",
            match: [/.+\@.+\..+/, "Please use a valid email"],
        },
        thoughts: [
            //array of id values referencing the Thought model
            {
                type: Schema.Types.ObjectId,
                ref:"Thought",
            },
        ],
        friends: [
            //array of values referencing the User model
            {
                type: Schema.Types.ObjectId,
                ref:"User",
            },
        ],
    },
    {
        toJSON:{
            //allow virtual data
            virtuals: true,
        },
        id: false,
    }
);

//get the user's friends array
userSchema.virtual("friendCount").get(function(){
    return this.friends.length;
});

const User = model("User", userSchema);
module.exports = User;