import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from '@/utils/config'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    maxLength: 64,
    required: true,
    trim: true,
    unique: true,
    validate: [
      function (email) {
        const matchesRegex = email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )

        if (!matchesRegex) return false
        return true
      },
      'Invalid email'
    ]
  },
  username: {
    type: String,
    maxLength: 64,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, config.SALT_ROUNDS)
    next()
  } else next()
})

userSchema.methods.checkPassword = async function (password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) return reject(err)
      return resolve(same)
    })
  })
}

export default mongoose.models.user || mongoose.model('user', userSchema)
