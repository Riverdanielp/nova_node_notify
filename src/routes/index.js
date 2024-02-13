const { Router } = require("express");
const router = Router();

const webpush = require("../webpush");
let pushSubscripton;

router.post("/subscription", async (req, res) => {
  pushSubscripton = req.body;
  console.log(pushSubscripton);

  // Server's Response
  res.status(201).json();
});

router.post("/new-message", async (req, res) => {
  const { message } = req.body;
  // Payload Notification
  const payload = JSON.stringify({
    title: "My Custom Notification",
    message 
  });
  res.status(200).json();
  try {
    await webpush.sendNotification(pushSubscripton, payload);
  } catch (error) {
    console.log(error);
  }
});
router.post('/send-notification', (req, res) => {
  const { subscription, title, message } = req.body;

  const payload = JSON.stringify({ title, message });

  webpush.sendNotification(subscription, payload)
    .then(result => console.log('Notificación enviada', result))
    .catch(err => console.error(err));

  res.json({ success: true, message: 'Notificación enviada.' });
});
module.exports = router;
