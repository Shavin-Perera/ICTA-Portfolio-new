// app/api/greeting/route.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { country } = await req.json();

    // Validate input
    if (!country || typeof country !== 'string') {
      console.error('Invalid country input:', country);
      return NextResponse.json(
        { error: 'Country name is required' },
        { status: 400 }
      );
    }

    console.log('Generating greeting for:', country);
    
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Dynamically import OpenAI
    const { default: OpenAI } = await import('openai');
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Enhanced prompt with strict requirements
    const prompt = `Generate a warm, welcoming traditional greeting for visitors from ${country}. 
                   Respond ONLY with the greeting TRANSLITERATED INTO ENGLISH LETTERS (3-5 words maximum). 
                   Use ONLY Latin characters - NO native scripts or special characters. This greeting message is used in freelancers website of ${country} to welcome visitors.
                   Make it creative and culturally appropriate.
                   Example for France: "Bonjour! Prêt à innover?" 
                   Example for Japan: "Konnichiwa! Excited to build with you" 
                   Example for Sri Lanka: "'Ayubowan! Ready to create?'" 
                   Example for Thailand: "Sawasdee! Ready for digital magic?" 
                   Example for India: "'Namaste! Let\'s innovate together"`;

    console.log('Sending prompt to OpenAI:', prompt);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a cultural expert that provides warm, welcoming traditional greetings. Respond ONLY with the greeting transliterated into English letters." 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      max_tokens: 20,
      temperature: 0.7, // Higher temperature for more creativity
    });

    console.log('OpenAI response:', completion);
    
    let greeting = completion.choices[0].message.content?.trim() || "";
    
    // Clean up response - ensure only English characters
    greeting = greeting
      .replace(/[^a-zA-Z\s]/g, '')  // Remove non-English characters
      .replace(/^["']|["']$/g, '')   // Remove quotes
      .split('\n')[0]                // Take first line only
      .trim();
    
    // Ensure greeting is not empty
    if (!greeting) {
      console.error('Empty greeting generated');
      return NextResponse.json(
        { error: 'Failed to generate greeting' },
        { status: 500 }
      );
    }

    // Capitalize first letter for better presentation
    greeting = greeting.charAt(0).toUpperCase() + greeting.slice(1);

    console.log('Generated greeting:', greeting);
    
    return NextResponse.json({ greeting });
    
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback to English greeting
    return NextResponse.json({ greeting: 'Welcome!' });
  }
}