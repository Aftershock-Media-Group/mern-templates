import GoogleStrategy from 'passport-google-oidc'
import { UserModel } from '../../models/user.model'
import createAuthToken from '../../utils/createAuthToken'

export default (passport, api) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5021/oauth2/google',
      },
      async function (issuer, profile, cb) {
        console.log(profile)
        const user = await UserModel.findOne(
          { email: profile.emails[0].value },
          'name _id role'
        )
        if (user) {
          if (!user.name) {
            user.name = profile.displayName
            await user.save()
          }
          return cb(null, user)
        } else {
          return cb(null, null)
        }
      }
    )
  )

  api.get(
    '/oauth2/google',
    passport.authenticate('google', {
      failureRedirect: 'http://localhost:3000/error',
      session: false,
    }),
    function (req, res) {
      res.redirect(
        `http://localhost:3000/?token=${createAuthToken(req.user._id)}&role=${
          req.user.role
        }&name=${req.user.name}&_id=${req.user._id}`
      )
    }
  )

  api.get(
    '/login/google',
    passport.authenticate('google', {
      session: false,
      scope: ['email', 'profile'],
    })
  )
}
