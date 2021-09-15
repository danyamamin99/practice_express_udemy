const path = require('path');
const fs = require('fs');

class Card {

  static async add(course) {
    const card = await Card.fetch();

    const idx = card.courses.findIndex(item => item.id === course.id);

    const courseIdx = card.courses[idx];

    if (courseIdx) {
      courseIdx.count++;
      card.courses[idx] = courseIdx;
    } else {
      course.count = 1;
      card.courses.push(course);
    }

    card.price += +course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'card.json'), JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();

    const idx = card.courses.findIndex(item => item.id = id);
    const course = card.courses[idx];

    if (course.count === 1) {
      card.courses = card.courses.filter(item => item.id !== id);
    } else {
      card.courses[idx].count--;
    }

    card.price -= course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'card.json'), JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(card);
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, '..', 'data', 'card.json'), 'utf-8', (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Card;