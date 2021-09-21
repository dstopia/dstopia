'use strict'

const mongoose = require('mongoose')
const chalk = require('chalk')

require('dotenv').config()

mongoose.connect(process.env.DB_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.set('returnOriginal', false)

mongoose.connection
    .on('error', console.error.bind(console, new Error('Database Connection Error!')))
    .once('open', () => console.log(chalk.italic.blue('Database Connected!')))
