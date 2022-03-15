const {model, Schema, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
//reaction schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            //mongoose ObjectId data type
            type: Schema.Type.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            //input validation
            required:"A username is required!",
            maxlength: 280,
        },
        username: {
            type: String,
            required: "A username is required!",
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get:(createdAtVal) => dateFormat(createdAtVal),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
//ThoughtScema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "A though is required here!",
      maxlength: 1,
      maxLength:280,
    },
    createdAt: {
        type: Date,
        default: Date,now,
        get:(createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
        type: String,
        required:"Please enter a user name...",
    },
    reactions:[ReactionSchema],
  },
  {
     toJSON: {
         virtual: true,
         getters: true,
     },
     id: false,
  }
);
//get the thought's length
ThoughtSchema.virtual("reactionCount").get(function (){
    return this.reaction.length;
});
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
