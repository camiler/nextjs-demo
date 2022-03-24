const {
  PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD
} = require('next/constants');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = (phase, defaultConfig) => {
  const isProd = phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER;
  const isTest = process.env.APP_ENV === 'testing' && isProd;

  let type = 'dev';
  if (isTest) {
    type = 'testing'
  } else if (isProd) {
    type = 'prod'
  }
  console.log('env', type)
  const env = require(`./config/env.${type}`)
  return {
    eslint: {
      dirs: ['src']
    },
    // basePath: '/pages', // 基础路由
    distDir: 'dist',
    env,
    webpack: (config, options) => {
      return config
    }
  }
}

module.exports = (...args) => {
  return withBundleAnalyzer(nextConfig(...args))
}
