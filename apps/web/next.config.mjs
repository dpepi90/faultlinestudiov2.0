export default {
  experimental: { serverActions: { bodySizeLimit: '10mb' } },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/ideas',
        statusCode: 301,
      },
    ];
  },
};
