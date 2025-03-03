import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Scene3D from '../components/Scene3D';
import Features from '../components/Features';
import Constellations from '../components/Constellations';
import { ethers } from 'ethers';
import { signNebulaRegistration } from '../components/SignMessage';

// Add this CSS class to the button elements:
const ctaButtonClass = `
  px-8 py-4 text-lg font-bold rounded-lg
  transform transition-all duration-300
  shadow-[0_0_15px_rgba(139,92,246,0.5)]
  hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]
  hover:scale-105 hover:-translate-y-1
  active:scale-95
`;

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [availableWallets, setAvailableWallets] = useState([]);

  useEffect(() => {
    // Check available wallets
    const checkWallets = () => {
      const wallets = [];
      if (typeof window.ethereum !== 'undefined') {
        if (window.ethereum.isMetaMask) {
          wallets.push('metamask');
        }
        if (window.ethereum.isCoreWallet) {
          wallets.push('core');
        }
      }
      setAvailableWallets(wallets);
    };

    checkWallets();
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  const connectWallet = async (walletType) => {
    try {
      let provider;
      if (walletType === 'core' && window.ethereum.isCoreWallet) {
        provider = window.ethereum;
      } else if (walletType === 'metamask' && window.ethereum.isMetaMask) {
        provider = window.ethereum;
      } else {
        throw new Error('Selected wallet not available');
      }

      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setIsWalletConnected(true);
      setStatus({ type: 'success', message: 'Wallet connected successfully!' });
    } catch (error) {
      console.error('Wallet connection error:', error);
      setStatus({ 
        type: 'error', 
        message: error.message === 'Selected wallet not available' 
          ? `Please install ${walletType === 'metamask' ? 'MetaMask' : 'Core Wallet'} to connect.`
          : 'Failed to connect wallet. Please try again.'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // First sign the message with the smart contract
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setStatus({ type: 'info', message: 'Please sign the registration message...' });
      
      await signNebulaRegistration(signer);
      
      // Then submit the registration
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, walletAddress }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Registration successful! Welcome to Nebula.' });
        setEmail('');
        setWalletAddress('');
        setIsWalletConnected(false);
        setTimeout(() => setIsModalOpen(false), 3000);
      } else {
        setStatus({ type: 'error', message: data.message || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setStatus({ 
        type: 'error', 
        message: error.message || 'An error occurred during registration. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient">
      <div className="grid-pattern">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Scene3D />
          </div>
          
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <motion.h1 
              className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-text mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Nebula
            </motion.h1>
            <motion.p 
              className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A decentralized platform for intellectual property trading, research project funding, and community governance on Avalanche
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-x-6"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className={`${ctaButtonClass} bg-primary text-white`}
              >
                Get Started
              </button>
              <Link
                href="/docs"
                className={`${ctaButtonClass} border-2 border-primary text-white hover:bg-primary/10`}
              >
                Whitepaper
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section-spacing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-text">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-effect p-6 rounded-lg hover-scale">
                <h3 className="text-xl font-semibold mb-4">IP Marketplace</h3>
                <p className="text-gray-300">
                  Trade intellectual property rights as NFTs with support for full ownership transfers and time-limited licensing. Transparent pricing and ownership history.
                </p>
              </div>
              <div className="glass-effect p-6 rounded-lg hover-scale">
                <h3 className="text-xl font-semibold mb-4">Research Project Funding</h3>
                <p className="text-gray-300">
                  Launch research projects with milestone-based funding, Chainlink oracle integration, and secure fund management through escrow.
                </p>
              </div>
              <div className="glass-effect p-6 rounded-lg hover-scale">
                <h3 className="text-xl font-semibold mb-4">NEBL Token & Staking</h3>
                <p className="text-gray-300">
                  Flexible staking periods with up to 15% APR for 365-day locks. Governance rights through ERC20Votes implementation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Constellations side="left" />
        <Constellations side="right" />

        {/* Tokenomics Section */}
        <section id="tokenomics" className="section-spacing glass-effect">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-text">Token Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">NEBL Token</h3>
                <p className="text-gray-300">
                  Total Supply: 100,000,000 NEBL
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>40% - Community & Ecosystem</li>
                  <li>20% - Initial Liquidity</li>
                  <li>15% - Team & Advisors (vested)</li>
                  <li>15% - Research Project Funding Pool</li>
                  <li>10% - DAO Treasury</li>
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Platform Features</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Token Swap with 0.3% fee</li>
                  <li>Dynamic pricing using Chainlink</li>
                  <li>Automated liquidity management</li>
                  <li>Governance through NebulaDAO</li>
                  <li>Emergency pause functionality</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Architecture */}
        <section id="architecture" className="section-spacing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-text">Technical Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-effect p-6 rounded-lg hover-scale">
                <h3 className="text-xl font-semibold mb-4">Smart Contracts</h3>
                <p className="text-gray-300">
                  Built with OpenZeppelin standards, featuring comprehensive testing and security measures including reentrancy protection and role-based access.
                </p>
              </div>
              <div className="glass-effect p-6 rounded-lg hover-scale">
                <h3 className="text-xl font-semibold mb-4">Frontend Stack</h3>
                <p className="text-gray-300">
                  React-based responsive interface with Web3 integration for wallet connectivity and real-time price feeds.
                </p>
              </div>
              <div className="glass-effect p-6 rounded-lg hover-scale">
                <h3 className="text-xl font-semibold mb-4">Networks</h3>
                <p className="text-gray-300">
                  Deployed on Avalanche C-Chain for mainnet and Avalanche Fuji for testnet operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section-spacing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-text">FAQ</h2>
            <div className="space-y-8">
              <div className="glass-effect p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">What is Nebula?</h3>
                <p className="text-gray-300">
                  A decentralized platform that combines IP marketplace functionality with research funding mechanisms and DAO governance, built on the Avalanche network.
                </p>
              </div>
              <div className="glass-effect p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">How does staking work?</h3>
                <p className="text-gray-300">
                  Stake NEBL tokens for flexible periods between 7-365 days. Earn base APR of 5% with additional bonuses up to 15% for longer lock periods.
                </p>
              </div>
              <div className="glass-effect p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">How is research funding managed?</h3>
                <p className="text-gray-300">
                  Research funding is milestone-based with Chainlink oracle integration for verification. Funds are managed through a secure escrow system with built-in dispute resolution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />

        {/* Registration Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              className="relative glass-effect p-8 rounded-lg max-w-md w-full mx-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setIsModalOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-2xl font-bold mb-4">Join Nebula</h3>
              <p className="text-gray-300 mb-6">
                Sign up and register your interest in Nebula.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
                  required
                />
                <div className="space-y-2">
                  {isWalletConnected ? (
                    <div className="flex items-center justify-between px-4 py-2 bg-black/30 border border-gray-700 rounded-lg">
                      <span className="text-gray-300 truncate">{walletAddress}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setWalletAddress('');
                          setIsWalletConnected(false);
                        }}
                        className="text-sm text-red-400 hover:text-red-300"
                      >
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {availableWallets.length > 0 ? (
                        <>
                          {availableWallets.includes('metamask') && (
                            <button
                              type="button"
                              onClick={() => connectWallet('metamask')}
                              className="w-full px-4 py-2 bg-black/30 border border-primary rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center space-x-2"
                            >
                              <img src="/metamask-logo.svg" alt="MetaMask" className="w-6 h-6" />
                              <span>Connect with MetaMask</span>
                            </button>
                          )}
                          {availableWallets.includes('core') && (
                            <button
                              type="button"
                              onClick={() => connectWallet('core')}
                              className="w-full px-4 py-2 bg-black/30 border border-primary rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center space-x-2"
                            >
                              <img src="/core-logo.svg" alt="Core Wallet" className="w-6 h-6" />
                              <span>Connect with Core Wallet</span>
                            </button>
                          )}
                        </>
                      ) : (
                        <div className="text-center text-gray-300">
                          <p>No supported wallets detected.</p>
                          <div className="mt-2 space-x-4">
                            <a
                              href="https://metamask.io/download/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              Install MetaMask
                            </a>
                            <span>or</span>
                            <a
                              href="https://www.coredao.org/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              Install Core Wallet
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {status.message && (
                  <p className={`text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {status.message}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !email || !isWalletConnected}
                  className={`${ctaButtonClass} w-full bg-primary text-white ${
                    (isSubmitting || !email || !isWalletConnected) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Registering...' : 'Get Early Access'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}