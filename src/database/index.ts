import mongoose from 'mongoose';

mongoose
  .connect(String(process.env.MONGO_URL))
  .then(() => console.log('Connection with MongoDB was successful.'))
  .catch(() => console.error('Connection with MongoDB was falied.'));
mongoose.Promise = global.Promise;

export default mongoose;
