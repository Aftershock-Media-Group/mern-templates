import { UserModel } from '../../models/user.model'

export default async ({ userId }) => {
  const user = await UserModel.findById(userId)
  return { user }
}
