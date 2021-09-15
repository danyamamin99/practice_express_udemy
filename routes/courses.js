const {Router} = require('express');
const Course = require('../models/course');

const router = Router();

router.get('/', async (req, res) => { 
  const courses = await Course.getAll();

  res.render('courses', {
    title: 'Курсы',
    isCourse: true,
    courses
  })
});

router.get('/:id', async (req, res) => {
  const course = await Course.getId(req.params.id);

  res.render('course', {
    layout: 'course',
    title: `Курс ${course.title}`,
    course,
  });
});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/');
  }
  
  const course = await Course.getId(req.params.id);

  res.render('course-edit', {
    title: `Редактировать ${course.title}`,
    course,
  });
});

router.post('/edit' , async (req, res) => {
  await Course.update(req.body);
  
  res.redirect('/courses')
});

module.exports = router;