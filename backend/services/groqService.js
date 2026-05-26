const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

// Check if OpenAI API key is configured
const hasOpenAIKey = process.env.OPENAI_API_KEY && 
                     process.env.OPENAI_API_KEY !== 'your_openai_api_key_here' &&
                     process.env.OPENAI_API_KEY.startsWith('sk-');

// Check if Groq API key is configured (legacy)
const hasGroqKey = process.env.GROQ_API_KEY && 
                   process.env.GROQ_API_KEY !== 'your_groq_api_key_here' &&
                   process.env.GROQ_API_KEY.startsWith('gsk_');

const openai = hasOpenAIKey ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

/**
 * Extract expense details from receipt image using Groq Vision API
 * @param {string} imagePath - Path to the uploaded image
 * @returns {Promise<Object>} - Extracted expense details
 */
async function extractExpenseFromReceipt(imagePath) {
  try {
    // Check if OpenAI API is configured
    if (!hasOpenAIKey) {
      throw new Error('OPENAI_API_KEY_NOT_CONFIGURED: Please add your OpenAI API key to backend/.env file. Get a key at https://platform.openai.com/api-keys');
    }

    // Read image file and convert to base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = getMimeType(imagePath);

    // Create prompt for OpenAI
    const prompt = `Analyze this receipt/bill image and extract the following information. Return ONLY a valid JSON object with no additional text:

{
  "amount": <total amount as number>,
  "merchant": "<merchant/store name>",
  "category": "<one of: Food & Dining, Transportation, Shopping, Entertainment, Bills & Utilities, Healthcare, Education, Travel, Groceries, Other>",
  "date": "<date in YYYY-MM-DD format, use today's date if not visible>",
  "paymentMethod": "<one of: Cash, Credit Card, Debit Card, UPI, Net Banking, Other>",
  "description": "<brief description of items purchased>"
}

Important:
- Extract the TOTAL amount (not individual items)
- Choose the most appropriate category
- If date is not visible, use today's date
- If payment method is not clear, use "Other"
- Be accurate with the amount
- Return ONLY the JSON object, no other text`;

    // Call OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 500,
      temperature: 0.1
    });

    const responseText = response.choices[0]?.message?.content || '';
    
    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from AI response');
    }

    const extractedData = JSON.parse(jsonMatch[0]);
    
    // Validate and sanitize data
    return {
      amount: parseFloat(extractedData.amount) || 0,
      merchant: extractedData.merchant || 'Unknown',
      category: validateCategory(extractedData.category),
      date: extractedData.date || new Date().toISOString().split('T')[0],
      paymentMethod: validatePaymentMethod(extractedData.paymentMethod),
      description: extractedData.description || ''
    };

  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error(`Failed to extract expense details: ${error.message}`);
  }
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif'
  };
  return mimeTypes[ext] || 'image/jpeg';
}

function validateCategory(category) {
  const validCategories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment',
    'Bills & Utilities', 'Healthcare', 'Education', 'Travel', 'Groceries', 'Other'
  ];
  return validCategories.includes(category) ? category : 'Other';
}

function validatePaymentMethod(method) {
  const validMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Other'];
  return validMethods.includes(method) ? method : 'Other';
}

module.exports = { extractExpenseFromReceipt };
