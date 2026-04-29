import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { prompt, type } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'AI API Key not configured. Please add GOOGLE_GENERATIVE_AI_API_KEY to .env.local' 
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    console.log('Generating content for:', type, 'with prompt:', prompt);

    const systemPrompt = type === 'project' 
      ? `You are an AI assistant helping a digital marketer fill out a project case study form.
         Based on the user's prompt, generate a JSON object with the following fields:
         - title: A professional project title.
         - slug: A URL-friendly slug.
         - category: One of ["Marketing", "Development", "Design", "SEO", "Content", "Social Media"].
         - description: A short, engaging project description.
         - challenge: A detailed description of the problem that needed solving.
         - solution: How the project solved the problem.
         - results: Measurable outcomes.
         Return ONLY the JSON object, no markdown, no explanation.`
      : `You are an AI assistant helping a digital marketer write a blog post.
         Based on the user's prompt, generate a JSON object with the following fields:
         - title: A catchy blog post title.
         - excerpt: A short summary of the article.
         - category: One of ["Analytics", "SEO", "PPC", "Content", "Social Media", "Strategy", "Design", "Email", "Other"].
         - readTime: Estimated read time (e.g., "5 min read").
         - author: Use "Hamisi".
         Return ONLY the JSON object, no markdown, no explanation.`;

    const result = await model.generateContent(`${systemPrompt}\n\nUser Prompt: ${prompt}`);
    const response = await result.response;
    let resultText = response.text();
    
    if (!resultText) {
      return NextResponse.json({ error: 'No content generated' }, { status: 500 });
    }

    // Robust JSON parsing: remove markdown code blocks if present
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      resultText = jsonMatch[0];
    }

    return NextResponse.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error('API Error:', error);
    // Log more specific error info if available
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    return NextResponse.json({ error: message }, { status });
  }
}
