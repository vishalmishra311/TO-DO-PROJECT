const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vishalmishra5500@gmail.com',
    pass: 'gefg jedq guav bxau',
  },
});

function sendEmail(task) {
  transporter.sendMail({
    from: 'vishalmishra5500@gmail.com',
    to: task.email,
    subject: 'Task Reminder',
    text: `Hi ${task.name}, it's time for your task Get ready: ${task.task}`
  }, (err, info) => {
    if(err) console.log(err);
    else console.log('Email sent:', info.response);
  });
}

module.exports = sendEmail;
