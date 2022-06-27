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



export{
  index,
  show
}