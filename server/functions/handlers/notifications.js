const { db } = require('../utils/admin');
const { validateBodyContent } = require('../utils/validators');

// Mark notification read
exports.markNotificationsRead = (req, res) => {
  const { isValid, error } = validateBodyContent(req.body);
  if (!isValid) return res.status(400).json({ notifications: error });
  try {
    const batch = db.batch();

    const markedNotificationsIds = [];
    req.body.forEach(id => {
      try {
        const docRef = db.doc(`/notifications/${id}`);
        markedNotificationsIds.push(docRef.id);
        batch.update(docRef, { read: true });
      } catch (err) {
        console.error(
          'Error while adding notificationRefs to the updated batch',
          err
        );
      }
    });

    return batch.commit().then(() => {
      console.log('Notifications marked successfully');
      return res.status(200).json(markedNotificationsIds);
    });
  } catch (err) {
    console.error('Error marking notification(s) ', err);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};
