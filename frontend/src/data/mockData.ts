import { Project, Event, Attendee } from '../types';

// Mock data for projects
export const projects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Health Monitor',
    description: 'A wearable device that uses machine learning to predict health issues before they occur.',
    team: 'HealthTech Innovators',
    tags: ['AI/ML', 'Health', 'IoT'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400',
    contributors: [
      {
        id: 101,
        name: 'Sarah Chen',
        role: 'ML Engineer',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        github: 'sarahchen'
      },
      {
        id: 102,
        name: 'Michael Rodriguez',
        role: 'Hardware Design',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        github: 'mrodriguez'
      },
      {
        id: 103,
        name: 'Aisha Patel',
        role: 'Data Scientist',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        github: 'apatel'
      }
    ]
  },
  {
    id: 2,
    title: 'Community Resource Sharing Platform',
    description: 'A platform connecting communities to share resources and reduce waste.',
    team: 'Sustainable Solutions',
    tags: ['Social Impact', 'Sustainability', 'Web App'],
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400',
    contributors: [
      {
        id: 201,
        name: 'James Wilson',
        role: 'Full Stack Developer',
        avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
        github: 'jwilson'
      },
      {
        id: 202,
        name: 'Emma Thompson',
        role: 'UX Designer',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        github: 'ethompson'
      },
      {
        id: 203,
        name: 'David Kim',
        role: 'Product Manager',
        avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
        github: 'dkim'
      },
      {
        id: 204,
        name: 'Olivia Martinez',
        role: 'Community Liaison',
        avatar: 'https://randomuser.me/api/portraits/women/39.jpg'
      }
    ]
  },
  {
    id: 3,
    title: 'Decentralized Education Credentials',
    description: 'Blockchain-based system for verifying educational credentials.',
    team: 'BlockEd',
    tags: ['Blockchain', 'Education', 'Security'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400',
    contributors: [
      {
        id: 301,
        name: 'Alex Johnson',
        role: 'Blockchain Developer',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        github: 'ajohnson'
      },
      {
        id: 302,
        name: 'Sophia Lee',
        role: 'Smart Contract Engineer',
        avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
        github: 'slee'
      },
      {
        id: 303,
        name: 'Marcus Brown',
        role: 'Security Specialist',
        avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
        github: 'mbrown'
      }
    ]
  },
  {
    id: 4,
    title: 'Accessible Navigation App',
    description: 'Mobile app providing accessible navigation for people with disabilities.',
    team: 'Access for All',
    tags: ['Accessibility', 'Maps', 'Mobile'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
    contributors: [
      {
        id: 401,
        name: 'Emily Patel',
        role: 'UX Designer',
        avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
        github: 'epatel'
      },
      {
        id: 402,
        name: 'Ryan Thompson',
        role: 'Mobile Developer',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        github: 'rthompson'
      },
      {
        id: 403,
        name: 'Julia Kim',
        role: 'Accessibility Specialist',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
        github: 'jkim'
      }
    ]
  },
];

// Mock data for attendees
export const attendees: Attendee[] = [
  {
    id: 1001,
    name: 'Jordan Smith',
    email: 'jordan.smith@example.com',
    status: 'confirmed',
    registrationDate: '2023-10-05',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 1002,
    name: 'Taylor Johnson',
    email: 'taylor.johnson@example.com',
    status: 'registered',
    registrationDate: '2023-10-07',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 1003,
    name: 'Alex Williams',
    email: 'alex.williams@example.com',
    status: 'confirmed',
    registrationDate: '2023-10-02',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 1004,
    name: 'Morgan Brown',
    email: 'morgan.brown@example.com',
    status: 'cancelled',
    registrationDate: '2023-09-28',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    notes: 'Scheduling conflict'
  },
  {
    id: 1005,
    name: 'Casey Davis',
    email: 'casey.davis@example.com',
    status: 'registered',
    registrationDate: '2023-10-10',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
  },
  {
    id: 1006,
    name: 'Riley Wilson',
    email: 'riley.wilson@example.com',
    status: 'confirmed',
    registrationDate: '2023-09-30',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
  },
  {
    id: 1007,
    name: 'Jamie Garcia',
    email: 'jamie.garcia@example.com',
    status: 'registered',
    registrationDate: '2023-10-08',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
  },
  {
    id: 1008,
    name: 'Avery Martinez',
    email: 'avery.martinez@example.com',
    status: 'confirmed',
    registrationDate: '2023-10-04',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
  },
  {
    id: 1009,
    name: 'Dakota Robinson',
    email: 'dakota.robinson@example.com',
    status: 'registered',
    registrationDate: '2023-10-09',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg'
  },
  {
    id: 1010,
    name: 'Skyler Thompson',
    email: 'skyler.thompson@example.com',
    status: 'confirmed',
    registrationDate: '2023-10-03',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
  }
];

// Mock data for events
export const events: Event[] = [
  {
    id: 1,
    title: 'Annual Hackathon 2023',
    date: 'November 15-17, 2023',
    location: 'Tech Campus, Building A',
    description: 'Join us for 48 hours of coding, collaboration, and innovation.',
    image: 'https://images.unsplash.com/photo-1540304453527-62f979142a17?auto=format&fit=crop&q=80&w=400',
    type: 'hackathon',
    capacity: 100,
    organizer: 'Jane Doe',
    attendees: [
      attendees[0],
      attendees[1],
      attendees[2],
      attendees[3],
      attendees[4],
      attendees[5]
    ]
  },
  {
    id: 2,
    title: 'AI Ethics Workshop',
    date: 'December 5, 2023',
    location: 'Virtual Event',
    description: 'Exploring ethical considerations in artificial intelligence development.',
    image: 'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?auto=format&fit=crop&q=80&w=400',
    type: 'workshop',
    capacity: 50,
    organizer: 'John Smith',
    attendees: [
      attendees[6],
      attendees[7],
      attendees[8],
      attendees[9]
    ]
  },
  {
    id: 3,
    title: 'Tech for Good Summit',
    date: 'January 20, 2024',
    location: 'Community Center',
    description: 'Showcasing technology projects with positive social impact.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=400',
    type: 'conference',
    capacity: 200,
    organizer: 'Jane Doe',
    attendees: [
      attendees[0],
      attendees[2],
      attendees[4],
      attendees[6],
      attendees[8]
    ]
  },
];

// Helper function to get project by ID
export function getProjectById(id: number): Project | undefined {
  return projects.find(project => project.id === id);
}

// Helper function to get event by ID
export function getEventById(id: number): Event | undefined {
  return events.find(event => event.id === id);
}

// Helper function to get attendee by ID
export function getAttendeeById(id: number): Attendee | undefined {
  return attendees.find(attendee => attendee.id === id);
}
