const express = require("express")

const User = require("./user-model")
const server = express()

server.use(express.json())

server.post("/api/users", async (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        try {
            const newlyCreated = await User.create(user)
            res.status(201).json(newlyCreated)
        } catch (error) {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }
    }
})

server.get("/api/users", async (req, res) => {
    try {
        const allUsers = await User.findAll()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params
    User.findById(id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: `The user with the specified ID, ${id}, does not exist.` })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        })
})

server.delete("/api/users/:id", async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await User.delete(id)
        if (!deleted) {
            res.status(404).json({ message: `The user with the specified ID, ${id}, does not exist.` })
        } else {
            res.status(200).json(deleted)
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
})

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id
    const changes = req.body
    if (!changes.name || !changes.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        User.update(id, changes)
            .then(updated => {
                if (!updated) {
                    res.status(404).json({ message: `The user with the specified ID, ${id}, does not exist.` })
                } else {
                    res.status(200).json(updated)
                }
            })
            .catch(error => {
                res.status(500).json({ errorMessage: "Please provide name and bio for the user." })
            })
    }
})

module.exports = server