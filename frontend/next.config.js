module.exports = {
  async rewrites() {
    return [
      {
        source: '/schedule',
        destination: '/',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/schedule',
        permanent: true,
      },
    ]
  },
}