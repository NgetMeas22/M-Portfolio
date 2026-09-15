export const blogPosts = [
  {
    id: 1,
    slug: 'getting-started-with-react',
    title: 'Getting Started with React',
    titleKh: 'ចាប់ផ្តើមជាមួយ React',
    excerpt: 'A beginner-friendly guide to understanding React components, hooks, and state management.',
    excerptKh: 'មគ្គុទ្ទេសក៍ងាយស្រួលសម្រាប់យល់ React components, hooks, និង state management។',
    content: `React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces called components.

## Why React?

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

## Components

Components let you split the UI into independent, reusable pieces. They accept inputs called "props" and return React elements describing what should appear on the screen.

## Hooks

Hooks let you use state and other React features without writing a class. The most common hooks are:

- **useState**: Adds state to functional components
- **useEffect**: Performs side effects in components
- **useContext**: Subscribes to context changes

## Getting Started

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

This is the basics of React. Start building and you'll learn more as you go!`,
    date: '2026-09-10',
    tags: ['React', 'JavaScript', 'Frontend'],
    readTime: '5 min'
  },
  {
    id: 2,
    slug: 'laravel-rest-api-best-practices',
    title: 'Laravel REST API Best Practices',
    titleKh: ' Laravel REST API ឧទ្ទិសការអនុវត្តល្អបំផុត',
    excerpt: 'Tips and tricks for building clean and scalable REST APIs with Laravel.',
    excerptKh: 'គន្លឹះ និង tricks សម្រាប់សាងសង់ REST API ស្អាត និងអាចពង្រីកបានជាមួយ Laravel។',
    content: `Laravel is a great PHP framework for building REST APIs. Here are some best practices I've learned.

## Use API Resources

API Resources provide a consistent way to transform your models and collections into JSON responses.

\`\`\`php
class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
        ];
    }
}
\`\`\`

## Use Form Requests for Validation

Never validate directly in controllers. Use Form Request classes instead.

## Use Route Model Binding

Laravel can automatically resolve model instances from route parameters.

## Use Proper Status Codes

Return appropriate HTTP status codes: 200 for success, 201 for created, 404 for not found, 422 for validation errors.

## Version Your API

Always version your API (e.g., /api/v1/) to avoid breaking changes.`,
    date: '2026-08-25',
    tags: ['Laravel', 'PHP', 'API', 'Backend'],
    readTime: '7 min'
  },
  {
    id: 3,
    slug: 'mysql-query-optimization',
    title: 'MySQL Query Optimization Tips',
    titleKh: 'គន្លឹះបង្កើនល្បឿន MySQL Query',
    excerpt: 'Learn how to optimize your MySQL queries for better performance.',
    excerptKh: 'រៀនពីរបៀបបង្កើនល្បឿន MySQL queries របស់អ្នកសម្រាប់សម្តែងកាន់តែប្រសើរ។',
    content: `Writing efficient MySQL queries is crucial for application performance. Here are key tips.

## Use Indexes

Indexes help MySQL find data faster. Add indexes to columns used in WHERE, JOIN, and ORDER BY clauses.

## Avoid SELECT *

Only select the columns you need instead of using SELECT *.

## Use EXPLAIN

Use EXPLAIN to understand how MySQL executes your queries.

## Optimize JOINs

Make sure your JOIN columns are indexed and use the smallest result set possible.

## Use LIMIT

When you don't need all results, use LIMIT to reduce the amount of data returned.`,
    date: '2026-08-15',
    tags: ['MySQL', 'Database', 'Performance'],
    readTime: '6 min'
  },
  {
    id: 4,
    slug: 'docker-for-developers',
    title: 'Docker Basics for Developers',
    titleKh: 'មូលដ្ឋាន Docker សម្រាប់អ្នកអភិវឌ្ឍន៍',
    excerpt: 'An introduction to Docker and how it can simplify your development workflow.',
    excerptKh: 'សេចក្តីណែនាំអំពី Docker និងរបៀបវាអាចសម្រួល workflow អភិវឌ្ឍន៍របស់អ្នក។',
    content: `Docker has revolutionized how we develop and deploy applications.

## What is Docker?

Docker is a platform for developing, shipping, and running applications in containers.

## Why Use Docker?

- Consistent environments across development and production
- Easy collaboration with team members
- Quick setup of development environments

## Basic Commands

\`\`\`bash
# Build an image
docker build -t myapp .

# Run a container
docker run -p 3000:3000 myapp

# List running containers
docker ps
\`\`\`

## Docker Compose

Docker Compose lets you define multi-container applications with a single file.`,
    date: '2026-07-20',
    tags: ['Docker', 'DevOps', 'Tools'],
    readTime: '8 min'
  },
  {
    id: 5,
    slug: 'vuejs-vs-react-comparison',
    title: 'Vue.js vs React: A Student\'s Perspective',
    titleKh: 'Vue.js vs React: ទស្សនៈរបស់និស្សិត',
    excerpt: 'My experience learning both Vue.js and React as a computer science student.',
    excerptKh: 'បទពិសោធន៍របស់ខ្ញុំក្នុងការរៀន Vue.js និង React ជានិស្សិតវិទ្យាសាស្ត្រកុំព្យូទ័រ។',
    content: `As a student learning both frameworks, here's my take on Vue.js vs React.

## Learning Curve

Vue.js has a gentler learning curve. React requires more boilerplate initially.

## Syntax

Vue uses single-file components with a clear separation of HTML, CSS, and JS.

React uses JSX which combines HTML and JavaScript.

## Community

React has a larger community and more third-party libraries.

Vue's ecosystem (Vuex, Vue Router) is more integrated.

## My Recommendation

Learn both! Each has its strengths, and knowing multiple frameworks makes you more versatile.`,
    date: '2026-07-10',
    tags: ['Vue.js', 'React', 'JavaScript', 'Comparison'],
    readTime: '6 min'
  }
];
