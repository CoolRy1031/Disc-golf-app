import { Course } from "../models/course.js";
import { Profile } from "../models/profile.js"

function newCourse(req, res) {
  res.render('courses/new', {
    title: 'Enter Course'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  console.log(req.body)
  Course.create(req.body)
  .then(course => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      console.log(profile)
      profile.stats.push(course)
      profile.save()
      .then(() =>{
        res.redirect('/courses')
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/courses')
  })
}

function index(req, res) {
  Course.find({})
  .then(courses => {
    res.render("courses/index", {
      courses,
      title: "All Courses",
      user: req.user ? req.user : null
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/courses')
  })
}

function deleteCourse(req, res) {
  Course.findById(req.params.id)
  .then(course => {
    if (course.owner.equals(req.user.profile._id)) {
      course.delete()
      .then(() => {
        res.redirect('/courses')
      })
    } else {
      throw new Error ('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect("/courses")
  })
}

function show (req, res) {
  Course.findById(req.params.id)
  .then(course => {
    res.render('courses/show', {
      title: course,
      course,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/course')
  })
}

function createReview(req, res) {
  Course.findById(req.params.id)
  .then(course => {
    course.reviews.push(req.body)
    course.save()
    .then (() => {
      res.redirect(`/courses/${course._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/course')
  })
}

function createScore(req, res) {
  console.log(req.body)
  Course.findById(req.params.id)
  .then(course => {
    course.strokes.push(req.body)
    course.save()
    .then (() => {
      res.redirect(`/courses/${course._id}`)
    })
  })
}

function edit(req, res) {
  req.body.owner = req.user.profile._id
  Course.findById(req.params.id)
  .then(course => {
    res.render('courses/edit', {
      title: 'Edit Course',
      course,
    })
  })
}

function updateCourse(req, res) {
  Course.findById(req.params.id)
  .then(course => {
    if (course.owner.equals(req.user.profile._id)) {
      course.updateOne(req.body, {new: true})
      .then(updatedCourse => {
        res.redirect('/courses')
      })
    } else {
      throw new Error ('NOT AUTHORIZED')
    }
  })
}


export {
  newCourse as new,
  create,
  index,
  deleteCourse as delete, 
  show,
  createReview,
  createScore,
  edit,
  updateCourse,
}