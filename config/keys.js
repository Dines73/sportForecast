dbPassword =
  "mongodb+srv://Name:" +
  encodeURIComponent("password") +
  "@node-rest-shop-jsubz.mongodb.net/test?retryWrites=true"
module.exports = {
  mongoURI: dbPassword
}
