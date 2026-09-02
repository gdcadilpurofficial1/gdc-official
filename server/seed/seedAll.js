import mongoose from 'mongoose';
import dotenv from 'dotenv';
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

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // 1. Seed Admin User
    const existingAdmin = await User.findOne({ role: 'Admin' });
    if (!existingAdmin) {
      await User.create({
        name: 'Principal Office',
        email: 'admin@gdcadilpur.edu.pk',
        passwordHash: 'Admin@123456',
        role: 'Admin',
      });
      console.log('✔ Admin user created: admin@gdcadilpur.edu.pk');
    }

    // 2. Seed College Profile
    await CollegeProfile.deleteMany({});
    await CollegeProfile.create({
      name: 'Government Degree College Adilpur',
      address: 'Adilpur Town, Taluka Mirpur Mathelo, District Ghotki, Sindh, Pakistan',
      phone: '+92 (0723) 680120',
      email: 'info@gdcadilpur.edu.pk',
      establishedYear: 2008,
      directorMessage: {
        name: 'Prof. Ghulam Rasool Kalwar',
        designation: 'Principal, GDC Adilpur',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        message: 'Welcome to Government Degree College Adilpur. Our institution is dedicated to nurturing academic brilliance, moral integrity, and leadership qualities in the youth of District Ghotki. We strive to empower students with modern knowledge in Science, Arts, and Computer Studies to prepare them for competitive higher education and professional careers.',
      },
      leadership: {
        ministerMessage: {
          title: 'Minister for Education',
          name: 'Syed Sardar Ali Shah',
          designation: 'Minister for Education & Literacy, Sindh',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
          message: 'Education is the cornerstone of progress in Sindh. Government Degree College Adilpur stands as a beacon of academic excellence in District Ghotki. We remain committed to providing state-of-the-art facilities, qualified faculty, and inclusive learning environments for our youth.',
        },
        secretaryMessage: {
          title: 'Secretary College Education',
          name: 'Sadaf Anees',
          designation: 'Secretary, College Education Department, Sindh',
          photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
          message: 'The College Education Department is continuously upgrading infrastructure and academic quality across degree colleges in Sindh. GDC Adilpur continues to demonstrate exemplary commitment towards student empowerment and digital integration.',
        },
        dcMessage: {
          title: 'Deputy Commissioner',
          name: 'Muhammad Usman Tanveer (PAS)',
          designation: 'Deputy Commissioner, District Ghotki',
          photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
          message: 'As the local administration, we take immense pride in supporting Government Degree College Adilpur. Youth education and civic engagement are key drivers of regional prosperity in Ghotki.',
        },
        principalMessage: {
          title: 'Principal / Director',
          name: 'Prof. Ghulam Rasool Kalwar',
          designation: 'Principal, GDC Adilpur',
          photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
          message: 'Welcome to Government Degree College Adilpur. Our institution is dedicated to nurturing academic brilliance, moral integrity, and leadership qualities in the youth of District Ghotki.',
        },
      },
      stats: {
        studentCount: 850,
        facultyCount: 38,
        departmentCount: 8,
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
      mission: 'To provide accessible, high-quality higher education in District Ghotki, empowering youth with scientific inquiry, moral values, and technical competence.',
      vision: 'To emerge as a leading center of educational excellence and research in upper Sindh.',
      history: 'Established in 2008 by the Government of Sindh, GDC Adilpur has grown into a premier public institution providing intermediate and undergraduate degree education to thousands of students across Mirpur Mathelo and Ghotki district.',
    });
    console.log('✔ College Profile seeded');

    // 3. Seed Hero Slides
    await HeroSlide.deleteMany({});
    await HeroSlide.insertMany([
      {
        title: 'Empowering Youth Through Quality Education',
        subtitle: 'Providing standardized higher education in Pre-Engineering, Pre-Medical, and Computer Science in District Ghotki.',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
        order: 1,
        isActive: true,
      },
      {
        title: 'Modern Science & Computer Laboratories',
        subtitle: 'Hands-on practical experiments guided by experienced faculty members.',
        imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
        order: 2,
        isActive: true,
      },
      {
        title: 'Admissions Open for Session 2024-2026',
        subtitle: 'Apply for XI (F.Sc / FA / ICS) and BS 4-Year Degree Programs under Sindh Education Department.',
        imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80',
        order: 3,
        isActive: true,
      },
    ]);
    console.log('✔ Hero Slides seeded');

    // 4. Seed Departments & Faculty
    await Department.deleteMany({});
    await Faculty.deleteMany({});

    const deptCs = await Department.create({ name: 'Computer Science', description: 'Department of Computer Science and Information Technology' });
    const deptBio = await Department.create({ name: 'Pre-Medical (Biology)', description: 'Department of Biological Sciences & Pre-Medical studies' });
    const deptPhy = await Department.create({ name: 'Physics & Engineering', description: 'Department of Physical Sciences & Pre-Engineering' });
    const deptChem = await Department.create({ name: 'Chemistry', description: 'Department of Chemical Sciences' });
    const deptEng = await Department.create({ name: 'English & Literature', description: 'Department of English Language & Literature' });

    await Faculty.insertMany([
      { name: 'Prof. Ghulam Rasool Kalwar', designation: 'Principal & Professor', departmentId: deptCs._id, qualification: 'M.Sc Computer Science (SALU)', email: 'principal@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', isActive: true },
      { name: 'Asst. Prof. Dr. Tariq Hussain Channa', designation: 'Assistant Professor', departmentId: deptBio._id, qualification: 'Ph.D. Zoology (University of Sindh)', email: 'tariq.channa@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80', isActive: true },
      { name: 'Prof. Abdul Majeed Indhar', designation: 'Associate Professor', departmentId: deptPhy._id, qualification: 'M.Sc Physics (SALU Khairpur)', email: 'majeed.indhar@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', isActive: true },
      { name: 'Lecturer Sajjad Ahmed Shah', designation: 'Lecturer in Chemistry', departmentId: deptChem._id, qualification: 'M.Sc Organic Chemistry (Quaid-e-Azam Univ)', email: 'sajjad.shah@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', isActive: true },
      { name: 'Lecturer Zulfiqar Ali Bozdar', designation: 'Lecturer in English', departmentId: deptEng._id, qualification: 'M.A. English Literature (SALU)', email: 'zulfiqar.bozdar@gdcadilpur.edu.pk', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', isActive: true },
    ]);
    console.log('✔ Departments & Faculty seeded');

    // 5. Seed Programs
    await Program.deleteMany({});
    await Program.insertMany([
      { name: 'F.Sc Pre-Medical', level: 'Intermediate', duration: '2 Years', eligibility: 'Matriculation (Science) with min 60% marks', subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Urdu', 'Islamiat/Pak Studies'], description: 'Comprehensive preparation for medical college entrance examinations (MDCAT).', isActive: true },
      { name: 'F.Sc Pre-Engineering', level: 'Intermediate', duration: '2 Years', eligibility: 'Matriculation (Science) with min 60% marks', subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Urdu', 'Islamiat/Pak Studies'], description: 'Focuses on analytical mathematics and physical science for engineering admissions (ECAT).', isActive: true },
      { name: 'ICS (Computer Science)', level: 'Intermediate', duration: '2 Years', eligibility: 'Matriculation with Science or Computer Studies', subjects: ['Computer Science', 'Physics', 'Mathematics', 'English', 'Urdu', 'Islamiat/Pak Studies'], description: 'Foundational computer science, programming fundamentals, and mathematics.', isActive: true },
      { name: 'BS Computer Science (BSCS)', level: 'Undergraduate', duration: '4 Years', eligibility: 'Intermediate (F.Sc / ICS) with min 50% marks', subjects: ['Data Structures', 'Database Systems', 'Software Engineering', 'Web Technologies', 'AI'], description: '4-Year degree program affiliated with Shah Abdul Latif University (SALU) Khairpur.', isActive: true },
    ]);
    console.log('✔ Programs seeded');

    // 6. Seed Admissions Info
    await AdmissionsInfo.deleteMany({});
    await AdmissionsInfo.create({
      eligibilityText: 'Candidates seeking admission to Intermediate (XI) must have passed Matriculation (SSC) from BISE Sukkur or any recognized Pakistani board. Minimum 50% marks required for Pre-Medical / Pre-Engineering.',
      howToApplyText: '1. Collect prospectus and admission form from college office.\n2. Submit filled form with attested marksheets, domicile, character certificate, and 4 photos.\n3. Merit lists are posted on college notice board.',
      importantDatesText: '• Application Start Date: August 1, 2024\n• Last Date for Submission: August 25, 2024\n• First Merit List Announcement: August 30, 2024\n• Classes Commencement: September 10, 2024',
      portalUrl: 'https://seccap.dgcs.gos.pk',
      documentsChecklist: ['Matriculation Marksheet & Pass Certificate', 'Character Certificate from last attended school', 'CNIC / B-Form copy', 'Father CNIC copy', '8 Passport-size photographs (blue background)', 'District Domicile & PRC Certificate'],
    });
    console.log('✔ Admissions Info seeded');

    // 7. Seed Fee Schemes
    await FeeScheme.deleteMany({});
    await FeeScheme.insertMany([
      { programName: 'F.Sc Pre-Medical / Pre-Engineering (XI & XII)', admissionFee: 500, tuitionFee: 1200, securityDeposit: 300, totalFee: 2000, breakdownText: 'Government regulated subsidized fee structure per annual session.', isActive: true },
      { programName: 'ICS Computer Science (XI & XII)', admissionFee: 500, tuitionFee: 1500, securityDeposit: 500, totalFee: 2500, breakdownText: 'Includes computer laboratory maintenance and practical session charges.', isActive: true },
      { programName: 'BS Computer Science (BSCS 4-Year)', admissionFee: 2000, tuitionFee: 4500, securityDeposit: 1500, totalFee: 8000, breakdownText: 'Per semester fee structure including University affiliation and exam fees.', isActive: true },
    ]);
    console.log('✔ Fee Schemes seeded');

    // 8. Seed Notices
    await Notice.deleteMany({});
    await Notice.insertMany([
      { title: 'Admissions Open for XI (F.Sc / ICS / FA) Session 2024-2025', category: 'Admission', body: 'Applications are invited for admission to Intermediate Part-I (Class XI). Prospectus and forms are available at the college admission desk.', isPinned: true, attachmentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', publishDate: new Date('2024-08-01') },
      { title: 'BISE Sukkur Intermediate XI & XII Annual Exam Date Sheet 2024', category: 'Examination', body: 'The Board of Intermediate & Secondary Education Sukkur has issued the final date sheet for Higher Secondary School Certificate (HSSC) Annual Exams.', isPinned: true, attachmentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', publishDate: new Date('2024-07-20') },
      { title: 'Distribution of Laptops under Sindh Student Support Scheme', category: 'General', body: 'Eligible merit position holders are requested to register their details at the Principal office for laptop distribution.', isPinned: false, publishDate: new Date('2024-07-10') },
      { title: 'Annual Science & IT Exhibition 2024', category: 'Academic', body: 'Students from Pre-Medical, Pre-Engineering, and Computer Science are invited to display innovative projects.', isPinned: false, publishDate: new Date('2024-06-15') },
    ]);
    console.log('✔ Notices seeded');

    // 9. Seed Downloads
    await Download.deleteMany({});
    await Download.insertMany([
      { title: 'Intermediate Admission Application Form 2024-25', category: 'Form', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isActive: true },
      { title: 'GDC Adilpur Prospectus & Student Code of Conduct', category: 'Prospectus', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isActive: true },
      { title: 'BISE Sukkur F.Sc Chemistry & Physics Model Papers & Policy', category: 'Policy', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isActive: true },
    ]);
    console.log('✔ Downloads seeded');

    // 10. Seed Success Stories
    await SuccessStory.deleteMany({});
    await SuccessStory.insertMany([
      { studentName: 'Zohaib Ahmed Pitafi', year: '2023', achievement: 'Secured Top Position in BISE Sukkur Pre-Engineering exams. Admitted to Mehran University of Engineering & Technology (MUET).', photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80', storyText: 'GDC Adilpur provided me with dedicated guidance from expert teachers and hands-on laboratory practice that laid the foundation for my success.' },
      { studentName: 'Ayesha Kalwar', year: '2022', achievement: 'Selected for MBBS at Chandka Medical College Larkana under District Ghotki merit quota.', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80', storyText: 'The rigorous Pre-Medical training and MDCAT preparation guidance at GDC Adilpur made my dream of becoming a doctor a reality.' },
    ]);
    console.log('✔ Success Stories seeded');

    // 11. Seed Gallery
    await GalleryItem.deleteMany({});
    await GalleryItem.insertMany([
      { title: 'Annual Prize Distribution Ceremony', category: 'Events', mediaUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80', caption: 'Principal presenting awards to top academic achievers of GDC Adilpur.' },
      { title: 'Computer Science Laboratory', category: 'Campus', mediaUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80', caption: 'Students engaged in practical programming and database lab sessions.' },
      { title: 'Inter-College Sports Tournament', category: 'Sports', mediaUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=800&q=80', caption: 'GDC Adilpur cricket team winning District Ghotki championship trophy.' },
    ]);
    console.log('✔ Gallery items seeded');

    console.log('\n🎉 ALL GDC ADILPUR DATA SEEDED SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
