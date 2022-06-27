import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema ({
  name: String,
  avatar: String,
  stats: [{ type: Schema.Types.ObjectId, ref:"Course" }],
  strictPopulate: false,


}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)


export {
  Profile
}
