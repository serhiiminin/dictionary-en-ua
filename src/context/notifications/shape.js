import PropTypes from 'prop-types';

const notificationShape = PropTypes.shape({
  id: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
});

const notificationsListShape = PropTypes.arrayOf(notificationShape);

export { notificationShape, notificationsListShape }
