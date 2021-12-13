const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
{
  //field names & types (like column names)
  pizzaName: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    //transorm createdAt date with dateFormat.js whenever createdAt is queried
    get: (createdAt) => dateFormat(createdAt)
  },
  size: {
    type: String,
    default: "large",
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

//virtual added to access number of comments on a pizza
//schema name.virtual('name of field').get(function(){
PizzaSchema.virtual("commentCount").get(function () {
  //return comment.length
  return this.comments.length;
});

//create the 'Pizza' model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

//export the Pizza model
module.exports = Pizza;
