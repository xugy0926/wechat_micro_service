module.exports = {
  apps: [{
    name: 'gateway',
    script: './gateway/bin/www',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }, {
    name: 'client',
    script: './clientMgrService/src/app.js',
    instances: 1,
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }, {
    name: 'messageMgrService',
    script: './messageMgrService/src/app.js',
    instances: 1,
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }, {
    name: 'userMgrService',
    script: './userMgrService/src/app.js',
    instances: 1,
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }, {
    name: 'materialMgrService',
    script: './materialMgrService/src/app.js',
    instances: 1,
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }, {
    name: 'timing',
    script: './gateway/src/timing.js',
    instances: 1
  }]
}