const Queue = require('bull');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const redisConfig = require('../../config/redis');
const jobs = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const queue = require(path.join(__dirname, file));

    jobs[queue.name] = queue;
  });

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
}));

module.exports = {
  queues,
  add(name, data) {
    const queue = this.queues.find((queue) => queue.name === name);

    return queue.bull.add(data);
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', job.name, err);
      });
    });
  },
};
