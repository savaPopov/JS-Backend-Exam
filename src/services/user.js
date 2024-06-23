const { User } = require('../models/User')
const bcrypt = require('bcrypt')

const identityName = 'email'
async function register(identity, password, username) {
  const existing = await User.findOne({ [identityName]: identity })

  if (existing) {
    throw new Error(`This  ${identityName} is  already in use`)
  }

  const user = new User({
    [identityName]: identity,
    username,
    password: await bcrypt.hash(password, 10)
  })

  try {
    await user.save()
  } catch (err) {
    if (err.code == 11000) {
      throw new Error('This username is already taken!')
    }
  }

  return user
}

async function login(identity, password) {
  const user = await User.findOne({ [identityName]: identity })

  if (!user) {
    throw new Error('Incorrect username or password')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw new Error('Incorrect username or password')
  }

  return user

}



module.exports = {
  register,
  login

}