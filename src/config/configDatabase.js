const mongoose = require('mongoose')
require('../models/User')
require('../models/Data')


async function configDatabase() {
  const connectionString = 'mongodb://127.0.0.1:27017/exam'
  // const connectionString = 'mongodb://localhost:27017'
  await mongoose.connect(connectionString)

  console.log('Database Connected')
}

module.exports = {
  configDatabase
}
