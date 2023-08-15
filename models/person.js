const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('connecting to ', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        if (v.length < 8) {
          throw new Error('Number must be at least 8 digits.')
        }
        return /^(\d{2}|\d{3})-\d{6,10}/.test(v)
      },
      message: props => 
        `${props.value} is not valid! Must use the format nn-nnnnnn or nnn-nnnnn (2 or 3 numbers, followed by a dash, followed by 6 or more numbers)`
    },
    required: true
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)