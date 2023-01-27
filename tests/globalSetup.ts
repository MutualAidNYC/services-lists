import dotenv from 'dotenv'

// Loads environment variables before all test suites.
module.exports = async () => {
  dotenv.config({ path: '.env.local' })
}
