import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || process.env.MONGO_DB_LOCAL_URL;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongooseConnect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL, options);
    console.log(`✅ MongoDB is connected ${MONGO_DB_URL}`);
  } catch (error) {
    console.log(`❌ Not Connected to MongoDB' + ${error}`);
  }
};

export default mongooseConnect;
