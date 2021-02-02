const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('Todo', TodoSchema);
