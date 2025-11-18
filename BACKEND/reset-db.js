// Reset Database Script
// This will clear all users and create fresh test users

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  avatarUrl: String,
  className: String,
  section: String,
  createdAt: Date
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function resetDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    console.log('\nClearing existing users...');
    const deleteResult = await User.deleteMany({});
    console.log(`✓ Deleted ${deleteResult.deletedCount} users`);

    console.log('\nCreating test users...');
    
    // Create Admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: adminPassword,
      role: 'admin',
      createdAt: new Date()
    });
    console.log('✓ Created admin user: admin@test.com / admin123');

    // Create Teacher
    const teacherPassword = await bcrypt.hash('teacher123', 10);
    const teacher = await User.create({
      name: 'Teacher User',
      email: 'teacher@test.com',
      password: teacherPassword,
      role: 'teacher',
      createdAt: new Date()
    });
    console.log('✓ Created teacher user: teacher@test.com / teacher123');

    // Create Student
    const studentPassword = await bcrypt.hash('student123', 10);
    const student = await User.create({
      name: 'Student User',
      email: 'student@test.com',
      password: studentPassword,
      role: 'student',
      createdAt: new Date()
    });
    console.log('✓ Created student user: student@test.com / student123');

    console.log('\n✅ Database reset complete!');
    console.log('\nYou can now login with:');
    console.log('  Admin:   admin@test.com / admin123');
    console.log('  Teacher: teacher@test.com / teacher123');
    console.log('  Student: student@test.com / student123');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');
    process.exit(0);
  }
}

resetDatabase();
