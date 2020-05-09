// s3 image uploading
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: 'rLYf9kc0Rf7IAuTEjMnh9jOE4XJ0XjNLgPCA42mC',
  accessKeyId: 'AKIAJEQJUNPFROFTJZCA',
  region: 'us-east-2'
})

const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false)
  }
}

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'spicecurlsproducts',
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload
