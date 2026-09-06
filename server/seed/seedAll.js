import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/User.js';
import CollegeProfile from '../models/CollegeProfile.js';
import HeroSlide from '../models/HeroSlide.js';
import Department from '../models/Department.js';
import Faculty from '../models/Faculty.js';
import Program from '../models/Program.js';
import AdmissionsInfo from '../models/AdmissionsInfo.js';
import FeeScheme from '../models/FeeScheme.js';
import Notice from '../models/Notice.js';
import Download from '../models/Download.js';
import SuccessStory from '../models/SuccessStory.js';
import GalleryItem from '../models/GalleryItem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gdc_adilpur';

const seedData = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // 1. Seed Users (Admin & Clerk)
    await User.deleteMany({});

    await User.create([
      {
        name: 'Principal Office (Admin)',
        email: 'admin@gdcadilpur.edu.pk',
        passwordHash: 'Khan868@0',
        role: 'Admin',
        isActive: true,
      },
      {
        name: 'College Clerk Office',
        email: 'clerk@gdcadilpur.edu.pk',
        passwordHash: 'Clerk@8680',
        role: 'Clerk',
        isActive: true,
      },
    ]);
    console.log('✔ Users seeded: admin@gdcadilpur.edu.pk (Khan868@0) & clerk@gdcadilpur.edu.pk (Clerk@8680)');

    // 2. Seed College Profile
    await CollegeProfile.deleteMany({});
    await CollegeProfile.create({
      name: 'Government Degree College Adilpur',
      address: 'Adilpur Town, Taluka Mirpur Mathelo, District Ghotki, Sindh, Pakistan',
      phone: '+92 (0723) 680120',
      email: 'info@gdcadilpur.edu.pk',
      establishedYear: 2008,
      directorMessage: {
        name: 'Prof. Sher Dil Kalwar',
        designation: 'Principal, GDC Adilpur',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        message: 'Welcome to Government Degree College Adilpur. Our institution is committed to nurturing academic excellence, discipline, and moral character in the youth of District Ghotki. We provide quality education in Pre-Engineering, Pre-Medical, Humanities, and Associate Degree Programs to prepare students for competitive higher education and successful careers.',
      },
      leadership: {
        ministerMessage: {
          title: 'Minister for Education',
          name: 'Syed Sardar Ali Shah',
          designation: 'Minister for Education & Literacy, Sindh',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
          message: 'Education is the cornerstone of development in Sindh. Government Degree College Adilpur stands as a beacon of learning in District Ghotki. We remain dedicated to equipping our educational institutions with state-of-the-art facilities and qualified faculty.',
        },
        secretaryMessage: {
          title: 'Secretary College Education',
          name: 'Sadaf Anees',
          designation: 'Secretary, College Education Department, Sindh',
          photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
          message: 'The College Education Department continues to prioritize merit, academic standards, and modern educational infrastructure across degree colleges in Sindh.',
        },
        dcMessage: {
          title: 'Director General',
          name: 'Muhammad Usman Tanveer (PAS)',
          designation: 'Director General, District Ghotki',
          photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
          message: 'The district administration takes immense pride in supporting Government Degree College Adilpur in its mission to empower youth and foster civic and intellectual growth.',
        },
        regionalDirectorMessage: {
          title: 'Regional Director',
          name: '',
          designation: 'Regional Director Colleges, Sukkur Region',
          photoUrl: '',
          message: '',
        },
        principalMessage: {
          title: 'Principal',
          name: 'Prof. Sher Dil Kalwar',
          designation: 'Principal (BPS-19), GDC Adilpur',
          photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
          message: 'Welcome to Government Degree College Adilpur. Our institution is dedicated to nurturing academic brilliance, moral integrity, and leadership qualities in the youth of District Ghotki.',
        },
      },
      stats: {
        studentCount: 850,
        facultyCount: 16,
        departmentCount: 9,
        passPercentage: 96,
        campusArea: '12 Acres',
      },
      compliance: {
        affiliatedBoard: 'BISE Sukkur & Shah Abdul Latif University (SALU) Khairpur',
        regulatoryNotes: 'Recognized by Sindh College Education Department & Higher Education Commission (HEC).',
      },
      socialLinks: {
        facebook: 'https://web.facebook.com/people/Government-Degree-College-Adilpur/61551407020559/?sk=about',
        twitter: 'https://twitter.com/gdcadilpur',
        youtube: 'https://youtube.com',
        instagram: 'https://instagram.com',
      },
      mission: 'To provide accessible, high-quality higher education in District Ghotki, empowering youth with scientific inquiry, moral values, and academic competence.',
      vision: 'To emerge as a premier center of educational excellence and leadership in upper Sindh.',
      history: 'Established in 2008 by the Government of Sindh, GDC Adilpur serves the educational needs of students across Adilpur, Mirpur Mathelo, and Ghotki district.',
    });
    console.log('✔ College Profile seeded');

    // 3. Seed Hero Slides
    await HeroSlide.deleteMany({});
    await HeroSlide.insertMany([
      {
        title: 'Admissions Open 2026-2027',
        subtitle: 'Apply for XI (Pre-Engineering, Pre-Medical, Humanities) & ADP (Associate Degree Program) at GDC Adilpur.',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
        order: 1,
        isActive: true,
      },
      {
        title: 'Dedicated & Highly Qualified Faculty',
        subtitle: '16 BPS-17 to BPS-19 Professors and Lecturers guiding students towards academic success.',
        imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
        order: 2,
        isActive: true,
      },
      {
        title: 'Modern Science & Learning Environment',
        subtitle: 'Equipped Physics, Chemistry, Zoology, and Computer Science departments.',
        imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80',
        order: 3,
        isActive: true,
      },
    ]);
    console.log('✔ Hero Slides seeded');

    // 4. Seed Departments & 16 Teaching Staff Members
    await Department.deleteMany({});
    await Faculty.deleteMany({});

    const deptPhy = await Department.create({ name: 'Physics', description: 'Department of Physics' });
    const deptMath = await Department.create({ name: 'Mathematics', description: 'Department of Mathematics' });
    const deptEng = await Department.create({ name: 'English', description: 'Department of English Language & Literature' });
    const deptPakSt = await Department.create({ name: 'Pakistan Studies', description: 'Department of Social Sciences & Pakistan Studies' });
    const deptChem = await Department.create({ name: 'Chemistry', description: 'Department of Chemical Sciences' });
    const deptIsl = await Department.create({ name: 'Islamic Studies / Culture', description: 'Department of Islamic Studies & Culture' });
    const deptSindhi = await Department.create({ name: 'Sindhi', description: 'Department of Sindhi Language & Literature' });
    const deptUrdu = await Department.create({ name: 'Urdu', description: 'Department of Urdu Language & Literature' });
    const deptZoo = await Department.create({ name: 'Zoology', description: 'Department of Biological Sciences & Zoology' });

    const facultyList = [
      // 1. Principal BPS-19
      { name: 'Sher Dil Kalwar', designation: 'Principal (BPS-19)', departmentId: deptPhy._id, qualification: 'M.Sc Physics', email: 'principal@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', isActive: true },

      // 2. Associate Professors BPS-19
      { name: 'Abdul Waheed Kalwar', designation: 'Associate Professor (BPS-19)', departmentId: deptMath._id, qualification: 'M.Sc Mathematics', email: 'abdulwaheed@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', isActive: true },
      { name: 'Azam Hayat Bhutto', designation: 'Associate Professor (BPS-19)', departmentId: deptEng._id, qualification: 'M.A English', email: 'azam.bhutto@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', isActive: true },

      // 3. Assistant Professors BPS-18
      { name: 'Imdad Ali Korai', designation: 'Assistant Professor (BPS-18)', departmentId: deptPakSt._id, qualification: 'M.A Pakistan Studies', email: 'imdad.korai@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', isActive: true },
      { name: 'Yaseen', designation: 'Assistant Professor (BPS-18)', departmentId: deptEng._id, qualification: 'M.A English', email: 'yaseen@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', isActive: true },
      { name: 'Lal Mohammad Seelro', designation: 'Assistant Professor (BPS-18)', departmentId: deptChem._id, qualification: 'M.Sc Chemistry', email: 'lalmohammad@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', isActive: true },
      { name: 'Muhammad Bakhsh', designation: 'Assistant Professor (BPS-18)', departmentId: deptIsl._id, qualification: 'M.A Islamic Culture', email: 'muhammadbakhsh@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', isActive: true },
      { name: 'Vijeesh Kumar', designation: 'Assistant Professor (BPS-18)', departmentId: deptEng._id, qualification: 'M.A English', email: 'vijeeshkumar@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80', isActive: true },
      { name: 'Muhammad Iqbal', designation: 'Assistant Professor (BPS-18)', departmentId: deptSindhi._id, qualification: 'M.A Sindhi', email: 'muhammadiqbal@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', isActive: true },

      // 4. Lecturers BPS-17
      { name: 'Abdul Latif Mahar', designation: 'Lecturer (BPS-17)', departmentId: deptMath._id, qualification: 'M.Sc Mathematics', email: 'abdullatif@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80', isActive: true },
      { name: 'Farhan Ali', designation: 'Lecturer (BPS-17)', departmentId: deptEng._id, qualification: 'M.A English', email: 'farhanali@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', isActive: true },
      { name: 'Ashfaque Ahmed', designation: 'Lecturer (BPS-17)', departmentId: deptUrdu._id, qualification: 'M.A Urdu', email: 'ashfaque@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', isActive: true },
      { name: 'Tahir Ali Kalwar', designation: 'Lecturer (BPS-17)', departmentId: deptPhy._id, qualification: 'M.Sc Physics', email: 'tahir.kalwar@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', isActive: true },
      { name: 'Zafarullah Kalwar', designation: 'Lecturer (BPS-17)', departmentId: deptIsl._id, qualification: 'M.A Islamic Culture', email: 'zafarullah@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', isActive: true },
      { name: 'Sadullah Khoharo', designation: 'Lecturer (BPS-17)', departmentId: deptZoo._id, qualification: 'M.Sc Zoology', email: 'sadullah@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', isActive: true },
      { name: 'Darshan Lal', designation: 'Lecturer (BPS-17)', departmentId: deptPhy._id, qualification: 'M.Sc Physics', email: 'darshanlal@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', isActive: true },
    ];

    await Faculty.insertMany(facultyList);
    console.log('✔ 9 Departments & 16 Teaching Staff Members seeded');

    // 5. Seed Programs (Pre-Engineering, Pre-Medical, ADP)
    await Program.deleteMany({});
    await Program.insertMany([
      {
        name: 'F.Sc Pre-Engineering',
        level: 'Intermediate',
        duration: '2 Years',
        eligibility: 'Matriculation (Science) from BISE Sukkur or recognized board',
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Urdu/Sindhi', 'Islamiat/Pakistan Studies'],
        description: 'Two-year intermediate program focusing on mathematics, physics, and physical sciences for engineering admissions.',
        isActive: true,
      },
      {
        name: 'F.Sc Pre-Medical',
        level: 'Intermediate',
        duration: '2 Years',
        eligibility: 'Matriculation (Science) with min 50% marks',
        subjects: ['Physics', 'Chemistry', 'Zoology/Biology', 'English', 'Urdu/Sindhi', 'Islamiat/Pakistan Studies'],
        description: 'Intermediate biological and physical sciences program preparing students for medical entrance exams (MDCAT).',
        isActive: true,
      },
      {
        name: 'ADP (Associate Degree Program)',
        level: 'Undergraduate',
        duration: '2 Years',
        eligibility: 'Intermediate (F.Sc / FA / ICS) with min 45% marks',
        subjects: ['Core Major Subjects', 'General Humanities', 'Computer Literacy', 'English Composition'],
        description: '2-Year Associate Degree Program affiliated with Shah Abdul Latif University (SALU) Khairpur.',
        isActive: true,
      },
    ]);
    console.log('✔ Programs seeded (Pre-Engineering, Pre-Medical, ADP)');

    // 6. Seed Admissions Info
    await AdmissionsInfo.deleteMany({});
    await AdmissionsInfo.create({
      eligibilityText: 'Candidates seeking admission to Class XI (F.Sc Pre-Engineering, Pre-Medical, Humanities) or ADP must have passed SSC / HSSC from BISE Sukkur or recognized boards.',
      howToApplyText: '1. Collect admission application forms from college office.\n2. Submit completed application with required marksheets, domicile, and photographs.\n3. Merit lists will be published on college notice board.',
      importantDatesText: '• Application Submission Start: August 15, 2026\n• Last Date for Submission: September 15, 2026\n• First Merit List Display: September 20, 2026\n• Classes Commencement: October 01, 2026',
      portalUrl: 'https://seccap.dgcs.gos.pk',
      documentsChecklist: ['Matriculation Marksheet & Pass Certificate', 'Character Certificate', 'Student B-Form / CNIC Copy', 'Father/Guardian CNIC Copy', '6 Passport-size Photographs', 'District Domicile & PRC'],
    });
    console.log('✔ Admissions Info seeded');

    // 7. Seed Fee Schemes
    await FeeScheme.deleteMany({});
    await FeeScheme.insertMany([
      { programName: 'F.Sc Pre-Engineering / Pre-Medical (XI & XII)', admissionFee: 500, tuitionFee: 1200, securityDeposit: 300, totalFee: 2000, breakdownText: 'Government subsidized fee per annual academic session.', isActive: true },
      { programName: 'ADP (Associate Degree Program 2-Year)', admissionFee: 1000, tuitionFee: 2500, securityDeposit: 500, totalFee: 4000, breakdownText: 'Per semester fee including University affiliation charges.', isActive: true },
    ]);
    console.log('✔ Fee Schemes seeded');

    // 8. Seed Notices (2026 Aug-Sept)
    await Notice.deleteMany({});
    await Notice.insertMany([
      {
        title: 'Admissions Open for Class XI (F.Sc Pre-Eng, Pre-Med, Humanities) Session 2026-2027',
        category: 'Admission',
        body: 'Applications are officially invited for admission to Intermediate Part-I (Class XI) for session 2026-2027. Forms are available at the college main desk.',
        isPinned: true,
        publishDate: new Date('2026-08-15'),
      },
      {
        title: 'Commencement of Classes for XI & XII Session 2026-2027',
        category: 'Academic',
        body: 'All newly admitted and continuing students are hereby informed that regular academic classes will commence from October 1, 2026.',
        isPinned: true,
        publishDate: new Date('2026-09-01'),
      },
      {
        title: 'BISE Sukkur XI Registration & Enrolment Form Schedule 2026',
        category: 'Examination',
        body: 'Students of Class XI must submit their enrolment forms along with required documents to the college clerk office by September 25, 2026.',
        isPinned: false,
        publishDate: new Date('2026-09-03'),
      },
      {
        title: 'ADP 1st & 2nd Year Examination Schedule 2026 (SALU Khairpur)',
        category: 'Examination',
        body: 'Shah Abdul Latif University Khairpur has issued examination schedule for Associate Degree Program (ADP) students.',
        isPinned: false,
        publishDate: new Date('2026-08-28'),
      },
    ]);
    console.log('✔ Notices seeded (2026 Aug-Sept)');

    // 9. Seed Downloads (2026 Aug-Sept)
    await Download.deleteMany({});
    await Download.insertMany([
      { title: 'Class XI Admission Application Form 2026-2027 (PDF)', category: 'Form', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isActive: true },
      { title: 'GDC Adilpur Prospectus & Student Guidelines 2026', category: 'Prospectus', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isActive: true },
      { title: 'College Code of Conduct & Fee Scheme 2026', category: 'Policy', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isActive: true },
      { title: 'ADP Registration & Examination Form 2026', category: 'Form', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isActive: true },
    ]);
    console.log('✔ Downloads seeded (2026 Aug-Sept)');

    // 10. Seed Success Stories
    await SuccessStory.deleteMany({});
    await SuccessStory.insertMany([
      { studentName: 'Zohaib Ahmed Pitafi', year: '2025', achievement: 'Secured Top Position in BISE Sukkur Pre-Engineering exams. Admitted to Mehran University (MUET).', photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80', storyText: 'GDC Adilpur provided me with dedicated guidance from expert faculty and practical science laboratory sessions.' },
    ]);
    console.log('✔ Success Stories seeded');

    // 11. Seed Gallery Items (2-3 images)
    await GalleryItem.deleteMany({});
    await GalleryItem.insertMany([
      { title: 'Main Campus Building & Academic Block', category: 'Campus', mediaUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', caption: 'Front view of Government Degree College Adilpur academic building.' },
      { title: 'Physics & Science Practical Laboratory', category: 'Campus', mediaUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80', caption: 'Students performing practical experiments under faculty supervision.' },
      { title: 'Annual Sports & Academic Ceremony', category: 'Events', mediaUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=800&q=80', caption: 'College sports and prize distribution event at GDC Adilpur grounds.' },
    ]);
    console.log('✔ Gallery items seeded');

    console.log('\n🎉 ALL GDC ADILPUR DATA & STAFF SEEDED SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
