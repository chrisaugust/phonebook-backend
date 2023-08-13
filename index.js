require('dotenv').config()
const express = require('express')
// const morgan = require('morgan')
const cors = require('cors')

// morgan.token('postRequestData', (request, response) => {
//   return request.postRequestData
// })
const app = express()
const Person = require('./models/person')
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

// const capturePostRequestData =  (request, response, next) => {
//   request.postRequestData = JSON.stringify(request.body)
//   next()
// }
// app.use(capturePostRequestData)
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postRequestData'))

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

// // app.get('/info', (request, response) => {
// //   const numPersons = persons.length
// //   const time = new Date()
// //   response.send(`<p>Phonebook has info for ${numPersons} people</p>
// //     <p>${time}</p>`)
// // })

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
    response.json(persons)
  })
})

// app.get('/api/persons/:id', (request, response) => {
//   const personId = Number(request.params.id)
//   const person = persons.find(person => person.id === personId)

//   if (person) {
//     response.json(person)
//   } else {
//     response.status(404).end()
//   }
// })

// app.delete('/api/persons/:id', (request, response) => {
//   const personId = Number(request.params.id)
//   persons = persons.filter(person => person.id !== personId)

//   response.status(204).end()
// })

// const generateId = () => {
//   return Math.floor(1000000 * Math.random())
// }

// app.post('/api/persons', (request, response) => {
//   const body = request.body

//   if (!body.name || body.name === "") {
//     return response.status(400).json({
//       error: 'name missing'
//     })
//   }

//   if (persons.find(person => person.name === body.name)) {
//     return response.status(400).json({
//       error: 'name already in phonebook'
//     })
//   }

//   if (!body.number || body.number === "") {
//     return response.status(400).json({
//       error: 'number missing'
//     })
//   }

//   const person = {
//     id: generateId(),
//     name: body.name,
//     number: body.number
//   }

//   persons = persons.concat(person)

//   response.json(person)
// })

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})