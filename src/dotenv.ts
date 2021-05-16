const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
try {
  const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
  // eslint-disable-next-line guard-for-in
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
} catch (e) {
  // do nothing
}
