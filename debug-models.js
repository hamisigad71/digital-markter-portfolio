const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        const flash = data.models.find(m => m.name.includes('gemini-1.5-flash'));
        console.log('FLASH MODEL:', JSON.stringify(flash, null, 2));

        const pro = data.models.find(m => m.name.includes('gemini-1.5-pro'));
        console.log('PRO MODEL:', JSON.stringify(pro, null, 2));

        const geminis = data.models.filter(m => m.name.includes('gemini'));
        console.log('ALL GEMINIS:', geminis.map(m => m.name));
    } catch (error) {
        console.error('Error:', error);
    }
}

listModels();
