const { Router } = require('express');
const { create, getById, update, deleteById, recommendRecipe } = require('../services/data');
const { body, validationResult } = require('express-validator');
const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util');

const recipeRouter = Router()

recipeRouter.get('/create', isUser(), async (req, res) => {
  console.log(req.user)
  res.render('create')
})

recipeRouter.post('/create', isUser(),
  body('title').trim().isLength({ min: 2 }).withMessage('Title should be at least 2 charachters long'),
  body('instructions').trim().isLength({ min: 10 }).withMessage('Instructions should be at least 10 charachters long'),
  body('image').trim().isURL({ require_tld: false, require_protocol: true }).withMessage('Image must be a valid URL'),
  body('description').trim().isLength({ min: 10, max: 100 }).withMessage('Description should be between 10 and 100 charachters long'),
  body('ingredients').trim().isLength({ min: 10, max: 200 }).withMessage('Ingredients should be between 10 and 200 charachters long'),

  async (req, res) => {

    try {
      const validation = validationResult(req)
      if (validation.errors.length) {
        throw validation.errors
      }

      const result = await create(req.body, req.user._id)
      res.redirect('/catalog')
    } catch (err) {

      res.render('create', { data: req.body, errors: parseError(err).errors })
    }
  }
)

recipeRouter.get('/edit/:id', isUser(), async (req, res) => {
  const recipe = await getById(req.params.id)


  if (!recipe) {
    res.render('404')
  }

  const isOwner = req.user?._id == recipe.author.toString()

  if (!isOwner) {
    res.redirect('/login')
    return;
  }

  res.render('edit', { data: recipe })
})

recipeRouter.post('/edit/:id', isUser(),
  body('title').trim().isLength({ min: 2 }).withMessage('Title should be at least 2 charachters long'),
  body('instructions').trim().isLength({ min: 10 }).withMessage('Instructions should be at least 10 charachters long'),
  body('image').trim().isURL({ require_tld: false, require_protocol: true }).withMessage('Image must be a valid URL'),
  body('description').trim().isLength({ min: 10, max: 100 }).withMessage('Description should be between 10 and 100 charachters long'),
  body('ingredients').trim().isLength({ min: 10, max: 200 }).withMessage('Ingredients should be between 10 and 200 charachters long'),

  async (req, res) => {
    const recipeId = req.params.id
    const userId = req.user._id
    try {
      const validation = validationResult(req)

      if (validation.errors.length) {
        throw validation.errors
      }

      const result = await update(recipeId, req.body, userId)
      res.redirect('/catalog/' + recipeId)
    } catch (err) {
      res.render('edit', { data: req.body, errors: parseError(err).errors })
    }
  }
)

recipeRouter.get('/delete/:id', isUser(), async (req, res) => {
  const recipeId = req.params.id
  const userId = req.user._id

  try {

    const result = await deleteById(recipeId, userId)
    res.redirect('/catalog')
  } catch (err) {
    res.redirect('/catalog/' + recipeId)
  }
}
)

recipeRouter.get('/recommend/:id', isUser(), async (req, res) => {
  const recipeId = req.params.id
  const userId = req.user._id

  try {

    const result = await recommendRecipe(recipeId, userId)
    res.redirect('/catalog/' + recipeId)
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}
)

module.exports = {
  recipeRouter
}

