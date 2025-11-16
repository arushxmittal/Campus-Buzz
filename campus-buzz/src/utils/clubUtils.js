import { 
    faCode, faPalette, faDumbbell, faMusic,
    faBook, faUtensils, faCamera, faBriefcase, 
    faGamepad, faUsers, faPersonRunning
  } from '@fortawesome/free-solid-svg-icons';
  
  // 1. Map string names to icon components
  const iconMap = {
    faCode,
    faPalette,
    faDumbbell,
    faMusic,
    faBook,
    faUtensils,
    faCamera,
    faBriefcase,
    faGamepad,
    faUsers,
    faPersonRunning
  };
  
  // 2. Helper function to get icon component from string
  export const getIcon = (iconName) => iconMap[iconName] || faUsers;
  
  // 3. Data for the "Create Club" dropdown
  export const categoryOptions = [
    { id: 'tech', name: 'Technology', icon: 'faCode', color: 'blue' },
    { id: 'arts', name: 'Arts', icon: 'faPalette', color: 'pink' },
    { id: 'fitness', name: 'Fitness', icon: 'faPersonRunning', color: 'green' },
    { id: 'music', name: 'Music', icon: 'faMusic', color: 'pink' },
    { id: 'books', name: 'Book Club', icon: 'faBook', color: 'purple' },
    { id: 'food', name: 'Food', icon: 'faUtensils', color: 'orange' },
    { id: 'photo', name: 'Photography', icon: 'faCamera', color: 'red' },
    { id: 'biz', name: 'Business', icon: 'faBriefcase', color: 'indigo' },
    { id: 'games', name: 'Gaming', icon: 'faGamepad', color: 'teal' },
  ];
  
  // 4. The master list of initial clubs.
  // This is what will be loaded into localStorage the first time.
  export const initialClubData = [
    { 
      id: 'tech', 
      name: 'Python Developers', 
      icon: 'faCode', 
      color: 'blue', 
      members: 1234, 
      events: 8, 
      location: 'Seattle, WA',
      tagline: 'Innovation • Collaboration • Technology',
      description: 'The Tech Club is a vibrant community of students passionate about technology, coding, and innovation. We organize hackathons, coding workshops, tech talks, and collaborative projects.'
    },
    { 
      id: 'fitness', 
      name: 'Morning Runners', 
      icon: 'faPersonRunning', 
      color: 'green', 
      members: 567, 
      events: 15, 
      location: 'Central Park, NY',
      tagline: 'Health • Wellness • Strength',
      description: 'The Fitness Club promotes healthy living through group workouts, sports activities, and wellness programs. We organize fitness challenges, yoga sessions, and nutrition workshops.'
    },
    { 
      id: 'books', 
      name: 'Sci-Fi Book Club', 
      icon: 'faBook', 
      color: 'purple', 
      members: 342, 
      events: 6, 
      location: 'Chicago, IL',
      tagline: 'Explore new worlds',
      description: 'From Asimov to Zindell, we read and discuss the best of science fiction, fantasy, and speculative fiction. Join us for monthly meetups and lively debates.'
    },
    { 
      id: 'food', 
      name: 'Foodie Adventures', 
      icon: 'faUtensils', 
      color: 'orange', 
      members: 789, 
      events: 12, 
      location: 'Miami, FL',
      tagline: 'Taste the city, one bite at a time',
      description: 'Are you a foodie? So are we! This club explores local eateries, hosts cooking classes, and debates the important questions (like "is a hotdog a sandwich?").'
    },
    { 
      id: 'photo', 
      name: 'Photography Club', 
      icon: 'faCamera', 
      color: 'red', 
      members: 456, 
      events: 9, 
      location: 'Portland, OR',
      tagline: 'Capture the moment',
      description: 'Whether you use a DSLR or just your phone, the Photo Club is for you. We host photo walks, editing workshops, and gallery visits.'
    },
    { 
      id: 'biz', 
      name: 'Entrepreneurs Network', 
      icon: 'faBriefcase', 
      color: 'indigo', 
      members: 923, 
      events: 18, 
      location: 'Austin, TX',
      tagline: 'Build the future, today',
      description: 'Connect with fellow innovators, pitch your ideas, and learn from industry leaders. We host guest speaker events, pitch competitions, and networking mixers.'
    },
    { 
      id: 'music', 
      name: 'Jazz Enthusiasts', 
      icon: 'faMusic', 
      color: 'pink', 
      members: 234, 
      events: 7, 
      location: 'New Orleans, LA',
      tagline: 'Rhythm • Harmony • Performance',
      description: 'The Music Society brings together musicians, singers, and music enthusiasts. We organize concerts, jam sessions, music production workshops, and competitions.'
    },
    { 
      id: 'games', 
      name: 'Board Game Society', 
      icon: 'faGamepad', 
      color: 'teal', 
      members: 678, 
      events: 14, 
      location: 'Denver, CO',
      tagline: 'Roll the dice, make new friends',
      description: 'Join us for epic game nights! We play everything from Catan and Ticket to Ride to complex strategy games and fun party games. All skill levels welcome.'
    },
    { 
      id: 'arts', 
      name: 'Arts Society', 
      icon: 'faPalette', 
      color: 'pink', 
      members: 180, 
      events: 20, 
      location: 'Campus Wide',
      tagline: 'Creativity • Expression • Culture',
      description: 'The Arts Society celebrates creativity in all its forms. From painting and sculpture to digital art and photography, we provide a platform for artists to showcase their work.'
    }
  ];