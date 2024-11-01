import express from 'express'
import mongoose from 'mongoose'
import BlogPost from './models/BlogPost.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import NewsArticles from './models/NewsArticles.js'
import MedicalArticles from './models/MedicalArticles.js'
import Mdma from './models/Mdma.js'
import Psilocybin from './models/psilocybin.js'
import User from './models/User.js'
import PetitionForm from './PetitionForm.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ! News Articles 
app.get('/', async (req, res) => {
    NewsArticles.find({}, (error, newsspot) => {
    })
    res.json()
})
app.get('/newshome', async (req, res) => {
    const newsPost = await NewsArticles.find({}).sort({ _id: -1 })
    res.json(newsPost)
})
app.get('/newshome/:id', async (req, res) => {
    const newsId = req.params.id
    const news = await NewsArticles.findById(newsId)
    res.json(news)
})
app.post('/newshome', async (req, res) => {
    const newsbody = req.body
    const post = await NewsArticles.create(await newsbody)
    res.json(post)
})

// ! Medical Articles
app.get('/', async (req, res) => {
    MedicalArticles.find({}, (error, newsspot) => {
    })
    res.json()
})
app.get('/medicalhome', async (req, res) => {
    const medicalPost = await MedicalArticles.find({}).sort({ date: -1 })
    res.json(medicalPost)
})
app.get('/medicalhome/:id', async (req, res) => {
    const medicalId = req.params.id
    const medical = await MedicalArticles.findById(medicalId)
    res.json(medical)
})
app.post('/medicalhome', async (req, res) => {
    const medicalbody = req.body
    const post = await MedicalArticles.create(await medicalbody)
    res.json(post)
})

// ! MDMA Articles
app.get('/mdmahome', async (req, res) => {
    const mdmaPost = await Mdma.find({})
    res.json(mdmaPost)
})
app.get('/mdmahome/:id', async (req, res) => {
    const mdmaId = req.params.id
    const mdma = await Mdma.findById(mdmaId)
    res.json(mdma)
})
app.post('/mdmahome', async (req, res) => {
    const [formType, comments] = Object.entries(req.body).flat();
    const results = await Mdma.updateOne({ type: formType }, { body: comments })
})

// ! Psilocybin Articles
app.get('/psilocybinhome', async (req, res) => {
    const psilocybinPost = await Psilocybin.find({})
    res.json(psilocybinPost)
})
app.get('/psilocybinhome/:id', async (req, res) => {
    const psilocybinId = req.params.id
    const psilocybin = await Psilocybin.findById(psilocybinId)
    res.json(psilocybin)
})
app.post('/psilocybinhome', async (req, res) => {
    const [formType, comments] = Object.entries(req.body).flat();
    const results = await Psilocybin.updateOne({ type: formType }, { body: comments })
})

// ! Blog Page 
app.get('/', async (req, res) => {
    BlogPost.find({}, (error, blogspot) => {
    })
    res.json('Test')
})
app.get('/bloghome', async (req, res) => {
    const blogPost = await BlogPost.find({}).sort({ _id: -1 })
    res.json(blogPost)
})
app.get('/bloghome/:id', async (req, res) => {
    const blogId = req.params.id
    const blog = await BlogPost.findById(blogId)
    res.json(blog)
})

// Create Blog
app.post('/blogpostpage', async (req, res) => {
    const data = req.body
    const post = await BlogPost.create(await data)
    res.json()
})

// Recommend Blog
app.put('/blogpage/:id', async (req, res) => {
    const body = req.body
    const id = req.params.id
    const recommendBlog = await BlogPost.findByIdAndUpdate({_id: id}, body)
    res.json('recommeneded')
})

// Add Recommend To Users Profile
app.put('/users', async (req, res) => {
    const body = req.body
    let userName = {username: body.loggedInUser}
    let searchedUser = await User.findOne(userName)
    let newA = {recommended: [...searchedUser.recommended, body.id]}
    let blogId = body.id
    await User.findOneAndUpdate(userName, newA)
    const updatedUser = await User.findOne(userName);
    res.json(updatedUser)
})

// Create Comment
app.post('/blogpage/newcomment/:id', async (req, res) => {
    const body = req.body
    const id = req.params.id
    const existingPost = await BlogPost.findById({ _id: id }).lean();
    if(existingPost && existingPost.comment.length === 0){
        body.commentId = 1;
    }else{
        const maxExistingCommentId = Math.max(...existingPost.comment.map(x => x.commentId))
        body.commentId = maxExistingCommentId + 1;
    }
    let updatedPost = await BlogPost.findByIdAndUpdate(
        {
            _id: id
        },
        {
            comment: [
                ...existingPost.comment,
                body
            ]
        },
        {
            new: true,
            runValidators: true
        }
    )
    res.json(updatedPost)
})

// Delete Blog 
app.delete('/blogpage/:id',  async (req,res) => {
    const id = req.params.id
  let deletedPost =  await BlogPost.findByIdAndDelete( id )
    res.json('Blog Removed')
})
// Delete Comment
app.put('/blogpage/:id',  async (req,res) => {
    const body = req.body
    let currentComment = body.comment
    let commentPost = await BlogPost.findById(req.params.id)
    let currentcomments = commentPost.comment.filter(comment => comment.commentId !== currentComment); 
   await BlogPost.findByIdAndUpdate(req.params.id, {comment: currentcomments})
    res.json('comment removed')
})
// ! End Blog Page

// ! Register To Post
app.post('/users/register', async (req, res) => {
    const body = req.body
    try {
        const user = await User.create(await body);
        return res.json({ message: "try Message" })
    } catch (error) {
        let errorMessage = error.keyValue
        if (Object.keys(errorMessage)[0] === 'username') {
            console.log('username')
            return res.json({ message: 'username' })
        }
        if (Object.keys(errorMessage)[0] === 'email') {
            console.log('email')
            return res.json({ message: 'email' })
        }
    }
})
// !Login //
app.post('/users', async (req, res) => {
    const currentUser = req.body
    const foundUser = await User.findOne(currentUser)
    if (foundUser !== null) {
        res.json(foundUser)
    }
    else {
        res.json({ message: 'incorrect login' })
    }
})

app.get('/users', async (req, res) => {
    let regUser = await User.find({})
     res.json(regUser)
 })

// !Update Password //
app.put('/users', async (req, res) => {
    const user = { username: req.body.username }
    const fname = { fname: req.body.fname}
    const lname = { lname: req.body.lname}
    const email = { email: req.body.email}
    const userPassword = (req.body.password)
    try {
        let uservarify = {username: req.body.username, fname: req.body.fname, lname: req.body.lname, email: req.body.email   }
      const updatePassword =  await User.updateOne(uservarify,  { password: req.body.password })
      let matchCount = updatePassword.matchedCount
      if (matchCount === 0){
        return res.json({ message: 'Incorrect Information' })
      }
      if (matchCount === 1){
        return res.json({ message: 'Correct Information' })
      }
    } catch (error) {
        console.log('in here')
    } 
})

// ! Petition Form //
app.get('/petitionform', async (req, res) => {
   let filedForm = await PetitionForm.find({})
    res.json(filedForm)
})
app.post('/petitionform', async (req, res) => {
    const data = req.body
    const post = await PetitionForm.create(await data)
    res.json()
})







app.use(express.static('public'))
mongoose.connect('mongodb://127.0.0.1/ShroomiesBackEnd').then(() => {
    console.log('Connected to DB')
    app.listen(4000, () => {
        console.log('App listening on port 4000')
    })
})



