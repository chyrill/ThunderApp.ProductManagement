const devConfig = {
  MONGO_URL: 'mongodb://localhost/productManagement-dev',
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/productManagement-test',
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/productManagement',
};

const defaultConfig = {
  PORT: process.env.PORT || 3001,
};

function envConfig(env) {
  switch (env){
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
