import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    content: `Nebula is a decentralized platform built on the Avalanche blockchain that integrates intellectual property (IP) management with research funding. By leveraging blockchain technology, Nebula enables creators and researchers to tokenize their intellectual property as NFTs, secure milestone-based funding for their projects, and monetize their innovations through a transparent marketplace.`,
    subsections: []
  },
  {
    id: 'introduction',
    title: '1. Introduction',
    content: 'Background, Vision, and Core Principles',
    subsections: [
      {
        title: '1.1 Background',
        content: `Intellectual property (IP) represents the cornerstone of innovation in the modern economy. Patents, copyrights, trademarks, and trade secrets collectively form the foundation upon which creators and researchers build their careers and businesses. However, the current systems for IP management and research funding face significant challenges:

1. Centralized Control: Traditional IP systems are controlled by centralized authorities
2. Funding Bottlenecks: Researchers often struggle to secure funding through conventional channels
3. Value Capture: Creators frequently fail to capture the full value of their innovations
4. Transparency Issues: Both IP management and research funding lack transparency`
      },
      {
        title: '1.2 Vision and Mission',
        content: `Vision: To create a decentralized ecosystem where intellectual property and research innovation thrive through transparent ownership, efficient funding, and fair value distribution.

Mission: To build a comprehensive platform that empowers creators and researchers by providing them with the tools to protect, fund, and monetize their innovations while enabling backers to participate in and benefit from the success of these projects.`
      },
      {
        title: '1.3 Core Principles',
        content: `1. Decentralization: Reducing reliance on central authorities and intermediaries
2. Transparency: Providing clear visibility into ownership, funding, and usage
3. Accessibility: Making IP protection and research funding available to a broader audience
4. Fairness: Ensuring equitable distribution of value among all stakeholders
5. Security: Protecting intellectual property and user assets through robust security measures`
      }
    ]
  },
  {
    id: 'market-analysis',
    title: '2. Market Analysis',
    content: 'Analysis of IP Management and Research Funding Markets',
    subsections: [
      {
        title: '2.1 Market Size',
        content: `IP Management Market:
- Global IP management software market: $9.6 billion (2024)
- Projected to reach $27.2 billion by 2032
- CAGR of 13.22%

Research Funding Market:
- Global crowdfunding market: $17.72 billion (2024)
- Academic R&D spending: $537.27 billion (2024)
- Expected growth to $580.79 billion (2025)`
      },
      {
        title: '2.2 Target Audience',
        content: `Creators and Researchers:
- Academic researchers
- Independent inventors
- Small to medium-sized research teams
- University technology transfer offices

Backers and Investors:
- Individual supporters
- Angel investors
- Corporate R&D departments
- Venture capital firms

Businesses and Licensees:
- Startups
- Corporations
- Manufacturing companies
- Software developers`
      }
    ]
  },
  {
    id: 'solution',
    title: '3. The Nebula Solution',
    content: 'Platform Components and Value Proposition',
    subsections: [
      {
        title: '3.1 Platform Overview',
        content: `Core Components:
1. IP Marketplace: Decentralized marketplace for IP-NFTs
2. Research Hub: Milestone-based funding platform
3. Governance DAO: Community governance system
4. Decentralized Arbitration: Hybrid dispute resolution`
      },
      {
        title: '3.2 Value Proposition',
        content: `For Creators and Researchers:
- Simplified IP Protection
- Alternative Funding
- Fair Compensation
- Transparent Recognition

For Backers and Investors:
- Direct Participation
- Financial Incentives
- Reduced Risk
- Portfolio Diversification

For Businesses and Licensees:
- Simplified Discovery
- Transparent Terms
- Reduced Legal Overhead
- Innovation Access`
      }
    ]
  },
  {
    id: 'technical',
    title: '4. Technical Architecture',
    content: 'Blockchain Infrastructure and Implementation Details',
    subsections: [
      {
        title: '4.1 Blockchain Infrastructure',
        content: `Nebula leverages the Avalanche blockchain for its core infrastructure:

Key Advantages:
- High Performance: 4,500+ transactions per second
- Low Latency: Sub-second finality
- Cost Efficiency: Transaction fees < $0.01
- EVM Compatibility: Support for Ethereum tools
- Subnet Architecture: Dedicated application subnets

Implementation:
- Primary Chain: Avalanche C-Chain
- Custom Subnet: Dedicated IP transactions
- Cross-Chain Integration: Multi-blockchain support`
      },
      {
        title: '4.2 Storage Architecture',
        content: `Hybrid Storage Approach:

On-Chain Storage:
- Ownership records
- Transaction history
- Core metadata
- Smart contract state

Off-Chain Storage:
- IPFS: Decentralized file storage
- Arweave: Permanent documentation
- Ceramic Network: Mutable metadata

Implementation Features:
- Content addressing
- Redundant storage
- Version control
- Access management`
      },
      {
        title: '4.3 Oracle Integration',
        content: `External Data Integration:

Chainlink Integration:
- Price feeds
- Real-world data
- Cross-chain communication
- Automated verification

Hybrid Oracle System:
- Automated verification
- Human validation
- Multi-source consensus
- Fallback mechanisms`
      }
    ]
  },
  {
    id: 'tokenomics',
    title: '5. Tokenomics',
    content: 'NEBL Token Economics and Distribution',
    subsections: [
      {
        title: '5.1 Token Distribution',
        content: `Total Supply: 1,000,000,000 NEBL

Allocation:
- Ecosystem Development: 40% (400,000,000 NEBL)
- Staking Rewards: 30% (300,000,000 NEBL)
- Team and Advisors: 20% (200,000,000 NEBL)
- Public Sale: 10% (100,000,000 NEBL)

Vesting Schedules:
- Ecosystem: 4 years linear
- Team/Advisors: 3 years (1-year cliff)
- Public Sale: 25% at TGE, 75% over 6 months`
      },
      {
        title: '5.2 Token Utility',
        content: `1. Governance: Platform upgrade voting
2. Staking: Network security and rewards
3. Fee Discounts: Reduced marketplace fees
4. Access Rights: Premium features
5. Royalty Participation: Platform revenue share`
      }
    ]
  },
  {
    id: 'revenue',
    title: '6. Revenue Model',
    content: 'Platform Revenue Structure and Distribution',
    subsections: [
      {
        title: '6.1 Fee Structure',
        content: `Marketplace Fees:
- IP-NFT Minting: 1% (AVAX)
- NFT Sales: 2% (1% AVAX, 1% NEBL)
- Licensing: 3% initial, 1% renewals

Research Funding:
- Project Creation: Free
- Successful Funding: 3% (2% AVAX, 1% NEBL)
- Milestone Verification: 0.5%`
      },
      {
        title: '6.2 Revenue Distribution',
        content: `Fee Allocation:
- 30%: Token burn
- 30%: Staker rewards
- 20%: Development
- 10%: Community grants
- 10%: Reserve fund`
      }
    ]
  },
  {
    id: 'governance',
    title: '7. Governance Structure',
    content: 'Decentralized Autonomous Organization (DAO) Framework',
    subsections: [
      {
        title: '7.1 Governance Mechanisms',
        content: `Proposal System:

Creation: Submit proposal with minimum NEBL stake
Discussion: Community feedback period (7 days)
Voting: Token-weighted voting period (7 days)
Execution: Automatic implementation if approved
Review: Post-implementation analysis

Proposal Types:
- Parameter Changes: Platform parameters and fees
- Feature Requests: New platform features
- Fund Allocation: Community fund usage
- Protocol Upgrades: Technical improvements`
      },
      {
        title: '7.2 Voting Mechanism',
        content: `Voting Rights:
- Token-Weighted: 1 NEBL = 1 vote
- Delegation: Proxy voting support
- Quadratic Voting: For specific proposals
- Time-Weighted: Bonus for longer staking

Approval Thresholds:
- Simple Proposals: >50% approval, 10% quorum
- Major Changes: >67% approval, 20% quorum
- Critical Upgrades: >75% approval, 30% quorum`
      },
      {
        title: '7.3 Governance Evolution',
        content: `Phase 1: Foundation DAO (Months 1-6)
- Limited governance by founding team
- Community input on basic parameters
- Focus on platform stability

Phase 2: Hybrid DAO (Months 7-12)
- Increased community control
- Team oversight reduces
- Expanded voting scope

Phase 3: Full DAO (Month 13+)
- Complete community governance
- Team becomes regular members
- Full decentralization achieved`
      }
    ]
  },
  {
    id: 'security',
    title: '8. Security Considerations',
    content: 'Comprehensive Security Framework and Risk Mitigation',
    subsections: [
      {
        title: '8.1 Smart Contract Security',
        content: `Security Measures:
- Formal verification of critical components
- Multiple external security audits
- Continuous monitoring system
- Upgrade mechanisms
- Bug bounty program

Core Protections:
- Reentrancy guards
- Access controls
- Integer overflow protection
- Gas optimization
- Emergency pause functionality`
      },
      {
        title: '8.2 Economic Security',
        content: `Protection Mechanisms:
- Slashing conditions for malicious behavior
- Multi-signature requirements
- Rate limiting on critical functions
- Circuit breakers for extreme conditions
- Incentive alignment

Risk Management:
- Gradual parameter updates
- Value caps on transactions
- Tiered permission system
- Activity monitoring
- Insurance fund`
      },
      {
        title: '8.3 Data Security',
        content: `Privacy Features:
- Zero-knowledge proofs for sensitive data
- End-to-end encryption
- Granular access controls
- GDPR compliance
- Data minimization

Security Procedures:
- Regular security assessments
- Penetration testing
- Incident response plan
- Security council oversight
- Community bug reporting`
      }
    ]
  },
  {
    id: 'roadmap',
    title: '9. Roadmap',
    content: 'Development Timeline and Milestones',
    subsections: [
      {
        title: 'Phase 1: Foundation (Q2-Q3 2025)',
        content: `- Launch of core smart contracts
- Basic IP-NFT functionality
- Simple research funding mechanism
- Web application MVP
- Initial community building`
      },
      {
        title: 'Phase 2: Expansion (Q4 2025-Q1 2026)',
        content: `- Mainnet launch
- Complete IP marketplace
- Enhanced research funding
- Mobile-responsive interface
- Initial governance mechanisms`
      },
      {
        title: 'Phase 3: Growth (Q2-Q3 2026)',
        content: `- Full DAO governance
- Advanced arbitration system
- Cross-chain functionality
- Enhanced analytics
- Enterprise solutions`
      },
      {
        title: 'Phase 4: Maturity (Q4 2026+)',
        content: `- Scaling solutions
- Industry-specific templates
- Advanced API and SDK
- Global expansion
- Full decentralization`
      }
    ]
  },
  {
    id: 'risk',
    title: '10. Risk Assessment',
    content: 'Comprehensive Analysis of Platform Risks and Mitigation Strategies',
    subsections: [
      {
        title: '10.1 Technical Risks',
        content: `Primary Risks:
- Smart Contract Vulnerabilities
- Scalability Limitations
- Oracle Reliability
- Blockchain Network Congestion

Mitigation Strategies:
- Comprehensive security audits
- Scalable architecture design
- Multiple oracle sources
- Layer-2 scaling solutions`
      },
      {
        title: '10.2 Market Risks',
        content: `Primary Risks:
- Adoption Challenges
- Regulatory Uncertainty
- Market Volatility
- Competitive Pressures

Mitigation Strategies:
- User-friendly interface design
- Regulatory compliance framework
- Stablecoin integration options
- Continuous innovation focus`
      },
      {
        title: '10.3 Operational Risks',
        content: `Primary Risks:
- Team Continuity
- Governance Attacks
- Partner Dependencies
- Resource Constraints

Mitigation Strategies:
- Distributed team structure
- Secure governance mechanisms
- Reduced external dependencies
- Efficient resource allocation`
      }
    ]
  },
  {
    id: 'competitive',
    title: 'Competitive Analysis',
    content: 'Analysis of Current Market Players and Competitive Advantages',
    subsections: [
      {
        title: 'Traditional IP Management',
        content: `Existing Solutions:
- Law firms specializing in IP
- Patent offices and agencies
- IP management software providers

Limitations:
- High costs and fees
- Slow processing times
- Limited accessibility
- Centralized control`
      },
      {
        title: 'Research Funding Platforms',
        content: `Current Players:
- Academic grant systems
- Traditional crowdfunding
- Corporate sponsorship programs
- Government funding agencies

Challenges:
- Limited success rates
- High barriers to entry
- Lengthy approval processes
- Lack of transparency`
      },
      {
        title: 'Blockchain Competitors',
        content: `Emerging Solutions:
- Story Protocol (Creative IP)
- Web3 patent marketplaces
- DeSci funding platforms

Nebula Advantages:
- Full-stack IP solution
- Avalanche efficiency
- Tokenized incentives
- Community governance`
      }
    ]
  },
  {
    id: 'future',
    title: 'Future Growth',
    content: 'Strategic Growth Initiatives and Expansion Plans',
    subsections: [
      {
        title: 'Market Expansion',
        content: `Geographic Focus:
- North America initial launch
- European market entry Q4 2025
- Asia-Pacific expansion 2026
- Global coverage by 2027

Industry Verticals:
- Biotechnology and Life Sciences
- Software and Technology
- Clean Energy and Sustainability
- Advanced Materials`
      },
      {
        title: 'Platform Evolution',
        content: `Technical Advancement:
- AI-powered patent analysis
- Predictive market analytics
- Automated compliance tools
- Enhanced verification systems

User Experience:
- Mobile-first interface
- Enterprise solutions
- Integration APIs
- Developer tools`
      },
      {
        title: 'Ecosystem Development',
        content: `Community Growth:
- Research institution partnerships
- Corporate collaborations
- Developer ecosystem
- Academic programs

Service Expansion:
- Legal services marketplace
- Expert network
- Automated valuations
- Research collaboration tools`
      }
    ]
  },
  {
    id: 'conclusion',
    title: '11. Conclusion',
    content: 'Nebula\'s Vision for the Future of IP Management and Research Funding',
    subsections: [
      {
        title: 'Summary',
        content: `Nebula represents a paradigm shift in how intellectual property is managed and research is funded. By leveraging blockchain technology and the Avalanche platform, we create a more accessible, transparent, and efficient ecosystem that benefits all stakeholders.

Key Achievements:
- Decentralized IP Management
- Innovative Research Funding
- Community Governance
- Sustainable Economics
- Security-First Approach`
      },
      {
        title: 'Impact',
        content: `Transformative Benefits:

For Innovation:
- Accelerated research development
- Increased collaboration
- Reduced barriers to entry
- Enhanced value capture

For Society:
- Democratized innovation
- Transparent knowledge sharing
- Efficient resource allocation
- Global accessibility

For Industry:
- Streamlined IP management
- Reduced legal overhead
- New funding mechanisms
- Enhanced liquidity`
      },
      {
        title: 'Call to Action',
        content: `Join the Future of Innovation:

For Creators & Researchers:
- Register for early access
- Submit research proposals
- Join the community
- Provide feedback

For Investors & Backers:
- Join the whitelist
- Explore funding opportunities
- Participate in governance
- Shape the future

Contact: team@nebula.network
Website: https://nebula.network
Documentation: docs.nebula.network
Community: discord.gg/nebula`
      }
    ]
  }
];

export default function Whitepaper() {
  const [activeSection, setActiveSection] = useState('executive-summary');

  return (
    <div className="min-h-screen bg-gradient">
      <div className="grid-pattern">
        <Navbar />
        
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-text">
              Nebula Whitepaper
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