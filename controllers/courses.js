import { Course } from "../models/course.js";

function newCourse(req, res) {
  res.render('courses/new', {
    title: 'Enter Course'
  })
}

function create(req, res) {
  console.log(req.body)
  Course.create(req.body)
  .then(course => {
    res.redirect('/courses')
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
      course.delete()
      .then(() => {
        res.redirect('/courses')
      })
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




export {
  newCourse as new,
  create,
  index,
  deleteCourse as delete, 
  show,
  createReview,
  createScore
}