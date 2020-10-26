var CronJob = require('cron').CronJob;

var job = new CronJob('* * * * * *', function() {
  console.log('You will see this message every second ', new Date().toISOString());
}, null, true, 'America/Los_Angeles');

job.start();
