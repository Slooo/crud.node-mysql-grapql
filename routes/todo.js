const {Router} = require('express')
const Todo = require('../models/todo')
const router = Router()

// Получение списка задач
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll()
    res.status(200).json(todos)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: 'Server error'
    })
  }})

// Создание новой задачи
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      done: false
    })
    // 201 - элемент был создан
    res.status(201).json({todo})
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

// Изменение новой задачи
router.put('/:id', async (req, res) => {
  try {
    // находим строку в БД
    const todo = await Todo.findByPk(+req.params.id)
    todo.done = req.body.done
    await todo.save()
    return res.status(200).json({todo})
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

// Удаление задачи
router.delete('/:id', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        id: +req.params.id
      }
    })
    const todo = todos[0]
    await todo.destroy()
    // контента нет, но всё успешно
    res.status(204).json({})
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

module.exports = router
