// import AWS from "aws-sdk";
// import { S3Client } from '@aws-sdk/client-sns';
// import multer from "multer";
// import multerS3 from "multer-s3";
// import dotenv from 'dotenv'
// dotenv.config()

// const s3Config = new S3Client({
//    region: process.env.AWS_REGION,
//    credentials:{
//       accessKeyId:process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   }
// })

// const upload = multer({
//     storage: multerS3({
//         s3: s3Config,
//         bucket: process.env.S3_BUCKET_NAME || '',
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString())
//         }
//     })
// })


// export { upload }