import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const roadmapItems = [
  {
    date: 'Q1 2025',
    title: 'MVP Launch',
    description: 'Launch of core platform features including research proposal submission and basic funding mechanisms.',
    items: [
      'Core Platform Launch - March 1st, 2025',
      'Research Proposal Submission System',
      'Basic Funding Pool Management',
      'Token Launch',
    ]
  },
  {
    date: 'Q2 2025',
    title: 'Enhanced Features',
    description: 'Expanding platform capabilities with advanced research tools and collaboration features.',
    items: [
      'Advanced Peer Review System',
      'Research Data Sharing Framework',
      'Cross-chain Integration',
      'Researcher SDK Release',
    ]
  },
  {
    date: 'Q3 2025',
    title: 'Ecosystem Growth',
    description: 'Focus on community growth and institutional partnerships.',
    items: [
      'Institution Partnership Program',
      'Community Governance Implementation',
      'Advanced Research Analytics',
      'Enhanced Collaboration Tools',
    ]
  },
  {
    date: 'Q4 2025',
    title: 'Global Research Network',
    description: 'Expanding to a global research network with enterprise features.',
    items: [
      'Global Research Institution Integration',
      'Advanced Grant Management',
      'Research Impact Metrics',
      'Enhanced Security Protocols',
    ]
  }
];

const RoadmapItem = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="relative pl-8 pb-16 last:pb-0"
    >
      <div className="absolute left-0 top-0 h-full w-px bg-nebula-purple" />
      <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-nebula-purple" />
      
      <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-nebula-purple">
        <span className="inline-block px-3 py-1 rounded-full text-sm bg-nebula-purple text-white mb-4">
          {item.date}
        </span>
        <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
        <p className="text-gray-300 mb-4">{item.description}</p>
        <ul className="space-y-2">
          {item.items.map((listItem, i) => (
            <li key={i} className="flex items-center text-gray-300">
              <span className="mr-2">•</span>
              {listItem}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-nebula-dark">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-nebula-purple to-nebula-light bg-clip-text text-transparent mb-4">
              Roadmap 2025
            </h1>
            <p className="text-xl text-gray-300">
              Our journey to revolutionize decentralized AI infrastructure
            </p>
          </motion.div>

          <div className="space-y-8">
            {roadmapItems.map((item, index) => (
              <RoadmapItem key={index} item={item} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center text-gray-300"
          >
            <p className="italic">
              * Roadmap timelines are subject to change based on development progress and market conditions
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 