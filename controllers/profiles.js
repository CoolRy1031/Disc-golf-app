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
  // console.log('profileId', req.params.profileId)
  // console.log('courseId', req.params.courseId)
  // console.log('scoreId', req.params.scoreId)
  Profile.findById(req.params.profileId)
  .then(profile => {
    Course.findById(req.params.courseId)
    .then(course => {
      if(course.owner.equals(req.user.profile._id)){
        course.strokes.remove({_id:req.params.scoreId})
        course.save()
        .then(()=> {
          res.redirect (`/profiles/${profile._id}`)
        })
      }else{
        throw new Error('Not Authorized')
      }
    })
  })
}



export{
  index,
  show,
  deleteStats as delete
}