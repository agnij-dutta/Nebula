import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveItem('#' + section.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Web3', href: '#business-model' },
    { name: 'Advanced', href: '#advanced-features' },
    { name: 'Community', href: '#community' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 glass-effect' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="hover-scale">
            <Logo size={48} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-xl font-bold transition-all duration-300 hover-scale tracking-wide ${
                  activeItem === item.href
                    ? 'text-white bg-gradient-text px-4 py-2 rounded-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg'
                }`}
              >
                {item.name}
              </a>
            ))}
            <Link
              href="/docs"
              className="px-8 py-4 border-2 border-primary rounded-lg text-white font-bold hover:bg-primary/10 transition-all duration-300 hover-scale text-xl tracking-wide"
            >
              Documentation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-3 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-10 h-10"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-6"
          >
            <div className="flex flex-col space-y-4 pb-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-xl font-bold py-3 px-6 rounded-lg transition-colors tracking-wide ${
                    activeItem === item.href
                      ? 'bg-primary/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Link
                href="/docs"
                className="text-xl font-bold px-8 py-4 border-2 border-primary rounded-lg text-white hover:bg-primary/10 transition-colors text-center tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                Documentation
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
} 