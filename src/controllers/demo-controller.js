const demoService = require('../services/demo-service');

function printRequest(req, res) {
  console.log('printRequest', JSON.stringify(req.body));
  return res.status(200).send({});
}

function subscribeMinutes(req, res) {
  console.log('subscribeMinutes', JSON.stringify(req.body));
  const {
    payload: {
      inputFields: {
        duration: { seconds, minutes },
      },
      webhookUrl,
    },
  } = req.body;

  if (seconds === 'undefined' && minutes === 'undefined') throw new Error('Duration not supported');
  const interval = (minutes || 0) * 60000 + (seconds || 0) * 1000;

  const intervalId = demoService.addIntervalTrigger(webhookUrl, interval);

  return res.status(200).send({ webhookId: intervalId });
}

function subscribeScheduled(req, res) {
  console.log('subscribeScheduled', JSON.stringify(req.body));
  const {
    payload: {
      inputFields: {
        dateTriggerConfig: { offset, hour, utcDaysDiff, timezone },
      },
      webhookUrl,
    },
  } = req.body;


 const intervalId = demoService.addScheduledTrigger(webhookUrl, hour, utcDaysDiff, timezone);

  return res.status(200).send({ webhookId: intervalId });
}

function unsubscribeMinutes(req, res) {
  console.log('unsubscribeMinutes', JSON.stringify(req.body));
  const {
    payload:
      { webhookId },
  } = req.body;
  demoService.removeIntervalTrigger(webhookId);
  return res.status(200).send({ result: 'Thanks for stopping me!' });
}

function synchronize(req, res) {
  console.log('synchronize', JSON.stringify(req.body));
  const {
    payload:
      {
        inputFields: {
          boardId,
          columnId
        }
      }
     ,
  } = req.body;
  demoService.synchronizeCSV(req, boardId, columnId);
  return res.status(200).send({ result: 'synchronize!' });
}

function unsubscribeScheduled(req, res) {
  console.log('unsubscribeScheduled', JSON.stringify(req.body));
  const {
    payload: { webhookId },
  } = req.body;
  demoService.removeIntervalTrigger(webhookId);
  return res.status(200).send({ result: 'Thanks for stopping me!' });
}

function getDemoFieldDefs(req, res) {
  console.log('getDemoFieldDefs', JSON.stringify(req.body));

  return res.status(200).send([
    { id: 'field1', title: 'Field 1', outboundType: 'text', inboundTypes: ['text', 'text_array', 'text_with_label'] },
    { id: 'field2', title: 'Field 2', outboundType: 'date', inboundTypes: ['empty_value', 'date', 'date_time'] },
  ]);
}

module.exports = {
  printRequest,
  subscribeMinutes,
  unsubscribeMinutes,
  subscribeScheduled,
  unsubscribeScheduled,
  synchronize,
  getDemoFieldDefs
};
