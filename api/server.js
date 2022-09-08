// BUILD YOUR SERVER HERE
const express = require('express')
const Person = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users', async (req, res) => {
    try {
        res.status(200).json(await Person.find())
    } catch (err) {
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
}
)

server.get('/api/users/:id', async (req, res) => {
    try {
        const findUser = await Person.findById(req.params.id)
        if (!findUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.json(findUser)
        }

    } catch (err) {
        res.status(500).json({
            message: "The user information could not be retrieved"
        })
    }
})

server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        if (!name || !bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            const newPerson = await Person.insert({ name, bio })
            res.status(201).json(newPerson)
        }
    } catch {
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try {
        const deleteUser = await Person.remove(req.params.id)
        if (!deleteUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.json(deleteUser)
        }
    } catch (err) {
        res.status(500).json({
            message: "The user could not be removed"
        })
    }
})

server.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, bio } = req.body
        const updateUser = await Person.update(id, { name, bio })
        if(!updateUser){
            res.status(404).json({ message: "The user with the specified ID does not exist"})
        } else{
            if(!name || !bio){
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            } else{
                res.json(updateUser)
            }
        }

    } catch (err) {
        res.status(500).json({
            message: "The user information could not be modified"
        })
    }
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
