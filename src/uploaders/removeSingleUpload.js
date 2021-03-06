const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_COURSE_CAMP,
  accessKeyId: process.env.AWS_ACCESS_KEY_COURSE_CAMP,
  region: 'us-east-1',
});

let s3 = new aws.S3();

exports.remove = (req, res) => {
  s3.deleteObject({  Bucket: 'course-camp-file-storage', Key: req.body.fileId }, function(err) {
    if (err) {
      res.status(500).json({
        error: true
      })
    } else {
      res.status(200).json({
        message: 'Delete request successful'
      })
    }
  });
};
