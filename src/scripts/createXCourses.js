const Course =  require('../models/course');
const User =  require('../models/user');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://jalenjackson:dumofkH3BtYq9yZv@coursecamp-qxarr.mongodb.net/development?retryWrites=true`,
  { useNewUrlParser: true })
  .then(() => {
    createXCourses();
  })
  .catch(err => throw err);

const createXCourses = async () => {
  try {
    for (let i = 0; i < 40; i++) {
      console.log('course started');
      const course = new Course({
        title: `Course ${ i + 1 }`,
        description: `Course description ${ i + 1 }`,
        category: `Course description ${ i + 1 }`,
        color: '#9068be',
        price: 20.99,
        language: 'English',
        learning: 'test,cool,yeah',
        date: new Date().toISOString(),
        status: 'Unpublished',
        rating: 0,
        creator: '5c895a2748de2f0011dbc133',
        summary: `Course summary ${ i + 1 }`
      });
      await course.save();
      const user = await User.findById('5c895a2748de2f0011dbc133');
      if(!user) console.log('no user');
      user.createdCourses.push(course);
      await user.save();
      console.log('course created');
    }
  } catch (e) {
    console.log(e);
  }
};