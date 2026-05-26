const express = require('express');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();

// Get current API key status
router.get('/api-keys', auth, async (req, res) => {
  try {
    const envPath = path.join(__dirname, '../.env');
    const envContent = fs.readFileSync(envPath, 'utf8');

    const hasOpenAI = envContent.includes('OPENAI_API_KEY=sk-') || 
                      (process.env.OPENAI_API_KEY && 
                       process.env.OPENAI_API_KEY !== 'your_openai_api_key_here' &&
                       process.env.OPENAI_API_KEY.startsWith('sk-'));

    const hasGroq = envContent.includes('GROQ_API_KEY=gsk_') ||
                    (process.env.GROQ_API_KEY && 
                     process.env.GROQ_API_KEY !== 'your_groq_api_key_here' &&
                     process.env.GROQ_API_KEY.startsWith('gsk_'));

    res.json({
      hasOpenAI,
      hasGroq
    });
  } catch (error) {
    console.error('Error checking API keys:', error);
    res.status(500).json({ message: 'Failed to check API keys' });
  }
});

// Save API keys
router.post('/api-keys', auth, async (req, res) => {
  try {
    const { openaiKey, groqKey } = req.body;

    if (!openaiKey && !groqKey) {
      return res.status(400).json({ message: 'Please provide at least one API key' });
    }

    const envPath = path.join(__dirname, '../.env');
    let envContent = fs.readFileSync(envPath, 'utf8');

    // Update OpenAI key if provided
    if (openaiKey && openaiKey.trim()) {
      if (!openaiKey.startsWith('sk-')) {
        return res.status(400).json({ message: 'Invalid OpenAI API key format. Should start with sk-' });
      }

      if (envContent.includes('OPENAI_API_KEY=')) {
        envContent = envContent.replace(
          /OPENAI_API_KEY=.*/,
          `OPENAI_API_KEY=${openaiKey.trim()}`
        );
      } else {
        envContent += `\nOPENAI_API_KEY=${openaiKey.trim()}`;
      }
    }

    // Update Groq key if provided
    if (groqKey && groqKey.trim()) {
      if (!groqKey.startsWith('gsk_')) {
        return res.status(400).json({ message: 'Invalid Groq API key format. Should start with gsk_' });
      }

      if (envContent.includes('GROQ_API_KEY=')) {
        envContent = envContent.replace(
          /GROQ_API_KEY=.*/,
          `GROQ_API_KEY=${groqKey.trim()}`
        );
      } else {
        envContent += `\nGROQ_API_KEY=${groqKey.trim()}`;
      }
    }

    // Write updated content
    fs.writeFileSync(envPath, envContent);

    // Update process.env
    if (openaiKey && openaiKey.trim()) {
      process.env.OPENAI_API_KEY = openaiKey.trim();
    }
    if (groqKey && groqKey.trim()) {
      process.env.GROQ_API_KEY = groqKey.trim();
    }

    res.json({
      message: 'API keys saved successfully! Please restart the backend server for changes to take effect.',
      needsRestart: true
    });
  } catch (error) {
    console.error('Error saving API keys:', error);
    res.status(500).json({ message: 'Failed to save API keys' });
  }
});

module.exports = router;
