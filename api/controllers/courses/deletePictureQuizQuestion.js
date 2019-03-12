const Course = require('../../models/course');
const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-east-1',
});

let s3 = new aws.S3();


exports.deletePictureQuizQuestion = (req, res) => {
  console.log(req.body)
  Course.findById(req.body.courseId)
      .exec()
      .then((course) => {
        if (course) {
          let tmpSections = course.sections;

          for(var i = 0; i <= 3; i++) {
            let params2 = {  Bucket: 'brainflop-picture-quiz', Key: tmpSections[req.body.sectionId].videos.find(v => { return v.videoId === req.body.oldVideoId }).pictureQuiz.quizQuestions[req.body.elemToDelete][`pictureAnswer${i + 1}`].split('/')[3] };
            s3.deleteObject(params2, function(err, data) {
              if(err) console.log(err)
            });
          }

          tmpSections[req.body.sectionId].videos.find(v => { return v.videoId === req.body.oldVideoId }).pictureQuiz.quizQuestions.splice(req.body.elemToDelete, 1);

          Course.findOneAndUpdate(
              { _id: req.body.courseId },
              { $set: { sections: tmpSections } },
              {upsert: true, 'new': true},
              (err, documents) => {
                if (err) {
                  return res.status(500).json({
                    message: 'an unexpected error occurred',
                    err
                  })
                }
                return res.status(200).json({
                  message: 'Course video successfully updated',
                  documents
                })
              },
          );
        } else {
          res.status(404).json({
            message: 'Course not found!'
          })
        }
      })
};