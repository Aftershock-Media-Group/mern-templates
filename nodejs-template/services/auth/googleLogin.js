import GoogleStrategy from 'passport-google-oidc'
import { UserModel } from '../../models/user.model'
import createAuthToken from '../../utils/createAuthToken'

export default (passport, api) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.REDIRECT_URL}oauth2/google`,
      },
      async function (issuer, profile, cb) {
        let user = await UserModel.findOne(
          { email: profile.emails[0].value },
          'name _id role'
        )
        if (!profile.emails[0].value.includes('amg.gg')) {
          return cb(null, null)
        }
        if (!user) {
          user = await UserModel.create({
            email: profile.emails[0].value,
            name: profile.displayName,
          })
        }
        return cb(null, user)
      }
    )
  )

  api.get(
    '/oauth2/google',
    passport.authenticate('google', {
      failureRedirect: `${process.env.OAUTH_URL}error`,
      session: false,
    }),
    function (req, res) {
      res.redirect(
        `${process.env.OAUTH_URL}?token=${createAuthToken(req.user._id)}&role=${
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
