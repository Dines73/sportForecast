dbPassword =
  "mongodb+srv://Name:" +
  encodeURIComponent("password") +
  "@mongo-name-jsubz.mongodb.net/test?retryWrites=true"
module.exports = {
  mongoURI: dbPassword
}
