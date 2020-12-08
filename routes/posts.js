const express = require('express')
const router = express.Router()

// Load model
const Post = require('../models/Post')

// Show all articles
router.get('/', async (req, res) => {
  const posts = await Post.find().lean().sort({ date: -1})
  res.render('posts/index', { posts })
})

// Show form to add new post
router.get('/add', (req, res) => {
  res.render('posts/add')
})

// Add new post
router.post('/', async (req, res) => {
  const { title, text } = req.body

  let errors = []

  if (!title) errors.push({ msg: 'title is required' })
  if (!text) errors.push({ msg: 'Text is required' })
  if (errors.length) res.render('posts/add', { title, text })

  else {
    const newPostData = { title, text }
    const newPost = new Post(newPostData)

    await newPost.save()
    res.redirect('/posts')
  }
})

// change article
router.get('/edit/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).lean()
  res.render('posts/edit', { post })
})

// update edit article
router.put('/:id', async (req, res) => {
  const { title, text } = req.body
  await Post.findOneAndUpdate({ _id: req.params.id }, { title, text })
  res.redirect('/posts')
})

// delete article
router.delete('/:id', async (req, res) => {
  await Post.findOneAndDelete({ _id: req.params.id })
  res.redirect('/posts')
})

module.exports = router
