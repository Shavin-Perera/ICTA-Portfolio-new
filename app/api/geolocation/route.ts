// app/api/geolocation/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.IPGEOLOCATION_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }
    
    // Get client IP from request headers
    const clientIp = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    req.ip || 
                    '';
    
    // Handle multiple IPs in x-forwarded-for
    const realClientIp = clientIp.split(',')[0].trim();
    
    // For local development, use a test IP if needed
    const testIp = process.env.NODE_ENV === 'development' ? '&ip=8.8.8.8' : '';
    
    // Build API URL with client IP
    //const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}${realClientIp ? `&ip=${realClientIp}` : testIp}`;
    
     const response = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=6cc039e652104acf89d8b1ecb6d3e9cf");
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Geolocation API error: ${response.statusText}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    // Return country information
    return NextResponse.json({ 
      countryCode: data.country_code2,
      countryName: data.country_name
    });
    
  } catch (error) {
    console.error('Geolocation API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch location data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}