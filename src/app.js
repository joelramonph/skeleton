const express = require('express')
const db = require('./utils/database')
const app = express()

const {port} = require('./config'); //Es agregada una vez configurado el archivo

//*Routes
const userRouter = require('./users/users.router')


app.use(express.json())

db.authenticate()
    .then(() => {
        console.log('Database Authenticated')
    })
    .catch(err => {
        console.log(err)
    })

db.sync()
    .then(() => {
        console.log('Database Synced')
    })
    .catch(err => {
        console.log(err)
    })

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Ok!',
        users: `localhost: ${port}/api/v1/users`
    })
})

app.use('/api/v1/users', userRouter)


app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})