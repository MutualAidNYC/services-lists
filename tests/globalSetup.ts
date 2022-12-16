import dotenv from 'dotenv'

// loads environment variables before all test suites
module.exports = async () => {
  dotenv.config({ path: '.env.local' })
}
