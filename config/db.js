const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoUrl')

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log('object')
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

module.exports = connectDb
