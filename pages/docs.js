import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `Nebula Launchpad revolutionizes intellectual property trading and research funding through blockchain technology. The platform creates a decentralized ecosystem where researchers, investors, and IP traders can interact seamlessly.`,
    subsections: [
      {
        title: 'Problem Statement',
        content: `
- Traditional IP trading lacks transparency and liquidity
- Research funding is centralized and inefficient
- Limited community involvement in research direction
- High barriers to entry for small investors`,
      },
      {
        title: 'Solution',
        content: `
- Tokenizes intellectual property
- Enables fractional ownership
- Provides transparent funding mechanisms
- Creates community-driven governance`,
      },
    ],
  },
  {
    id: 'features',
    title: 'Platform Features',
    content: 'Core functionality and features of the Nebula Launchpad platform.',
    subsections: [
      {
        title: 'IP Marketplace',
        content: `
- Trade intellectual property rights as NFTs
- Support for full ownership transfers
- Time-limited licensing options
- Built-in royalty mechanisms
- Platform fee management
- Transparent pricing history`,
      },
      {
        title: 'Research Project Funding',
        content: `
- Milestone-based funding system
- Chainlink oracle integration
- Secure fund management
- Escrow system
- Dispute resolution mechanism`,
      },
    ],
  },
  {
    id: 'tokenomics',
    title: 'Token Economics',
    content: 'NEBL token utilities and distribution model.',
    subsections: [
      {
        title: 'Distribution',
        content: `
Total Supply: 100,000,000 NEBL

Distribution:
- 40% - Community & Ecosystem
- 20% - Initial Liquidity
- 15% - Team & Advisors (vested)
- 15% - Research Project Funding Pool
- 10% - DAO Treasury`,
      },
      {
        title: 'Staking Mechanism',
        content: `
- Flexible staking periods (7-365 days)
- Base APR: 5%
- Maximum Bonus APR: 15% (365-day locks)
- Governance rights through ERC20Votes

Lock Period Bonuses:
- 7-30 days: Base APR only
- 31-90 days: Base + 5% bonus
- 91-180 days: Base + 10% bonus
- 181-365 days: Base + 15% bonus`,
      },
    ],
  },
  {
    id: 'governance',
    title: 'Governance',
    content: 'NebulaDAO governance structure and mechanisms.',
    subsections: [
      {
        title: 'Proposal Types',
        content: `
Platform Parameters:
- Fee adjustments
- Staking parameters
- Voting thresholds

Treasury Management:
- Fund allocation
- Research grants
- Protocol upgrades

Protocol Updates:
- Contract upgrades
- New features
- Security improvements`,
      },
      {
        title: 'Voting Mechanism',
        content: `
- Minimum tokens to propose: 100,000 NEBL
- Voting period: 7 days
- Timelock period: 2 days
- Quorum: 4% of total supply
- Execution threshold: 51% approval`,
      },
    ],
  },
  {
    id: 'technical',
    title: 'Technical Architecture',
    content: 'Technical implementation details and smart contract architecture.',
    subsections: [
      {
        title: 'Smart Contracts',
        content: `
Core Contracts:
1. NEBLToken.sol: ERC20 token with voting and staking
2. IPMarketplace.sol: NFT marketplace for IP trading
3. ResearchProject.sol: Research funding and milestones
4. Governance.sol: DAO governance implementation
5. NEBLSwap.sol: Token swap functionality
6. Disputes.sol: Dispute resolution system`,
      },
      {
        title: 'Security Features',
        content: `
- Reentrancy protection
- Role-based access control
- Timelock mechanisms
- Oracle price validation
- Emergency pause functionality
- Comprehensive testing suite`,
      },
    ],
  },
  {
    id: 'revenue',
    title: 'Revenue Model',
    content: 'Platform fee structure and revenue distribution.',
    subsections: [
      {
        title: 'Platform Fees',
        content: `
IP Marketplace:
- 2.5% listing fee
- 1% license renewal fee
- 0.5% transfer fee

Token Swap:
- 0.3% swap fee
- Fee sharing with stakers

Research Projects:
- 1% project funding fee
- 0.5% milestone completion fee`,
      },
      {
        title: 'Fee Distribution',
        content: `
- 40% to staking rewards
- 30% to DAO treasury
- 20% to development fund
- 10% to emergency fund`,
      },
    ],
  },
  {
    id: 'roadmap',
    title: 'Development Roadmap',
    content: 'Platform development timeline and milestones.',
    subsections: [
      {
        title: 'Phase 1 (Current)',
        content: `
- Basic platform functionality
- Token launch
- Governance implementation
- Initial marketplace features`,
      },
      {
        title: 'Phase 2 (Q2 2024)',
        content: `
- Enhanced IP marketplace
- Cross-chain integration
- Advanced research tools
- Mobile application beta`,
      },
      {
        title: 'Phase 3 (Q4 2024)',
        content: `
- AI integration
- Additional oracle integrations
- Global expansion
- Enterprise features`,
      },
    ],
  },
];

export default function Whitepaper() {
  const [activeSection, setActiveSection] = useState('introduction');

  return (
    <div className="min-h-screen bg-gradient">
      <div className="grid-pattern">
        <Navbar />
        
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-text">
              Nebula Launchpad Whitepaper
            </h1>
            
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
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-text">
                      {section.title}
                    </h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 text-lg mb-8">{section.content}</p>
                      
                      {section.subsections.map((subsection, index) => (
                        <div key={index} className="mb-8">
                          <h3 className="text-2xl font-semibold mb-4">
                            {subsection.title}
                          </h3>
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