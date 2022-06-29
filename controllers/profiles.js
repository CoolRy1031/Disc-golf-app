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
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteStats(req, res){
  Course.findById(req.user.profile._id.stats)
  .then(course => {
    course.stats.remove({_id: req.params.id})
    course.save()
    .then (() => {
      res.redirect (`/profiles/${req.user.profile._id}}`)
    })

    })
}



export{
  index,
  show,
  deleteStats as delete
}