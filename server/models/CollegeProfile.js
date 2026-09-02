import mongoose from 'mongoose';

const collegeProfileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Government Degree College Adilpur' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    establishedYear: { type: Number, default: null },
    directorMessage: {
      name: { type: String, default: '' },
      designation: { type: String, default: '' },
      photoUrl: { type: String, default: '' },
      message: { type: String, default: '' },
    },
    leadership: {
      ministerMessage: {
        title: { type: String, default: 'Minister for Education' },
        name: { type: String, default: '' },
        designation: { type: String, default: 'Minister for Education & Literacy, Sindh' },
        photoUrl: { type: String, default: '' },
        message: { type: String, default: '' },
      },
      secretaryMessage: {
        title: { type: String, default: 'Secretary College Education' },
        name: { type: String, default: '' },
        designation: { type: String, default: 'Secretary, College Education Department, Sindh' },
        photoUrl: { type: String, default: '' },
        message: { type: String, default: '' },
      },
      dcMessage: {
        title: { type: String, default: 'Deputy Commissioner' },
        name: { type: String, default: '' },
        designation: { type: String, default: 'Deputy Commissioner, District Ghotki' },
        photoUrl: { type: String, default: '' },
        message: { type: String, default: '' },
      },
      principalMessage: {
        title: { type: String, default: 'Principal / Director' },
        name: { type: String, default: '' },
        designation: { type: String, default: 'Principal, GDC Adilpur' },
        photoUrl: { type: String, default: '' },
        message: { type: String, default: '' },
      },
    },
    stats: {
      studentCount: { type: Number, default: 0 },
      facultyCount: { type: Number, default: 0 },
      departmentCount: { type: Number, default: 0 },
      passPercentage: { type: Number, default: 95 },
      campusArea: { type: String, default: '15 Acres' },
    },
    compliance: {
      affiliatedBoard: { type: String, default: '' },
      regulatoryNotes: { type: String, default: '' },
    },
    socialLinks: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      youtube: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    mission: { type: String, default: '' },
    vision: { type: String, default: '' },
    history: { type: String, default: '' },
  },
  { timestamps: true }
);

const CollegeProfile = mongoose.model('CollegeProfile', collegeProfileSchema);
export default CollegeProfile;
