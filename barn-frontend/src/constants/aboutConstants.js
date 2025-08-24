import aishah from '../assets/aishah.png';
import asyiqin from '../assets/asyiqin.png';
import beldron from '../assets/beldron.png';
import iyzman from '../assets/iyzman.png';
import fernado from '../assets/fernado.png';

// About constants for the application
export const ABOUT_CONTENT = {
  title: 'About SeaWise',
  subtitle: 'ABOUT BARNACLEAN & SEAWISE',
  mainHeading: 'Innovating Marine Technology for Sustainable Shipping',
};

// Service Information section - Updated with BarnaClean process
export const SERVICE_INFO = {
  subtitle: 'ABOUT BARNACLEAN TECHNOLOGY',
  title: 'Our AI-Powered Marine Solution Process',
  description: 'BarnaClean specializes in AI-driven biofouling prediction and route optimization, helping maritime operations achieve up to 30% fuel savings while protecting ocean ecosystems through advanced machine learning and real-time environmental analysis.',
  processSteps: [
    {
      number: '01.',
      title: 'Predict Biofouling Growth',
      description: "AI model forecasts barnacle buildup in real-time using sea temperature, salinity, vessel speed, and idle time data."
    },
    {
      number: '02.',
      title: 'Optimize Route Planning',
      description: 'A* algorithm calculates fuel-efficient paths considering weather, currents, and predicted hull drag from biofouling.'
    },
    {
      number: '03.',
      title: 'Deliver Fuel Savings',
      description: 'Integrated system reduces fuel consumption by up to 30% while minimizing environmental impact and operational costs.'
    }
  ]
};

// Company Information section - Updated with BarnaClean focus
export const COMPANY_INFO = {
  title: 'About BarnaClean',
  background: 'Developed by the SeaWise team for MarineHack2025 Challenge 1, BarnaClean is an AI-driven biofouling prevention system that revolutionizes maritime operations through intelligent barnacle management and route optimization.',
  mission: 'To predict and prevent biofouling for 30% fuel savings while protecting our oceans through innovative AI technology that optimizes vessel performance and reduces environmental impact.',
  vision: 'A world where every vessel hull can tell you when to clean, enabling smart routing systems that cut fuel costs, lower emissions, and protect marine ecosystems with optimized, eco-friendly routes.'
};

// Team members data - Updated with actual SeaWise team from BarnaClean document
export const TEAM_MEMBERS = [
    {
    name: 'Nor Asyiqin Nazirah Binti Rapandi',
    role: 'Team Leader & Frontend Developer',
    bio: 'Technical team leader with expertise in frontend development and project coordination for marine technology solutions.',
    image: asyiqin
  },
  {
    name: 'Beldron Feadrek',
    role: 'Pitcher & Product Presenter',
    bio: 'Leads product presentation and business development initiatives for BarnaClean marine solutions.',
    image: beldron // Placeholder for future image integration
  },

  {
    name: 'Fernando George Anak Mani',
    role: 'AI/ML Engineer',
    bio: 'Specialist in artificial intelligence and machine learning, developing innovative biofouling prediction algorithms and route optimization systems.',
    image: fernado
  },
  {
    name: 'Iyzman Daniel Bin Mijirun',
    role: 'Backend Developer / Full Stack Engineer',
    bio: 'Full-stack engineer focusing on robust Python (FastAPI) server development and AI engine integration for marine analytics.',
    image: iyzman
  },
  {
    name: 'Siti Nur Aishah Binti Juan',
    role: 'Big Data Analyst / Data Engineer',
    bio: 'Data engineering specialist managing AIS data, marine weather patterns, and oceanographic datasets for predictive analytics.',
    image: aishah
  }
];

// Impact statistics - Updated with BarnaClean metrics
export const IMPACT_STATS = [
  {
    value: '30%',
    label: 'Fuel Savings Achieved',
    description: 'Average fuel consumption reduction through AI-optimized routing and biofouling prevention'
  },
  {
    value: '94.7%',
    label: 'AI Model Accuracy',
    description: 'Biofouling prediction model accuracy with real-time environmental data processing'
  },
  {
    value: '18.5%',
    label: 'Route Efficiency Gain',
    description: 'Improved fuel efficiency through A* algorithm optimization considering weather and currents'
  },
  {
    value: '500K+',
    label: 'Tons CO₂ Prevented',
    description: 'Environmental impact reduction through optimized maritime operations and reduced emissions'
  }
];