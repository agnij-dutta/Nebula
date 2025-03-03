import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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

const RoadmapItem = ({ item, index, inView }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : (isEven ? -50 : 50) }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`relative mb-16 last:mb-0 w-full md:w-[45%] ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}
    >
      <div className={`glass-effect rounded-lg p-6 border border-nebula-purple ${inView ? 'glow-effect' : ''}`}>
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
      
      {/* Connection line to center */}
      <div className={`hidden md:block absolute top-1/2 ${isEven ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'} w-[calc(5vw+1px)] h-px bg-nebula-purple transform -translate-y-1/2`} />
      
      {/* Timeline dot */}
      <div className={`hidden md:block absolute top-1/2 ${isEven ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'} w-4 h-4 rounded-full bg-nebula-purple transform -translate-y-1/2 ${isEven ? 'translate-x-[calc(5vw-8px)]' : '-translate-x-[calc(5vw-8px)]'} ${inView ? 'glow-effect' : ''}`} />
    </motion.div>
  );
};

export default function Roadmap() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [itemsInView, setItemsInView] = useState(new Array(roadmapItems.length).fill(false));
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const observers = roadmapItems.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setItemsInView(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
          if (entry.isIntersecting) {
            setCurrentIndex(index);
          }
        },
        { threshold: 0.5 }
      );

      const element = document.getElementById(`roadmap-item-${index}`);
      if (element) observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const scrollToItem = (index) => {
    const element = document.getElementById(`roadmap-item-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      scrollToItem(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < roadmapItems.length - 1) {
      scrollToItem(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-nebula-dark">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
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

          {/* Timeline container */}
          <div className="relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 top-0 w-px h-full bg-gray-700 transform -translate-x-1/2">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-nebula-purple glow-effect"
                style={{ 
                  height: scaleX, 
                  originY: 0 
                }} 
              />
            </div>

            {/* Roadmap items */}
            <div ref={containerRef} className="space-y-8 relative max-h-[60vh] overflow-y-auto custom-scrollbar">
              {roadmapItems.map((item, index) => (
                <div key={index} id={`roadmap-item-${index}`}>
                  <RoadmapItem item={item} index={index} inView={itemsInView[index]} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`px-6 py-3 rounded-lg glass-effect border border-nebula-purple transition-all duration-300 ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:glow-effect'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === roadmapItems.length - 1}
              className={`px-6 py-3 rounded-lg glass-effect border border-nebula-purple transition-all duration-300 ${
                currentIndex === roadmapItems.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:glow-effect'
              }`}
            >
              Next
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center text-gray-300"
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