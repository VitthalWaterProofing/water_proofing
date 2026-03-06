import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import connectDB from './config/db';

dotenv.config();

connectDB();

const seedData = async () => {
  try {
    const adminExists = await User.findOne({ email: 'ashish@vitthalwaterproofing.com' });

    if (adminExists) {
        console.log('Super Admin already exists!');
        process.exit();
    }

    const createdAdmin = await User.create({
      name: 'Super Admin',
      email: 'ashish@vitthalwaterproofing.com',
      password: 'Ashish@123', // The User model will hash this automatically
      role: 'super_admin'
    });

    console.log(`Successfully created initial admin user!\nEmail: ${createdAdmin.email}\nPassword: yourpassword`);
    process.exit();
  } catch (error) {
    console.error(`Error with seeder: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
    try {
      await User.deleteMany();
      console.log('Data Destroyed!');
      process.exit();
    } catch (error) {
      console.error(`Error with destruction: ${error}`);
      process.exit(1);
    }
  };

if (process.argv[2] === '-d') {
  destroyData();
} else {
  seedData();
}
