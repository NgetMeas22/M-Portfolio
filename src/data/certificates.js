import bacIICertImage from '../assets/certificates/1.bmp';
import aceLearningImage from '../assets/certificates/7.jpg';
import cppCertImage from '../assets/certificates/3.bmp';
import webDevCertImage from '../assets/certificates/6.jpg';
import internshipCertImage from '../assets/certificates/4.jpg';
import phpLaravelCertImage from '../assets/certificates/5.jpg';
import officeCertImage from '../assets/certificates/2.bmp';

export const certificates = [
    {
    id: 'ace-gep-level-7b',
    title: 'General English Program (GEP) - Level 7B',
    titleKh: 'កម្មវិធីភាសាអង់គ្លេសទូទៅ (GEP) - កម្រិត 7B',
    organization: 'Australian Centre for Education (ACE)',
    organizationKh: 'មជ្ឈមណ្ឌលអូស្ត្រាលីសម្រាប់ការបណ្តុះបណ្តាល (ACE)',
    date: 'Term 4, 2026',
    credentialId: null,
    description: 'Currently enrolled in the General English Program (GEP Level 7B) at ACE, focusing on advanced academic English, communication, critical thinking, and interactive coursework.',
    descriptionKh: 'កំពុងបន្តការសិក្សាក្នុងកម្មវិធីភាសាអង់គ្លេសទូទៅ (GEP Level 7B) នៅមជ្ឈមណ្ឌល ACE ដោយផ្តោតលើការពង្រឹងជំនាញភាសាអង់គ្លេសកម្រិតខ្ពស់ ការទំនាក់ទំនង និងការគិតបែបស៊ីជម្រៅ។',
    image: aceLearningImage,
    category: 'Language'
  },
    {
    id: 'java-spring-boot',
    title: 'Java Spring Boot Development',
    titleKh: 'ការអភិវឌ្ឍន៍ Java Spring Boot',
    organization: 'ETEC Center',
    organizationKh: 'មជ្ឈមណ្ឌលបណ្តុះបណ្តាល ETEC (ETEC Center)',
    date: '2025',
    credentialId: null,
    description: 'Enterprise REST APIs, Spring Security, Hibernate/JPA, and microservices architecture.',
    descriptionKh: 'REST API សម្រាប់សហគ្រាស Spring Security Hibernate/JPA និងស្ថាបត្យកម្ម microservices។',
    image: null,
    category: 'Backend'
  },
    {
    id: 'basic-advance-php-oop-mysql-laravel-project',
    title: 'Basic / Advance PHP / OOP / MySQL / Laravel & Project Courses',
    titleKh: 'វគ្គសិក្សា Basic / Advance PHP / OOP / MySQL / Laravel & Project',
    organization: 'Engineering of Technology and Electronic Center (ETEC Center)',
    organizationKh: 'មជ្ឈមណ្ឌលវិស្វកម្មបច្ចេកវិទ្យា និងអេឡិចត្រូនិក',
    date: 'July 15, 2026',
    credentialId: '2608255 ETEC',
    description: 'Comprehensive completion of I.T Training Courses covering Basic and Advance PHP, Object-Oriented Programming (OOP), MySQL database design, Laravel framework development, and practical projects.',
    descriptionKh: 'បានបញ្ចប់វគ្គបណ្តុះបណ្តាលព័ត៌មានវិទ្យា (I.T) ដោយជោគជ័យលើមុខវិជ្ជា Basic / Advance PHP, OOP, MySQL, Laravel Framework និងការអនុវត្តគម្រោង (Project)។',
    image: phpLaravelCertImage,
    category: 'Web Development'
  },
    {
    id: 'frontend-development-internship-kru-it-solution',
    title: 'Frontend Development Internship',
    titleKh: 'កម្មសិក្សាការងារផ្នែក Frontend Development',
    organization: 'KRU IT Solution & ETEC Center',
    organizationKh: 'KRU IT Solution សហការជាមួយ មជ្ឈមណ្ឌល ETEC',
    date: 'July 15, 2026',
    credentialId: '0002026135',
    description: 'Successfully completed an internship in Frontend Development at KRU IT Solution, demonstrating dedication, teamwork, and commitment to professional growth.',
    descriptionKh: 'បានបញ្ចប់កម្មសិក្សាការងារដោយជោគជ័យលើផ្នែក Frontend Development នៅក្រុមហ៊ុន KRU IT Solution ដោយបង្ហាញនូវការប្តេជ្ញាចិត្ត ការធ្វើការងារជាក្រុម និងការរីកចម្រើនប្រកបដោយវិជ្ជាជីវៈ។',
    image: internshipCertImage,
    category: 'Web Development'
  },
    {
    id: 'html-css-bootstrap-javascript-reactjs-project',
    title: 'HTML, CSS, Bootstrap, JavaScript, ReactJs & Project Courses',
    titleKh: 'វគ្គសិក្សា HTML, CSS, Bootstrap, JavaScript, ReactJs & Project',
    organization: 'Engineering of Technology and Electronic Center (ETEC Center)',
    organizationKh: 'មជ្ឈមណ្ឌលវិស្វកម្មបច្ចេកវិទ្យា និងអេឡិចត្រូនិក',
    date: 'November 15, 2025',
    credentialId: '00017629ETEC',
    description: 'Comprehensive completion of Computer Training Courses covering core frontend web technologies including HTML, CSS, Bootstrap responsive styling, JavaScript, ReactJs application development, and practical projects.',
    descriptionKh: 'បានបញ្ចប់វគ្គបណ្តុះបណ្តាលកុំព្យូទ័រដោយជោគជ័យលើមុខវិជ្ជា HTML, CSS, Bootstrap, JavaScript, ReactJs និងការអនុវត្តគម្រោង (Project)។',
    image: webDevCertImage,
    category: 'Web Development'
  },
  {
    id: 'basic-advance-cpp-oop-algorithm-mysql-project',
    title: 'Basic / Advance C++ / OOP / Algorithm / MySQL DB & Project Courses',
    titleKh: 'វគ្គសិក្សា Basic / Advance C++ / OOP / Algorithm / MySQL DB & Project',
    organization: 'Engineering of Technology and Electronic Center (ETEC Center)',
    organizationKh: 'មជ្ឈមណ្ឌលវិស្វកម្មបច្ចេកវិទ្យា និងអេឡិចត្រូនិក',
    date: 'June 15, 2025',
    credentialId: '000117118ETEC',
    description: 'Comprehensive completion of Computer Training Courses covering Basic and Advance C++, Object-Oriented Programming (OOP), Algorithms, MySQL Database management, and practical project development.',
    descriptionKh: 'បានបញ្ចប់វគ្គបណ្តុះបណ្តាលកុំព្យូទ័រដោយជោគជ័យលើមុខវិជ្ជា Basic / Advance C++, OOP, Algorithm, MySQL DB និងការអនុវត្តគម្រោង (Project)។',
    image: cppCertImage,
    category: 'Programming'
  },
  
  {
    id: 'microsoft-office-word-excel-powerpoint-nto',
    title: 'Microsoft Word, Excel, PowerPoint Course',
    titleKh: 'វគ្គសិក្សា កុំព្យូទ័ររដ្ឋបាល (Microsoft Word, Excel, PowerPoint)',
    organization: 'The Noble Truth Organization (MoEYS)',
    organizationKh: 'អង្គការអរិយសច្ច (មន្ទីរអប់រំ យុវជន និងកីឡា រាជធានីភ្នំពេញ)',
    date: 'January 02, 2025',
    credentialId: '010 TON',
    description: 'Successfully completed computer training covering Microsoft Word, Excel, and PowerPoint with the grade of Good, certified by The Noble Truth Organization and Phnom Penh Municipal Service of Education, Youth and Sport.',
    descriptionKh: 'បានបញ្ចប់វគ្គបណ្តុះបណ្តាលកុំព្យូទ័ររដ្ឋបាលដោយជោគជ័យលើមុខវិជ្ជា Microsoft Word, Excel, PowerPoint ដោយទទួលបាននិទ្ទេស ល្អ (Good) ចេញដោយអង្គការអរិយសច្ច និងទទួលស្គាល់ដោយមន្ទីរអប់រំ យុវជន និងកីឡា រាជធានីភ្នំពេញ។',
    image: officeCertImage,
    category: 'Productivity'
  },
  {
    id: 'upper-secondary-education-diploma-bacii',
    title: 'Upper Secondary Education Diploma (Bac II)',
    titleKh: 'វិញ្ញាបនបត្របណ្តោះអាសន្នមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប)',
    organization: 'Ministry of Education, Youth and Sport (MoEYS)',
    organizationKh: 'ក្រសួងអប់រំ យុវជន និងកីឡា',
    date: 'November 02, 2024',
    credentialId: '070213019011121000007',
    description: 'Successfully passed the National High School Examination (Bac II) - Science Track, issued by the Department of Examination, Ministry of Education, Youth and Sport.',
    descriptionKh: 'បានប្រឡងជាប់សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប) ថ្នាក់វិទ្យាសាស្ត្រ សម័យប្រឡង ០៨ តុលា ២០២៤ នៅមណ្ឌលប្រឡង អ.វ. សហស អង្គរជ័យ ទទួលបាននិទ្ទេសរួម D (ពិន្ទុសរុប: 61.879)។',
    image: bacIICertImage,
    category: 'Education'
  }


];