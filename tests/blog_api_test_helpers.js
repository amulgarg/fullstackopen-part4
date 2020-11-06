const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Hello World!",
        author: "Amul Garg",
        url: "https://amulsblog.com",
        likes: 100
    },
    {
        title: "Pandemic Misery :(",
        author: "Amul Garg",
        url: "https://amulsblog.com/pandemic-misery-024",
        likes: 200
    },
    {
        title: "Pandemic Misery - CounterPoint :(",
        author: "Daario",
        url: "https://amulsblog.com/pandemic-misery-counterpoint-0884",
        likes: 200
    }
];

/* const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
} */

module.exports = {
    initialBlogs
}