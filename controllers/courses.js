import { Course } from "../models/course.js";

function newCourse(req, res) {
  res.render('courses/new', {
    title: 'Enter Course'
  })
  .catch(err => {
    console.log(err)
    res.redirect('/courses')
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
    if (course.owner.equals(req.user.profile._id)) {
      course.delete()
      .then(() => {
        res.redirect('/tacos')
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
  .populate('score')
  .then(course => {
    res.render('courses/show', {
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





export {
  newCourse as new,
  create,
  index,
  deleteCourse as delete, 
  show,
  createReview
}