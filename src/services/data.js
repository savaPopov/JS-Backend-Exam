const { Data } = require('../models/Data')

async function getAll() {

  return Data.find().lean()
}

async function getById(id) {
  return Data.findById(id).lean()

}

function getRecent() {
  return Data.find().sort({ $natural: -1 }).limit(3).lean()
}
async function create(data, authorId) {

  const record = new Data({
    title: data.title,
    ingredients: data.ingredients,
    instructions: data.instructions,
    description: data.description,
    image: data.image,
    author: authorId
  })

  await record.save()

  return record
}

async function update(id, data, userId) {
  const record = await Data.findById(id)

  if (!record) {
    throw new ReferenceError('Record not found!' + id)
  }

  if (record.author.toString() != userId) {
    throw new Error('Access Denied!')
  }

  record.title = data.title
  record.ingredients = data.ingredients
  record.instructions = data.instructions
  record.description = data.description
  record.image = data.image

  await record.save()

  return record
}

async function deleteById(id, userId) {
  const record = await Data.findById(id)

  if (!record) {
    throw new ReferenceError('Record not found!' + id)
  }

  if (record.author.toString() != userId) {
    throw new Error('Access Denied!')
  }

  await Data.findByIdAndDelete(id)

}

async function recommendRecipe(recipeId, userId) {
  const record = await Data.findById(recipeId)

  if (!record) {
    throw new ReferenceError('Record not found!' + recipeId)
  }

  if (record.author.toString() == userId) {

    throw new Error('Access Denied!')
  }

  if (record.recommendList.find(l => l.toString() == userId)) {

    return
  }

  record.recommendList.push(userId)

  await record.save()

}

async function search(title){
   const query = {}

   if (title){
    query.title = new RegExp(title,'i')
   }
   
   return Data.find(query).lean()
}

module.exports = {
  getAll,
  getById,
  update,
  deleteById,
  create,
  getRecent,
  recommendRecipe,
  search
}