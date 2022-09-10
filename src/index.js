const { send } = require('./utils/mailer');
const { crawl } = require('./utils/crawler');

const targets = require('./config/targets');

const SECOND = 1000;

const run = async () => {
  console.log('체크');
  const trains = await crawl();
  const availableTrains = trains.filter(({ isAvailable }) => isAvailable);
  if (availableTrains.length === 0) {
    console.log('실패');
    return;
  }

  const text = availableTrains.map(({ start, end }) => `${start} - ${end}`).join('\n');
  targets.forEach((to) => {
    send({ to, text, subject: '가능한 열차가 생겼음' });
  });
  console.log('성공');
};

setInterval(run, 180 * SECOND);
