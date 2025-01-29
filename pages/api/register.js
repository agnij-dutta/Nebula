import { Redis } from '@upstash/redis'

// Initialize Redis with the provided credentials
const redis = new Redis({
  url: 'https://current-grizzly-59539.upstash.io',
  token: 'AeiTAAIjcDFjYzQ3ZTZjZDY0OGE0YjQ4OTEwZGVmNGQ5NDk2ZDYyMXAxMA'  // Using the full access token for write operations
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Test Redis connection
    const testConnection = await redis.ping();
    console.log('Redis connection test:', testConnection);

    const { email, walletAddress } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (!walletAddress) {
      return res.status(400).json({ message: 'Wallet address is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    console.log('Checking for existing email:', email);
    // Check if email already exists
    const existingEmail = await redis.get(`email:${email}`);
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    console.log('Checking for existing wallet:', walletAddress);
    // Check if wallet already exists
    const existingWallet = await redis.get(`wallet:${walletAddress}`);
    if (existingWallet) {
      return res.status(400).json({ message: 'Wallet address already registered' });
    }

    // Store the registration with a timestamp
    const timestamp = new Date().toISOString();
    const registrationData = {
      email,
      walletAddress,
      timestamp
    };

    console.log('Storing registration data:', registrationData);

    try {
      // Store data with both email and wallet address as keys for quick lookups
      await redis.set(`email:${email}`, JSON.stringify(registrationData));
      await redis.set(`wallet:${walletAddress}`, JSON.stringify(registrationData));
      
      // Add to the list of all registrations
      await redis.lpush('all_registrations', JSON.stringify(registrationData));
      
      // Increment registration counter
      await redis.incr('registration_count');

      console.log('Successfully stored registration data');
    } catch (storageError) {
      console.error('Storage error:', storageError);
      throw storageError;
    }

    // Return success response
    return res.status(200).json({ 
      message: 'Registration successful!',
      timestamp
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      message: 'An error occurred during registration. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}