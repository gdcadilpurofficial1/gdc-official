import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import CollegeProfile from '../models/CollegeProfile.js';
import AdmissionsInfo from '../models/AdmissionsInfo.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'Admin' });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
    } else {
      const admin = await User.create({
        name: 'Admin',
        email: 'admin@gdcadilpur.edu.pk',
        passwordHash: 'admin123456',
        role: 'Admin',
      });
      console.log('Admin user created:', admin.email);
    }

    // Seed CollegeProfile singleton if empty
    const profile = await CollegeProfile.findOne();
    if (!profile) {
      await CollegeProfile.create({
        name: 'Government Degree College Adilpur',
        address: 'Adilpur, District Ghotki, Sindh, Pakistan',
        phone: '',
        email: 'info@gdcadilpur.edu.pk',
        establishedYear: null,
        mission: 'To provide quality higher education accessible to all.',
        vision: 'A center of academic excellence in the region.',
      });
      console.log('College profile seeded');
    }

    // Seed AdmissionsInfo singleton if empty
    const admissions = await AdmissionsInfo.findOne();
    if (!admissions) {
      await AdmissionsInfo.create({
        eligibilityText: 'Eligibility criteria will be updated by the college administration.',
        howToApplyText: 'Application process details will be updated by the college administration.',
        importantDatesText: 'Important dates will be announced by the college administration.',
      });
      console.log('Admissions info seeded');
    }

    console.log('Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedAdmin();
