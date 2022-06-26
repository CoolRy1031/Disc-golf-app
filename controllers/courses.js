import { Course } from "../models/course.js";

function index(req, res) {
  res.render('course/index', {
    title,
  })
}

export {
  index,
}