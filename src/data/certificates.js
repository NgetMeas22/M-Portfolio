import bacIICertImage from '../assets/certificates/1.bmp';
import aceLearningImage from '../assets/certificates/7.jpg';
import cppCertImage from '../assets/certificates/3.bmp';
import webDevCertImage from '../assets/certificates/6.jpg';
import internshipCertImage from '../assets/certificates/4.jpg';
import phpLaravelCertImage from '../assets/certificates/5.jpg';
import officeCertImage from '../assets/certificates/2.bmp';
import ruppCertImage from '../assets/certificates/0.jpg';

export const certificates = [
  {
    id: 'rupp-cs-engineering',
    title: 'Computer Science and Engineering',
    titleKh: 'វិទ្យាសាស្ត្រកុំព្យូទ័រ និងវិស្វកម្ម',
    organization: 'Royal University of Phnom Penh',
    organizationKh: 'សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ',
    date: '2024-2025',
    credentialId: '0074/2026 RUPP',
    description: 'Undergraduate Academic Record (Year 1) with Cumulative GPA: 2.81.',
    descriptionKh: 'កំណត់ត្រាសិក្សាថ្នាក់បរិញ្ញាបត្រ (ឆ្នាំទី ១) ពិន្ទុមធ្យមភាគសរុប (CGPA)៖ ២.៨១។',
    image: ruppCertImage,
    category: 'Education'
  },
  {
    id: 'ace-gep-level-7b',
    title: 'General English Program (GEP 7B)',
    titleKh: 'កម្មវិធីភាសាអង់គ្លេសទូទៅ (GEP 7B)',
    organization: 'Australian Centre for Education (ACE)',
    organizationKh: 'មជ្ឈមណ្ឌលអូស្ត្រាលីសម្រាប់ការបណ្តុះបណ្តាល (ACE)',
    date: 'Term 4, 2026',
    credentialId: null,
    description: 'Advanced academic English, professional communication, and critical thinking.',
    descriptionKh: 'ភាសាអង់គ្លេសកម្រិតខ្ពស់ ការប្រាស្រ័យទាក់ទងវិជ្ជាជីវៈ និងការគិតបែបស៊ីជម្រៅ។',
    image: aceLearningImage,
    category: 'Language'
  },
  {
    id: 'java-spring-boot',
    title: 'Java Spring Boot Development',
    titleKh: 'ការអភិវឌ្ឍន៍ Java Spring Boot',
    organization: 'ETEC Center',
    organizationKh: 'មជ្ឈមណ្ឌលបណ្តុះបណ្តាល ETEC',
    date: '2025',
    credentialId: null,
    description: 'Enterprise REST APIs, Spring Security, Hibernate/JPA, and microservices.',
    descriptionKh: 'REST API សហគ្រាស, Spring Security, Hibernate/JPA និងស្ថាបត្យកម្ម microservices។',
    image: null,
    category: 'Backend'
  },
  {
    id: 'basic-advance-php-oop-mysql-laravel-project',
    title: 'PHP, OOP, MySQL & Laravel',
    titleKh: 'វគ្គសិក្សា PHP, OOP, MySQL & Laravel',
    organization: 'ETEC Center',
    organizationKh: 'មជ្ឈមណ្ឌលវិស្វកម្មបច្ចេកវិទ្យា និងអេឡិចត្រូនិក (ETEC)',
    date: 'July 15, 2026',
    credentialId: '2608255 ETEC',
    description: 'Object-Oriented PHP, MySQL database modeling, Laravel MVC, and project development.',
    descriptionKh: 'PHP OOP, ការរចនា MySQL Database, ស្ថាបត្យកម្ម Laravel MVC និងការអនុវត្តគម្រោង។',
    image: phpLaravelCertImage,
    category: 'Web Development'
  },
  {
    id: 'frontend-development-internship-kru-it-solution',
    title: 'Frontend Development Internship',
    titleKh: 'កម្មសិក្សាការងារផ្នែក Frontend Development',
    organization: 'KRU IT Solution & ETEC Center',
    organizationKh: 'KRU IT Solution សហការជាមួយ ETEC',
    date: 'July 15, 2026',
    credentialId: '0002026135',
    description: '10-week internship building responsive UI components and collaborating in Agile teams.',
    descriptionKh: 'កម្មសិក្សា ១០ សប្តាហ៍ អនុវត្តការងារលើ UI វេបសាយ និងសហការជាក្រុម Agile។',
    image: internshipCertImage,
    category: 'Web Development'
  },
  {
    id: 'html-css-bootstrap-javascript-reactjs-project',
    title: 'HTML, CSS, JS & React.js',
    titleKh: 'វគ្គសិក្សា HTML, CSS, JS & React.js',
    organization: 'ETEC Center',
    organizationKh: 'មជ្ឈមណ្ឌលវិស្វកម្មបច្ចេកវិទ្យា និងអេឡិចត្រូនិក (ETEC)',
    date: 'November 15, 2025',
    credentialId: '00017629ETEC',
    description: 'Modern frontend development with responsive layouts, JavaScript ES6+, and React components.',
    descriptionKh: 'អភិវឌ្ឍន៍ Frontend ជាមួយ Layout ឆ្លើយតបគ្រប់អេក្រង់, JavaScript ES6+ និង React Components។',
    image: webDevCertImage,
    category: 'Web Development'
  },
  {
    id: 'basic-advance-cpp-oop-algorithm-mysql-project',
    title: 'C++, OOP, Algorithms & MySQL',
    titleKh: 'វគ្គសិក្សា C++, OOP, Algorithms & MySQL',
    organization: 'ETEC Center',
    organizationKh: 'មជ្ឈមណ្ឌលវិស្វកម្មបច្ចេកវិទ្យា និងអេឡិចត្រូនិក (ETEC)',
    date: 'June 15, 2025',
    credentialId: '000117118ETEC',
    description: 'Computer science fundamentals, data structures, algorithms, and SQL database management.',
    descriptionKh: 'មូលដ្ឋានគ្រឹះវិទ្យាសាស្ត្រកុំព្យូទ័រ រចនាសម្ព័ន្ធទិន្នន័យ Algorithms និងការគ្រប់គ្រង SQL Database។',
    image: cppCertImage,
    category: 'Programming'
  },
  {
    id: 'microsoft-office-word-excel-powerpoint-nto',
    title: 'Microsoft Office Specialist',
    titleKh: 'វគ្គសិក្សា កុំព្យូទ័ររដ្ឋបាល (Office)',
    organization: 'The Noble Truth Organization (MoEYS)',
    organizationKh: 'អង្គការអរិយសច្ច (មន្ទីរអប់រំ យុវជន និងកីឡា)',
    date: 'January 02, 2025',
    credentialId: '010 TON',
    description: 'Administrative productivity in Microsoft Word, Excel, and PowerPoint (Grade: Good).',
    descriptionKh: 'ជំនាញកុំព្យូទ័ររដ្ឋបាល Microsoft Word, Excel និង PowerPoint (និទ្ទេស ល្អ)។',
    image: officeCertImage,
    category: 'Productivity'
  },
  {
    id: 'upper-secondary-education-diploma-bacii',
    title: 'High School Diploma (Bac II)',
    titleKh: 'សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប)',
    organization: 'Ministry of Education, Youth and Sport',
    organizationKh: 'ក្រសួងអប់រំ យុវជន និងកីឡា',
    date: 'November 02, 2024',
    credentialId: '070213019011121000007',
    description: 'National High School Examination graduate (Science Track).',
    descriptionKh: 'ប្រឡងជាប់សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប) ថ្នាក់វិទ្យាសាស្ត្រ។',
    image: bacIICertImage,
    category: 'Education'
  }
];