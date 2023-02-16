const { faker } = require("@faker-js/faker");
const connectDatabase = require("../config/connectDatabase");
const { User } = require("../database/User");
const { Doctor } = require("../database/Doctor");
const { Comment } = require("../database/Comment");
const crypto = require("crypto");

const genders = ["male", "female", "other"];

const prices = [250, 300, 350, 400, 450, 500, 600, 1000];
const states = [
  "Andhra Pradesh",
  "Assam",
  "Odisha",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Jharkhand",
  "Karnataka",
  "Maharashtra",
];

let departments = [
  "Dentist",
  "Gynecologist",
  "Dermatologist",
  "General Physician",
  "Homoeopath",
  "Ayurveda",
  "Dermatologist",
  "Child specialist",
];

async function generateFakeUserData(count = 500) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const gender = genders[crypto.randomInt(0, 2)];
    const user = {
      name: faker.name.fullName({
        sex: gender,
      }),
      email: faker.internet.email(),
      image: faker.internet.avatar(),
      password: faker.internet.password(),
      price: prices[crypto.randomInt(0, 8)],
      state: states[crypto.randomInt(0, 10)],
      yearexp: crypto.randomInt(1, 30),
      votes: crypto.randomInt(24, 488),
      PatientStories: crypto.randomInt(10, 300),
      department: departments[crypto.randomInt(0, 8)],
      //   signinMethod: "email-password",
      hospital: faker.company.name(),
      gender: gender,
    };
    users.push(user);
  }

  // "id": 1,
  // "first_name": "Cathyleen",
  // "last_name": "Coulbeck",
  // "email": "ccoulbeck0@usgs.gov",
  // "gender": "Female",
  // "ip_address": "Room 1149",
  // "city": "Begejci",
  // "price": 439,
  // "profile_image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIESURBVDjLpZM9S9ZhFIev/+Pz+BKGUBAZJUQEOqRCi6hDYAYtfQdXySki+wYubeHQEoHQWoRLYBGIOFhkJTg0tCShgfq83W/nPqfhH9SgIXTGM1zn+p3DKcyM/6nqUc3553uWVYkCOStRlCDKs9lLxYkAISqTg6cQVdRAsvFyo35yA5eUmJW9QyFlo6+ng6bTkwNaToii+KRINkK1QsPJ0QB7eL/coiqWBEtC+/IDQjR8MpIo3bVM3ed/GEzdBFWKnClyprGpBDFcyKQMPTWjflwES0IhAh/egyQYHqXpIj4p7VhG8J0F4tIxgBBLQPCQBJJwGIyQFBeUlI3eLkVbytzKjKUoxJhIPhFCoqI+gAj4AN5DjDRbio+Gi6WFT8ZQ/xqdXzO23UC29xnQAXzLU1X3e3IIECOIIC6VBlGJ2QjtZW5MbHB9aIyLZ67ydusF619WONgVKtoup+JcaZAS2lJ8LAEuKu3GC0YHR8iVzEj/NLlIjF0bJzYOqVjb/RWhjKNOcekPYL/5g1rRy52hOQDuTT3hyrlhMKOqbQcpwfgE5AwimBOiGOf7aojC928HbO2ssbmzyvz0UxZez9Dd0VVe4VHXLXRpFwuCpYyljPZmlpd2ICqWhbMDt1n/9Ibx4UlefV6ks6iy+vEd9Z9DFCd957G7FxaAWeA00AAW1x/vzP8Cqr99v3YC63EAAAAASUVORK5CYII=",
  // "yearexp": 8,
  // "votes": 159,
  // "PatientStories": 200,
  // "deparment": 4
  Doctor.insertMany(users);
}

// async function generateFakePostData(count = 3000) {
//   const users = await User.find();
//   const posts = [];

//   for (let i = 0; i < count; i++) {
//     const user = users[crypto.randomInt(0, users.length)];

//     const post = {
//       title: faker.hacker.phrase(),
//       content: faker.lorem.paragraphs(crypto.randomInt(5, 10)),
//       author: {
//         userId: user._id,
//         name: user.name,
//         image: user.image,
//       },
//     };

//     posts.push(post);
//   }

//   await Post.insertMany(posts);

//   console.log("Added all posts");
// }

// async function generateFakeCommentData(count = 30000) {
//   const users = await User.find();

//   const posts = await Post.find(); // [1, 2, 3, 4]

//   const comments = [];

//   for (let i = 0; i < count; i++) {
//     const user = users[crypto.randomInt(0, users.length)];
//     const post = posts[crypto.randomInt(0, posts.length)]; // [0, 3]

//     const comment = {
//       content: faker.lorem.paragraph(),
//       user: {
//         userId: user._id,
//         name: user.name,
//         image: user.image,
//       },
//       post: {
//         postId: post._id,
//         title: post.title,
//       },
//     };

//     comments.push(comment);
//   }

//   await Comment.insertMany(comments);

//   console.log("Added data for comments");
// }

connectDatabase().then(() => generateFakeUserData(240));
