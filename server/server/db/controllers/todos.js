import passport from 'passport';
import Todo from '../models/todo';

export function getTodos(req, res, next) {
  Todo.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => res.status(500).json({ error: err }));
}

export function getTodoByID(req, res, next) {
  let id = req.params.id;
  Todo.findById(id)
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(err => res.status(500).json({ error: err }));
}

// export function addTodo(req, res, next) {
//   new Todo(req.body)
//     .save()
//     .then(data => res.json(data))
//     .catch(err => res.status(500).json({ error: err }));
// }
export function addTodo(req, res, next) {
  try {
    let todo = new Todo(req.body);

    todo.save((err, todo) => {
      res.send({
        err,
        todo
      });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export function removeTodo(req, res, next) {
  try {
    let id = req.params.id;

    return Todo.findByIdAndRemove(id, (err, todo) => {
      res.json(todo);
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
//Model.findByIdAndUpdate(id, updateObj, {new: true}, function(err, model) {...
export function toggleTodo(req, res, next) {
  console.log(req.body);
  const { completed, text } = req.body;
  try {
    let id = req.params.id;
    Todo.findByIdAndUpdate(
      id,
      {
        $set: {
          completed: completed,
          text: text
        }
      },
      { new: true },
      (err, todo) => {
        res.json(todo);
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
export default {
  getTodos,
  addTodo,
  removeTodo,
  getTodoByID,
  toggleTodo
};
