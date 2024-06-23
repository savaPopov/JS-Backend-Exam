const { Router } = require('express');
const { getRecent, getAll, getById, search } = require('../services/data');

const homeRouter = Router()

homeRouter.get('/', async (req, res) => {
  const recipes = await getRecent()
  // const recipes = [1,2,3]

  res.render('home', { recipes })
})

homeRouter.get('/catalog', async (req, res) => {
  const recipes = await getAll()
  // const recipes = []

  res.render('catalog', { recipes })
})

homeRouter.get('/catalog/:id', async (req, res) => {
  const recipe = await getById(req.params.id)

  if (!recipe) {
    res.render('404')
    return;
  }

  const isOwner = req.user?._id == recipe.author.toString()
  const hasRecommended = Boolean(recipe.recommendList.find(l => req.user?._id == l.toString()))
  const numberRecommends = recipe.recommendList.length

  res.render('details', { recipe, isOwner, hasRecommended, numberRecommends })
})

homeRouter.get('/search', async (req, res) => {
  console.log(req.query)
  const { title } = req.query
  let recipes = []


  if (title != undefined) {

    recipes = await search(title)
  } else {
    recipes = await getAll()
  }

  res.render('search', { data: { title }, recipes })
})


module.exports = {
  homeRouter
}

