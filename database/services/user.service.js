import User from '../models/user.model'

class UserService {
  async create(data) {
    return await User.create(data)
  }

  async validate(email, password) {
    const user = await User.findOne({ email })
    if (!user) return false
    const valid = await user.checkPassword(password)
    if (valid)
      return {
        _id: user._id,
        email: user.email,
        username: user.username
      }
    else return false
  }

  async findOne(query) {
    return await User.findOne(query)
  }
}

export default new UserService()
