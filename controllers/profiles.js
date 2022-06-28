import { Course } from "../models/course.js";
import { Profile } from "../models/profile.js";


function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: "Players",
    })
  })
  .catch (err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('stats')
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    console.log(profile, 'profile')
    res.render('profiles/show', {
      title: `${profile.name}'s profile`,
      profile,
      isSelf, 
    })
    // searching through courses to find all courses where owner id is same as profile

  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}



export{
  index,
  show
}