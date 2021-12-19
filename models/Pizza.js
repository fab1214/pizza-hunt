const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
{
  //field names & types (like column names)
  pizzaName: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    //transorm createdAt date with dateFormat.js whenever createdAt is queried
    get: (createdAt) => dateFormat(createdAt)
  },
  size: {
    type: String,
    required: true,
    enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
    default: 'Large'
  },
  toppings: [],
  comments: [
    {
      //define that comments will be an ObjectId from 'Comment' model
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
},
//add toJSON property to tell schema it can use virtuals
{
  toJSON: {
    virtuals: true,
    getters: true
  },
});

//virtual added to access number of comments on a pizza and total replies
//schema name.virtual('name of field').get(function(){
PizzaSchema.virtual("commentCount").get(function () {
  //return comment.length
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0)
});

//create the 'Pizza' model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

//export the Pizza model
module.exports = Pizza;
