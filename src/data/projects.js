// src/data/projects.js

export const projects = [
  // ================================================================
  // កម្រិតទី ១៖ ENTERPRISE & CONTAINERIZATION (JAVA & SPRING BOOT)
  // ================================================================

  // // 1. SPRING BOOT ENTERPRISE SERVICES
  // {
  //   id: 'spring-boot-api',
  //   slug: 'spring-boot-api',
  //   title: 'Spring Boot Enterprise Services',
  //   description: 'RESTful enterprise backend architecture engineered with Java and Spring Boot, featuring automated dependency injection, secure JWT authentication, and relational data persistence.',
  //   descriptionKh: 'ប្រព័ន្ធ Backend អាជីវកម្មបែប RESTful បង្កើតឡើងដោយ Java និង Spring Boot ដោយមានប្រព័ន្ធ JWT Authentication និង Relational Database។',
  //   problem: 'Enterprise microservices require scalable endpoints, strict contract verification, and hardened role-based authorization for multi-tenant data access.',
  //   problemKh: 'ប្រព័ន្ធ Microservices ត្រូវការ Endpoint ដែលអាចពង្រីកបាន និងប្រព័ន្ធសុវត្ថិភាពច្បាស់លាស់សម្រាប់ការពារទិន្នន័យ។',
  //   solution: 'Engineered a container-ready Spring Boot backend incorporating Spring Security, Hibernate ORM, and automated MySQL schema migrations.',
  //   solutionKh: 'បានបង្កើតប្រព័ន្ធ Backend ជាមួយ Spring Boot ដោយប្រើ Spring Security, Hibernate ORM និងការគ្រប់គ្រង MySQL Schema ដោយស្វ័យប្រវត្តិ។',
  //   features: [
  //     'Microservice architecture setup with Spring Boot',
  //     'Data JPA repository abstraction layer',
  //     'JWT role-based authentication and authorization',
  //     'MySQL schema migrations and query indexing'
  //   ],
  //   featuresKh: [
  //     'រចនាសម្ព័ន្ធ Microservice ជាមួយ Spring Boot',
  //     'Data JPA repository abstraction layer',
  //     'ប្រព័ន្ធ JWT role-based authentication',
  //     'ការគ្រប់គ្រង Database MySQL schema migrations'
  //   ],
  //   technologies: ['Spring Boot', 'Java', 'MySQL', 'Maven', 'REST API'],
  //   github: 'https://github.com/NgetMeas22',
  //   live: null,
  //   category: ['Spring Boot', 'Java', 'Backend'],
  //   isTeamProject: false,
  //   featured: true,
  //   year: '2026'
  // },

  // 2. CINEMA MANAGEMENT SYSTEM (TEAM PROJECT)
  {
    id: 'cinema-management-system',
    slug: 'cinema-management-system',
    title: 'Cinema Management System',
    description: 'Collaborative team platform engineering a comprehensive cinema booking and screening control system built with React TypeScript, Java Spring Boot, MySQL, and Docker.',
    descriptionKh: 'ប្រព័ន្ធគ្រប់គ្រងរោងភាពយន្តសាងសង់ជាក្រុមជាមួយ React TypeScript, Java Spring Boot, MySQL, និង Docker។',
    problem: 'Cinemas need a resilient system to orchestrate showtimes, enforce synchronized ticket reservations, and manage theater operations without race conditions.',
    problemKh: 'រោងភាពយន្តត្រូវការប្រព័ន្ធទំនើបដើម្បីគ្រប់គ្រងភាពយន្ត ម៉ោងសម្ដែង ការកក់សំបុត្រ និងប្រតិបត្តិការមហោស្រព។',
    solution: 'Built a containerized microservices-inspired architecture using Docker, with a typed React frontend and robust Spring Boot REST core.',
    solutionKh: 'បានបង្កើតកម្មវិធី Docker containerized ជាមួយ TypeScript frontend និង Spring Boot backend សម្រាប់ដោះស្រាយការកក់កៅអីភ្លាមៗ។',
    features: [
      'Real-time seat reservation grid and booking locks',
      'Movie schedule, cinema hall, and showtime administration',
      'Customer ticketing and PDF receipt generation',
      'Docker containerization and role-based staff portals'
    ],
    featuresKh: [
      'ការកក់កៅអី និងចាក់សោរកៅអីភ្លាមៗ',
      'ការគ្រប់គ្រងកាលវិភាគបញ្ចាំង និងបន្ទប់បញ្ចាំង',
      'ការចេញសំបុត្រ និងវិក្កយបត្រ PDF សម្រាប់អតិថិជន',
      'Docker containerization និងសហការក្រុម'
    ],
    technologies: ['React TypeScript', 'Java', 'Spring Boot', 'MySQL', 'Docker'],
    github: 'https://github.com/NgetMeas22',
    live: null,
    category: ['React TS','Java Spring Boot', 'MySQL', 'Team Project'],
    isTeamProject: true,
    featured: true,
    year: '2026'
  },

  // ========================================================
  // កម្រិតទី ២៖ DECOUPLED FULL STACK (VUE/REACT + LARAVEL API)
  // ========================================================
  // 4. CLINIC MANAGEMENT SYSTEM
  {
    id: 'clinic-management-system',
    slug: 'clinic-management-system',
    title: 'Clinic Management System',
    description: 'A full-stack clinic management system with React frontend and Laravel REST API backend.',
    descriptionKh: 'ប្រព័ន្ធគ្រប់គ្រងគ្លីនិកពេញលេញជាមួយ React frontend និង Laravel REST API backend។',
    problem: 'Clinics need an efficient system to manage patient records, appointments, and medical data digitally.',
    problemKh: 'គ្លីនិកត្រូវការប្រព័ន្ធមានប្រសិទ្ធភាពដើម្បីគ្រប់គ្រងកំណត់ត្រាអ្នកជំងឺ ការណាត់ជួប និងទិន្នន័យវេជ្ជសាស្រ្តឌីជីថល។',
    solution: 'Developed a decoupled architecture with React for the frontend and Laravel for the REST API, using MySQL for data persistence.',
    solutionKh: 'បានអភិវឌ្ឍស្ថាបត្យកម្មដាច់ដោយឡែកជាមួយ React សម្រាប់ frontend និង Laravel សម្រាប់ REST API ដោយប្រើ MySQL សម្រាប់រក្សាទុកទិន្នន័យ។',
    features: [
      'Patient electronic registration records',
      'Doctor appointment calendar scheduling',
      'Secured REST API communication',
      'Decoupled client/server architecture'
    ],
    featuresKh: [
      'គ្រប់គ្រងអ្នកជំងឺ',
      'ការណាត់ជួប',
      'REST API',
      'ស្ថាបត្យកម្មដាច់ដោយឡែក'
    ],
    technologies: ['React', 'Laravel', 'PHP', 'MySQL', 'REST API'],
    github: 'https://github.com/NgetMeas22/Clinic-Management-System',
    live: null,
    category: ['React', 'Laravel', 'PHP', 'MySQL', 'Full Stack'],
    isTeamProject: false,
    featured: true,
    year: '2026'
  },
  
  // ==========================================
  // កម្រិតទី ៣៖ MODERN SPA (REACT & VITE)
  // ==========================================

  // 5. DEVELOPER TERMINAL PORTFOLIO
  {
    id: 'portfolio-dark',
    slug: 'portfolio-dark',
    title: 'Personal Portfolio II',
    description: 'Personal cyber-terminal styled developer portfolio engineered with React and Tailwind CSS, featuring telemetry stats, bilingual support, and dark theme toggles.',
    descriptionKh: 'គេហទំព័រ Portfolio ផ្ទាល់ខ្លួន បង្កើតឡើងដោយ React និង Tailwind CSS ជាមួយមុខងារប្តូរភាសា និង Theme។',
    problem: 'Developers need a differentiated personal showcase that clearly presents both single and collaborative repositories with filtering capabilities.',
    problemKh: 'ត្រូវការគេហទំព័រផ្ទាល់ខ្លួនដែលមានរបៀបរៀបរយច្បាស់លាស់ អាចស្វែងរក និងច្រោះគម្រោងតាមបច្ចេកវិទ្យាបានរហ័ស។',
    solution: 'Created an audit-themed portfolio application utilizing React hooks, Lucide vectors, and dynamic slug telemetry routing.',
    solutionKh: 'បានបង្កើតគេហទំព័ររចនាបែប Cyber Terminal ជាមួយ Dark/Light Theme និងប្រព័ន្ធគ្រប់គ្រងទិន្នន័យច្បាស់លាស់។',
    features: [
      'Bilingual content switching (English & Khmer)',
      'Cyber-green terminal aesthetic with light/dark toggles',
      'Fluid project filters and instant search indexing',
      'Single-target telemetry audit detail pages'
    ],
    featuresKh: [
      'មុខងារប្តូរពីរភាសា (អង់គ្លេស និង ខ្មែរ)',
      'ការរចនាបែប Cyber Terminal ជាមួយ Dark/Light Theme',
      'ប្រព័ន្ធ Filter និង Search គម្រោងបានរហ័ស',
      'ទំព័របង្ហាញព័ត៌មានលម្អិតនៃគម្រោងនីមួយៗ'
    ],
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    github: 'https://github.com/NgetMeas22',
    live: 'm-portfolio-nine-mu.vercel.app',
    category: ['React', 'Frontend'],
    isTeamProject: false,
    featured: true,
    year: '2026'
  },

  
  // ===================================================
  // កម្រិតទី ៤៖ SERVER-SIDE & FULL STACK (PHP & MYSQL)
  // ===================================================

  // 7. EMPLOYEE MANAGEMENT SYSTEM
  {
    id: 'employee-management-system',
    slug: 'employee-management-system',
    title: 'Employee Management System',
    description: 'Software that manages employee records, tracks attendance and leave, handles payroll, and monitors work performance.',
    descriptionKh: 'កម្មវិធីដែលគ្រប់គ្រងកំណត់ត្រាបុគ្គលិក តាមដានវត្តមាន និងច្បាប់ឈប់សម្រាក គ្រប់គ្រងប្រាក់ខែ និងតាមដានសម្តែងការងារ។',
    problem: 'Organizations need a systematic way to manage employee data, attendance, and performance.',
    problemKh: 'ស្ថាប័នត្រូវការរបៀបប្រព័ន្ធដើម្បីគ្រប់គ្រងទិន្នន័យបុគ្គលិក វត្តមាន និងសម្តែង។',
    solution: 'Developed a PHP-based employee management system with CRUD operations, attendance tracking, and payroll management.',
    solutionKh: 'បានអភិវឌ្ឍប្រព័ន្ធគ្រប់គ្រងបុគ្គលិកដែលមានមូលដ្ឋាន PHP ជាមួយប្រតិបត្តិការ CRUD ការតាមដានវត្តមាន និងការគ្រប់គ្រងប្រាក់ខែ។',
    features: [
      'Employee records directory and roles',
      'Attendance tracking and check-in audits',
      'Leave request approvals flow',
      'Automated payroll ledger calculations'
    ],
    featuresKh: [
      'កំណត់ត្រាបុគ្គលិក',
      'ការតាមដានវត្តមាន',
      'ការគ្រប់គ្រងច្បាប់ឈប់សម្រាក',
      'ប្រព័ន្ធប្រាក់ខែ'
    ],
    technologies: ['PHP', 'MySQL', 'TailwindCSS', 'JavaScript'],
    github: 'https://github.com/NgetMeas22/Employee-Management-SYS',
    live: 'https://genzsys.infinityfreeapp.com',
    category: ['PHP', 'MySQL', 'Full Stack'],
    isTeamProject: false,
    featured: false,
    year: '2026'
  },

  // 8. DAILY PLANNER
  {
    id: 'daily-planner',
    slug: 'daily-planner',
    title: 'Daily Planner',
    description: 'Personal dashboard for tracking finances, academic subjects, and daily goals.',
    descriptionKh: 'ផ្ទាំងគ្រប់គ្រងផ្ទាល់ខ្លួនសម្រាប់តាមដានហិរញ្ញវត្ថុ មុខវិជ្ជារៀន និងគោលបំណងប្រចាំថ្ងៃ។',
    problem: 'Managing daily tasks, finances, and academic progress required a centralized dashboard to keep everything organized.',
    problemKh: 'ការគ្រប់គ្រងកិច្ចការប្រចាំថ្ងៃ ហិរញ្ញវត្ថុ និងវឌ្ឍនភាពសិក្សាត្រូវការផ្ទាំងគ្រប់គ្រងកណ្តាលដើម្បីរក្សារឿងទាំងអស់ឱ្យមានរបៀប។',
    solution: 'Built a full-stack PHP + MySQL application with a clean dashboard interface for managing personal data.',
    solutionKh: 'បានបង្កើតកម្មវិធី PHP + MySQL ពេញលេញជាមួយចំណុចប្រទាក់ dashboard ស្អាតសម្រាប់គ្រប់គ្រងទិន្នន័យផ្ទាល់ខ្លួន។',
    features: [
      'Financial tracking and balance calculations',
      'Academic subject scheduling and homework logs',
      'Daily goal checkoffs and habit streaks',
      'Responsive multi-device layout'
    ],
    featuresKh: [
      'តាមដានហិរញ្ញវត្ថុ',
      'គ្រប់គ្រងមុខវិជ្ជារៀន',
      'កំណត់គោលបំណងប្រចាំថ្ងៃ',
      'Dashboard ឆ្លើយតប'
    ],
    technologies: ['PHP', 'MySQL', 'TailwindCSS', 'JavaScript'],
    github: 'https://github.com/NgetMeas22/Daily-Planner',
    live: 'https://dailyplanner.infinityfreeapp.com',
    category: ['PHP', 'MySQL', 'Full Stack'],
    isTeamProject: false,
    featured: true,
    year: '2026'
  },
  // 3. G2-2-SUN MPOS (TEAM PROJECT)
  {
    id: 'g2-2-sun-mpos',
    slug: 'g2-2-sun-mpos',
    title: 'G2-2-Sun MPOS',
    description: 'Modern Point of Sale (POS) and inventory control solution built as a collaborative team application using Vue.js, Tailwind CSS, Laravel API, and MySQL.',
    descriptionKh: 'ប្រព័ន្ធចំណុចលក់ (POS) ទំនើបសាងសង់ជាក្រុមជាមួយ Vue.js, Tailwind CSS, Laravel backend, និង REST API។',
    problem: 'Retail operations require low-latency checkout processing, barcode compatibility, multi-location stock tracking, and shift balancing.',
    problemKh: 'អាជីវកម្មត្រូវការប្រព័ន្ធម៉ាស៊ីនគិតប្រាក់លឿន និងអាចទុកចិត្តបានដើម្បីដោះស្រាយប្រតិបត្តិការ និងសារពើភ័ណ្ឌ។',
    solution: 'Constructed an MPOS platform pairing a reactive Vue.js client with an optimized Laravel API database backend.',
    solutionKh: 'បានអភិវឌ្ឍប្រព័ន្ធពេញលេញ POS ជាមួយ Vue.js + Tailwind CSS frontend ដែលភ្ជាប់ទៅ Laravel API backend ជាមួយ MySQL database។',
    features: [
      'Fast barcode-friendly checkout flow and receipt generation',
      'Live multi-warehouse inventory auditing and threshold alerts',
      'Daily/Monthly financial analytics and telemetry metrics',
      'Shift tracking and multi-cashier authorization'
    ],
    featuresKh: [
      'ប្រព័ន្ធគិតលុយរហ័ស និងការបោះពុម្ពវិក្កយបត្រ',
      'ការតាមដានស្តុកទំនិញច្រើនសាខា',
      'របាយការណ៍ហិរញ្ញវត្ថុប្រចាំថ្ងៃ និងខែ',
      'ការគ្រប់គ្រងវេន និងអ្នកគិតលុយច្រើននាក់'
    ],
    technologies: ['Vue.js', 'Tailwind CSS', 'Laravel', 'PHP', 'MySQL', 'REST API'],
    github: 'https://github.com/NgetMeas22',
    live: 'https://g2-2-sun-mpos-front.vercel.app',
    category: ['Vue', 'Laravel', 'PHP', 'MySQL', 'Team Project', 'Team Project'],
    isTeamProject: true,
    featured: true,
    year: '2026'
  },


// 9. MEXAS RESTAURANT
  {
    id: 'mexas-restaurant',
    slug: 'mexas-restaurant',
    title: 'MeXas Restaurant',
    description: 'Dynamic restaurant menu, table reservation, and order logging application powered by pure PHP and MySQL backend architecture.',
    descriptionKh: 'គេហទំព័រភោជនីយដ្ឋាន MeXas ជាមួយប្រព័ន្ធកក់តុ និងបញ្ជាទិញម្ហូប បង្កើតឡើងដោយប្រើប្រាស់ PHP និង MySQL។',
    problem: 'Restaurants require an automated way to process dining reservations, adjust menu pricing dynamically, and reduce wait times.',
    problemKh: 'ភោជនីយដ្ឋានត្រូវការវត្តមានឌីជីថលដើម្បីគ្រប់គ្រងម៉ឺនុយ ការកក់តុ និងការបញ្ជាទិញរបស់អតិថិជន។',
    solution: 'Engineered a modular PHP application with relational MySQL tables, parameterized security queries, and responsive customer booking portals.',
    solutionKh: 'បានបង្កើតកម្មវិធី web ភោជនីយដ្ឋានជាមួយការបង្ហាញម៉ឺនុយ ការគ្រប់គ្រងការកក់តុ និងសុវត្ថិភាពទិន្នន័យខ្ពស់ជាមួយ SQL Parameter Binding។',
    features: [
      'Dynamic table reservations and dining party validation',
      'Menu item categorization with variable pricing models',
      'Customer order intake and kitchen ticket flow',
      'Parameterized SQL queries for zero SQL injection vulnerabilities'
    ],
    featuresKh: [
      'ការកក់តុ និងការបញ្ជាក់ចំនួនភ្ញៀវ',
      'ការរៀបចំប្រភេទម្ហូប និងតម្លៃ dynamically',
      'ការទទួលការបញ្ជាទិញម្ហូប',
      'សុវត្ថិភាពទិន្នន័យខ្ពស់ជាមួយ SQL Parameter Binding'
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
    github: 'https://github.com/NgetMeas22/MeXas-Restaurant',
    live: null,
    category: ['PHP', 'MySQL'],
    isTeamProject: false,
    featured: false,
    year: '2025'
  },

// 14. PERSONAL PORTFOLIO
  {
    id: 'personal-portfolio',
    slug: 'personal-portfolio',
    title: 'Personal Portfolio I',
    description: 'Modern, high-performance personal developer portfolio website built with React and Vite featuring responsive UI and interactive showcase components.',
    descriptionKh: 'គេហទំព័រផលប័ត្រផ្ទាល់ខ្លួន (Portfolio) ទំនើប និងមានល្បឿនលឿន បង្កើតឡើងដោយ React និង Vite ជាមួយការរចនាទាក់ទាញ និងឆ្លើយតបគ្រប់ឧបករណ៍។',
    problem: 'Developers need an engaging, fast-loading, and responsive platform to present their skills, technical certifications, and featured project repositories.',
    problemKh: 'អ្នកអភិវឌ្ឍន៍ត្រូវការគេហទំព័រផ្ទាល់ខ្លួនមួយដែលមានល្បឿនលឿន និងទាក់ទាញ ដើម្បីបង្ហាញពីសមត្ថភាព វិញ្ញាបនបត្រ និងគម្រោងស្នាដៃផ្សេងៗ។',
    solution: 'Engineered a clean, component-driven frontend architecture leveraging Vite for blazing-fast bundling and seamless performance.',
    solutionKh: 'បានបង្កើតគេហទំព័រផ្អែកលើ Component ដោយប្រើប្រាស់ Vite ជួយឱ្យការដំណើរការទំព័រ និងការបើកមើលគម្រោងមានភាពរលូនបំផុត។',
    features: [
      'Component-based architecture powered by React & Vite',
      'Fully responsive UI layout optimized for all device screens',
      'Interactive project showcase and certificate viewer',
      'Direct social connections, deployment tracking, and contact integration'
    ],
    featuresKh: [
      'ស្ថាបត្យកម្មផ្អែកលើ Component បង្កើតដោយ React & Vite',
      'ទម្រង់ Layout ឆ្លើយតបយ៉ាងពេញលេញលើគ្រប់ទំហំអេក្រង់',
      'ផ្ទាំងបង្ហាញគម្រោង និងការពិនិត្យមើលវិញ្ញាបនបត្រអន្តរកម្ម',
      'ការភ្ជាប់បណ្តាញសង្គម និងទម្រង់សម្រាប់ទំនាក់ទំនង'
    ],
    technologies: ['React', 'Vite', 'JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/NgetMeas22/portfolio',
    live: 'https://portfolio-eight-kappa-69.vercel.app',
    category: ['Frontend'],
    isTeamProject: false,
    featured: true,
    year: '2025'
  },
  // 6. CAFE GOLDEN
  {
    id: 'cafe-golden',
    slug: 'cafe-golden',
    title: 'Cafe Golden',
    description: 'Modern coffee lounge and bakery web storefront crafted in React and Vite with fluid catalog navigation, state-driven ordering, and responsive styling.',
    descriptionKh: 'គេហទំព័របង្ហាញម៉ឺនុយហាងកាហ្វេ និងនំប៉័ងបែបទំនើប បង្កើតឡើងជាមួយ React និង Vite។',
    problem: 'Traditional paper menus lack customer engagement and do not allow patrons to calculate order costs before approaching counters.',
    problemKh: 'កាហ្វេត្រូវការប្រព័ន្ធម៉ឺនុយឌីជីថលដើម្បីបង្ហាញផលិតផល និងដោះស្រាយការបញ្ជាអតិថិជនប្រកបដោយប្រសិទ្ធភាព។',
    solution: 'Developed an interactive SPA powered by Vite and React hooks that provides instant item filtering and shopping cart computation.',
    solutionKh: 'បានបង្កើតកម្មវិធី React + Vite ជាមួយម៉ឺនុយឌីជីថល ប្រព័ន្ធកន្ត្រកទំនិញ និងការរចនា UI ឆ្លើយតបយ៉ាងរលូន។',
    features: [
      'Blazing fast route rendering powered by Vite build tooling',
      'Interactive beverage and bakery catalog browser',
      'Client-side cart calculation with local cache persistence',
      'Mobile-optimized touch layout'
    ],
    featuresKh: [
      'ល្បឿនលឿនជាមួយ Vite build core',
      'ការជ្រើសរើសម៉ឺនុយភេសជ្ជៈយ៉ាងរលូន',
      'ការគិតប្រាក់ក្នុង Cart ដោយប្រើ Local Storage',
      'បង្ហាញបានយ៉ាងស្អាតលើគ្រប់ទូរស័ព្ទ និងកុំព្យូទ័រ'
    ],
    technologies: ['React', 'Vite', 'JavaScript', 'Tailwind CSS'],
    github: 'https://github.com/NgetMeas22/Cafe-Golden',
    live: 'https://cafe-golden.vercel.app',
    category: ['React', 'Frontend'],
    isTeamProject: false,
    featured: false,
    year: '2025'
  },
  // 13. CAR DEALERSHIP
  {
    id: 'car-dealership',
    slug: 'car-dealership',
    title: 'Car Dealership',
    description: 'High-performance automotive showroom web portal built purely with semantic HTML5 structures and custom CSS3 responsive layouts.',
    descriptionKh: 'គេហទំព័របង្ហាញរថយន្ត និងសេវាកម្មទិញលក់រថយន្ត បង្កើតឡើងដោយ HTML5 និង CSS3 សុទ្ធ។',
    problem: 'Vehicle showrooms require high-speed asset delivery without client-side script overhead to ensure optimal initial page load speeds.',
    problemKh: 'អ្នកលក់រថយន្តត្រូវការវេទិកាតាមអ៊ីនធឺណិតដើម្បីបង្ហាញសារពើភ័ណ្ឌរថយន្តរបស់ពួកគេជាមួយល្បឿនផ្ទុករហ័ស។',
    solution: 'Designed a lightweight frontend interface using flexbox, CSS grid, and optimized static asset packaging.',
    solutionKh: 'បានបង្កើតវេទិកាអ្នកលក់រថយន្តឆ្លើយតបជាមួយ CSS Grid និង Flexbox ដោយគ្មាន Framework ធ្ងន់ៗ។',
    features: [
      'Pure CSS layout grid and responsive vehicle cards',
      'Zero dependency footprint for near-instant rendering',
      'Vehicle specification comparison panels',
      'Direct contact request and appraisal booking forms'
    ],
    featuresKh: [
      'រៀបចំ Layout ដោយ CSS Grid និង Flexbox សុទ្ធ',
      'ល្បឿនដំណើរការរហ័ស គ្មាន Framework ធ្ងន់ៗ',
      'ផ្ទាំងបង្ហាញលក្ខណៈបច្ចេកទេសរថយន្ត',
      'ទម្រង់ទំនាក់ទំនងសម្រាប់សាកសួរតម្លៃ'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/NgetMeas22/Car-Dealership',
    live: 'https://car-dealership-five-snowy.vercel.app',
    category: ['Frontend'],
    isTeamProject: false,
    featured: false,
    year: '2025'
  },


  // 14. ACCESSORIES SHOP
  {
    id: 'accessories-shop',
    slug: 'accessories-shop',
    title: 'Accessories Shop',
    description: 'Clean e-commerce product catalog designed strictly with semantic HTML (56.1%) and structured custom CSS (43.9%) for zero-dependency payload efficiency.',
    descriptionKh: 'ហាងលក់គ្រឿងបន្លាស់ និងសម្ភារៈអេឡិចត្រូនិក បង្កើតឡើងដោយប្រើប្រាស់ HTML (56.1%) និង CSS (43.9%) សុទ្ធ។',
    problem: 'Online product galleries frequently suffer from excessive client dependencies and slow mobile network performance.',
    problemKh: 'វិបសាយលក់ទំនិញភាគច្រើនប្រើប្រាស់ Library ច្រើនហួសហេតុ ធ្វើឱ្យមានភាពយឺតយ៉ាវលើទូរស័ព្ទដៃ។',
    solution: 'Engineered an ultra-lean storefront employing strict markup semantic hierarchies and custom CSS visual hover transformations.',
    solutionKh: 'បានរៀបចំរចនាសម្ព័ន្ធកូដកម្រិតស្រាលដោយប្រើ HTML 56.1% និង CSS 43.9% ដើម្បីធានាល្បឿនលឿនបំផុត។',
    features: [
      'Measured balance: 56.1% HTML semantic structure / 43.9% CSS styling',
      'Responsive product gallery cards with zoom hover states',
      'Zero dependency runtime footprint for immediate paint times',
      'Category badges and price highlight markers'
    ],
    featuresKh: [
      'រចនាសម្ព័ន្ធ HTML 56.1% និង CSS 43.9%',
      'ផ្ទាំងបង្ហាញទំនិញទំនើបមាន Hover Animation',
      'ដំណើរការលឿនបំផុតដោយមិនប្រើប្រាស់ Library ខាងក្រៅ',
      'ការបែងចែកប្រភេទផលិតផល និងស្លាកតម្លៃច្បាស់លាស់'
    ],
    technologies: ['HTML5', 'CSS3'],
    github: 'https://github.com/NgetMeas22',
    live: 'https://accessories-shop-two.vercel.app',
    category: ['Frontend'],
    isTeamProject: false,
    featured: false,
    year: '2025'
  },
  // 11. GENZ SHOP E-COMMERCE
  {
    id: 'genz-shop',
    slug: 'genz-shop',
    title: 'GenZ Shop E-commerce',
    description: 'An e-commerce web application designed for young consumers featuring vibrant aesthetics and reactive shopping cart modules.',
    descriptionKh: 'កម្មវិធី web ពាណិជ្ជកម្មអេឡិចត្រូនិចដែលរចនាសម្រាប់ទស្សនិកជន Gen Z។',
    problem: 'Creating an e-commerce platform tailored for youth audiences with an engaging and straightforward shopping flow.',
    problemKh: 'បង្កើតវេទិកាពាណិជ្ជកម្មអេឡិចត្រូនិចដែលងាយស្រួលសម្រាប់អ្នកប្រើប្រាស់វ័យក្មេងជាមួយ UI/UX ទំនើប។',
    solution: 'Built an e-commerce frontend with instant product listing, search filters, and local checkout calculation.',
    solutionKh: 'បានបង្កើត frontend ពាណិជ្ជកម្មអេឡិចត្រូនិចទំនើបជាមួយបញ្ជីផលិតផល មុខងាររទេះទិញទំនិញ និងការរចនាឆ្លើយតប។',
    features: [
      'Dynamic product listing showcase',
      'Interactive client-side shopping cart',
      'Full viewport responsive design',
      'Vibrant Gen-Z styling and palette'
    ],
    featuresKh: [
      'បញ្ជីផលិតផល',
      'រទេះទិញទំនិញ',
      'ការរចនាឆ្លើយតប',
      'UI/UX ទំនើប'
    ],
    technologies: ['HTML5', 'CSS', 'JavaScript'],
    github: 'https://github.com/NgetMeas22/GenZ_Shop_E-commerce',
    live: 'https://genz-shop-psi.vercel.app',
    category: ['Frontend'],
    isTeamProject: false,
    featured: false,
    year: '2026'
  },

  


  // ==========================================
  // កម្រិតទី ៦៖ STATIC FRONTEND (HTML5 & CSS3)
  // ==========================================

  // 12. PRESSMART
  {
    id: 'pressmart',
    slug: 'pressmart',
    title: 'PressMart',
    description: 'Clean e-commerce digital marketplace platform project for merchandise discovery and order transactions.',
    descriptionKh: 'គម្រោងវេទិកាពាណិជ្ជកម្មអេឡិចត្រូនិចទំនើបសម្រាប់ការលក់ផលិតផល។',
    problem: 'Retailers need simple, clean digital store layouts that showcase items without distracting visual clutter.',
    problemKh: 'សាងសង់វេទិកាពាណិជ្ជកម្មអេឡិចត្រូនិចទំនើបសម្រាប់ការលក់ផលិតផល។',
    solution: 'Developed an uncluttered e-commerce storefront with structured product galleries and item detail cards.',
    solutionKh: 'បានអភិវឌ្ឍ frontend ពាណិជ្ជកម្មអេឡិចត្រូនិចជាមួយការបង្ហាញផលិតផល និងមុខងារទិញទំនិញ។',
    features: [
      'Structured catalog layout',
      'Custom styled CSS interface components',
      'Product quick-view interactions',
      'Adaptive screen breakpoint support'
    ],
    featuresKh: [
      'ការបង្ហាញផលិតផល',
      'មុខងារទិញទំនិញ',
      'CSS styling',
      'ប្លង់ឆ្លើយតប'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/NgetMeas22/PressMart',
    live: null,
    category: ['Frontend'],
    isTeamProject: false,
    featured: false,
    year: '2025'
  },
    // ========================================================
  // កម្រិតទី ៥៖ FRONTEND SCRIPTING & LOGIC (JS / PYTHON)
  // ========================================================

  // 10. SNAKE GAME
  {
    id: 'snake-game',
    slug: 'snake-game',
    title: 'Snake Game',
    description: 'A classic retro arcade Snake game built with Python logic.',
    descriptionKh: 'ហ្គេម Snake ប្រពៃណីសាងសង់ជាមួយ Python។',
    problem: 'Practicing programming logic, collision detection, and coordinate grid mathematics.',
    problemKh: 'សាងសង់ game ប្រពៃណីដើម្បីអនុវត្តតក្កវិទ្យា programming និងមូលដ្ឋានគ្រឹះអភិវឌ្ឍន៍ game។',
    solution: 'Implemented classic 2D Snake mechanics using Python with keyboard inputs and realtime score increments.',
    solutionKh: 'បានអនុវត្ត game Snake ប្រពៃណីដោយប្រើ Python ជាមួយការគ្រប់គ្រង keyboard និងការតាមដានពិន្ទុ។',
    features: [
      'Classic grid movement mechanics',
      'High-score persistence and tracking',
      'Responsive keyboard input handlers',
      'Pure Python standard library implementation'
    ],
    featuresKh: [
      'ការលេងប្រពៃណី',
      'ការតាមដានពិន្ទុ',
      'ការគ្រប់គ្រង keyboard',
      'ការអនុវត្ត Python'
    ],
    technologies: ['Python'],
    github: 'https://github.com/NgetMeas22/Snake-Game',
    live: null,
    category: ['Python'],
    isTeamProject: false,
    featured: false,
    year: '2026'
  } 


];