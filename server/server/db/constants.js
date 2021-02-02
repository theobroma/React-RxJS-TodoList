export const db =
  process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://localhost/tsreacttodolist';

export default {
  db
};
