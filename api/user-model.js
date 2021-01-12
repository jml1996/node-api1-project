const shortid = require('shortid')

let users = [
    {
        id: shortid.generate(), // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    },
]

module.exports = {
  findAll() {
    // SELECT * FROM dogs;
    return Promise.resolve(users)
  },

  findById(id) {
    // SELECT * FROM dogs WHERE id = 1;
    const user = users.find(u => u.id === id)
    return Promise.resolve(user)
  },

  create({ name, bio }) {
    // INSERT INTO dogs (id, name, weight, adopter_id) VALUES ('xyz', 'Foo', 10, NULL);
    const newUser = { id: shortid.generate(), name, bio }
    users.push(newUser)
    return Promise.resolve(newUser)
  },

  update(id, changes) {
    // UPDATE dogs SET name = 'Foo', weight = 9, adopter_id = 'abc' WHERE id = 1;
    const user = users.find(u => u.id === id)
    if (!user) return Promise.resolve(null)

    const updatedUser = { ...changes, id }
    users = users.map(u => (u.id === id) ? updatedUser : u)
    return Promise.resolve(updatedUser)
  },

  delete(id) {
    // DELETE FROM dogs WHERE id = 1;
    const user = users.find(u => u.id === id)
    if (!user) return Promise.resolve(null)

    users = users.filter(u => u.id !== id)
    return Promise.resolve(user)
  }
}
