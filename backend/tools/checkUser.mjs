import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const email = process.argv[2];
if (!email) {
  console.error('Usage: node checkUser.mjs <email>');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email: email.toLowerCase().trim() }).lean();
    if (!user) {
      console.log('User not found for email=', email);
    } else {
      console.log('User found:', {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
      });
    }
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error querying DB:', err.message);
    process.exit(2);
  }
})();
