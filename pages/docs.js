import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    content: `
      Nebula Launchpad is a decentralized platform for scientific research, built on blockchain technology.
      This documentation will guide you through the platform's features and how to use them effectively.
    `,
    subsections: [
      {
        title: 'Quick Start',
        content: `
          1. Connect your Web3 wallet
          2. Create a researcher profile
          3. Explore active research projects
          4. Join or create a research DAO
        `,
      },
      {
        title: 'System Requirements',
        content: `
          - Modern web browser with Web3 support
          - Avalanche C-Chain compatible wallet
          - NBL tokens for platform interactions
        `,
      },
    ],
  },
  {
    id: 'research-workshop',
    title: 'Research Workshop',
    content: `
      The Research Workshop is a collaborative environment for conducting and managing research projects.
    `,
    subsections: [
      {
        title: 'Features',
        content: `
          - Real-time collaborative editing
          - Version control system
          - Data visualization tools
          - Integrated AI research assistants
          - Secure data storage with IPFS
        `,
      },
      {
        title: 'Workflow',
        content: `
          1. Create a new research project
          2. Invite collaborators
          3. Set up project milestones
          4. Use AI tools for analysis
          5. Publish and share results
        `,
      },
    ],
  },
  {
    id: 'dao-governance',
    title: 'DAO Governance',
    content: `
      Each research project operates as a sub-DAO, enabling decentralized decision-making and resource allocation.
    `,
    subsections: [
      {
        title: 'Governance Structure',
        content: `
          - Token-based voting rights
          - Proposal submission system
          - Multi-sig treasury management
          - Milestone-based funding releases
        `,
      },
      {
        title: 'Participation',
        content: `
          - Stake NBL tokens for voting power
          - Submit and vote on proposals
          - Participate in peer review
          - Earn rewards for contributions
        `,
      },
    ],
  },
  {
    id: 'token-economics',
    title: 'Token Economics',
    content: `
      The NBL token powers the entire ecosystem, providing incentives for participation and governance.
    `,
    subsections: [
      {
        title: 'Token Utility',
        content: `
          - Governance voting
          - Staking rewards
          - Research funding
          - Platform fee payments
          - Access to premium features
        `,
      },
      {
        title: 'Distribution',
        content: `
          - 40% Community Treasury
          - 25% Research Grants
          - 15% Team and Advisors
          - 10% Early Supporters
          - 10% Liquidity Provision
        `,
      },
    ],
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    content: `
      Our development roadmap outlines the platform's evolution and upcoming features.
    `,
    subsections: [
      {
        title: 'Q2 2024',
        content: `
          - Platform beta launch
          - Initial research DAOs
          - Basic AI integration
          - Community building
        `,
      },
      {
        title: 'Q3 2024',
        content: `
          - Advanced AI features
          - Cross-chain integration
          - Mobile app release
          - Research marketplace
        `,
      },
      {
        title: 'Q4 2024',
        content: `
          - Enhanced governance tools
          - Data marketplace launch
          - Partnership program
          - Global expansion
        `,
      },
    ],
  },
  {
    id: 'technical',
    title: 'Technical Details',
    content: `
      Technical implementation details and architecture overview.
    `,
    subsections: [
      {
        title: 'Smart Contracts',
        content: `
          - Research funding contracts
          - DAO governance contracts
          - Token distribution contracts
          - NFT certification system
        `,
      },
      {
        title: 'Infrastructure',
        content: `
          - Avalanche C-Chain
          - IPFS storage
          - TheGraph indexing
          - AI model integration
        `,
      },
    ],
  },
];

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('getting-started');

  return (
    <div className="min-h-screen bg-gradient">
      <div className="grid-pattern">
        <Navbar />
        
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Sidebar */}
              <div className="hidden lg:block lg:col-span-3">
                <nav className="sticky top-24 space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary text-white'
                          : 'text-gray-300 hover:bg-primary/10'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Main content */}
              <div className="lg:col-span-9">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className={activeSection === section.id ? '' : 'hidden'}
                  >
                    <h1 className="text-4xl font-bold mb-8 bg-gradient-text">
                      {section.title}
                    </h1>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 text-lg mb-8">{section.content}</p>
                      
                      {section.subsections.map((subsection, index) => (
                        <div key={index} className="mb-8">
                          <h2 className="text-2xl font-semibold mb-4">
                            {subsection.title}
                          </h2>
                          <div className="glass-effect p-6 rounded-lg">
                            <pre className="text-gray-300 whitespace-pre-wrap">
                              {subsection.content}
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
} 