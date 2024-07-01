/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'parhuahzeiylrvfgxafx.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
    ],
  },

  // output: 'export',
};

export default nextConfig;
