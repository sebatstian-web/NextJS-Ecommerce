module.exports = ({ env }) => ({
  upload: {
    provider: 'cloudinary-folderoptions',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
      default_folder: env('CLOUDINARY_DEFAULT_FOLDER'),
    },
  },
});
// module.exports = ({ env }) => ({
//   upload: {
//     provider: 'aws-s3',
//     providerOptions: {
//       accessKeyId: env('AWS_ACCESS_KEY_ID'),
//       secretAccessKey: env('AWS_ACCESS_SECRET'),
//       region: 'sa-east-1',
//       params: {
//         Bucket: 'nextjs-ecommerce',
//       },
//     },
//   },
// });
