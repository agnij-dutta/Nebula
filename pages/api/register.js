import fs from 'fs';
import path from 'path';
import emailjs from '@emailjs/nodejs';

// Initialize EmailJS with both private and public keys
emailjs.init({
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
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

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Path to registrations file
    const filePath = path.join(dataDir, 'registrations.json');

    // Read existing registrations
    let registrations = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      registrations = JSON.parse(fileContent);
    }

    // Check if email or wallet already exists
    if (registrations.some(reg => reg.email === email)) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    if (registrations.some(reg => reg.walletAddress === walletAddress)) {
      return res.status(400).json({ message: 'Wallet address already registered' });
    }

    // Add new registration
    const timestamp = new Date().toISOString();
    registrations.push({
      email,
      walletAddress,
      timestamp
    });

    // Save updated registrations
    fs.writeFileSync(filePath, JSON.stringify(registrations, null, 2));

    // Send notification email
    try {
      const templateParams = {
        from_name: email.split('@')[0],
        from_email: email,
        wallet_address: walletAddress,
        reply_to: email,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        }
      );
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't return error to client, as registration was successful
    }

    // Send success response
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 