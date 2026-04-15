import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const { completed } = req.query;

  const filter = {};

  if (completed !== undefined) {
    if (completed === 'true') {
      filter.completed = true;
    } else if (completed === 'false') {
      filter.completed = false;
    } else {
      return res.status(400).json({ error: 'Invalid value for completed. Use true or false.' });
    }
  }

  const tasks = await taskService.getAllTasks(filter);
  res.json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}