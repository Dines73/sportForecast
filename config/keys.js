dbPassword =
  "mongodb+srv://Name:" +
  encodeURIComponent("password") +
  "@mongodb-name.mongodb.net/test?retryWrites=true"

module.exports = {
  mongoURI: dbPassword
}
