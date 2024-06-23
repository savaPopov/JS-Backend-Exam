const { homeRouter } = require('../controllers/home')
const { recipeRouter } = require('../controllers/recipe')
const { userRouter } = require('../controllers/user')

function configRoutes(app) {
  app.use(homeRouter)
  app.use(userRouter)
  app.use(recipeRouter)
  app.get('*',(req,res)=>{
    res.render('404')
  })


}

module.exports = {
  configRoutes
}