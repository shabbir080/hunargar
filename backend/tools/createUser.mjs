import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.model.js';

dotenv.config();

const argv = process.argv.slice(2);
const args = {};
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) {
    const key = argv[i].slice(2);
    const val = argv[i+1];
    args[key] = val;
    i++;
  }
}

const email = args.email;
const password = args.password || 'User1234!';
const name = args.name || 'Imported User';
const role = args.role || 'user';

if (!email) {
  console.error('Usage: node createUser.mjs --email <email> [--password <password>] [--name <name>] [--role <user|admin>]');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      console.log('User already exists:', existing.email);
      await mongoose.disconnect();
      process.exit(0);
    }

    const user = new User({ email: email.toLowerCase().trim(), password, name, role });
    await user.save();
    console.log('User created:', { _id: user._id, email: user.email, name: user.name, role: user.role });
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error creating user:', err.message);
    process.exit(2);
  }
})();
