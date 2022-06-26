import { Course } from "../models/course.js";

function newCourse(req,res) {
  res.render('courses/new', {
    title: 'Enter Course'
  })

}


export{
  newCourse as new
}