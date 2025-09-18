import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import twilio from 'twilio';

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Function to format menu items for WhatsApp
function formatMenuForWhatsApp(formData: any): string {
  let message = `*New Menu Selection*\n\n`;
  message += `*Customer Details:*\n`;
  message += `Name: ${formData.name}\n`;
  message += `Email: ${formData.email}\n`;
  message += `Phone: ${formData.phone}\n\n`;
  
  message += `*Selected Menu Items:*\n`;
  
  for (const [category, items] of Object.entries(formData.selectedMenu)) {
    if (Array.isArray(items) && items.length > 0) {
      message += `\n*${category}:*\n`;
      items.forEach((item: string) => {
        message += `• ${item}\n`;
      });
    }
  }
  
  message += `\nSubmitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
  
  return message;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Save to MongoDB with better error handling
    console.log('Attempting to connect to MongoDB...');
    const client = await clientPromise;
    console.log('MongoDB connection successful');
    
    const db = client.db();
    const collection = db.collection('inquiries');
    
    console.log('Inserting document into MongoDB...');
    const result = await collection.insertOne({
      ...body,
      submittedAt: new Date(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    });
    console.log('Document inserted successfully:', result.insertedId);
    
    // Send WhatsApp message
    try {
      if (process.env.TWILIO_ACCOUNT_SID && 
          process.env.TWILIO_AUTH_TOKEN && 
          process.env.TWILIO_WHATSAPP_FROM && 
          process.env.WHATSAPP_TO_NUMBER) {
        
        console.log('Sending WhatsApp message with verified numbers...');
        const whatsappMessage = formatMenuForWhatsApp(body);
        
        const message = await twilioClient.messages.create({
          from: process.env.TWILIO_WHATSAPP_FROM,
          to: process.env.WHATSAPP_TO_NUMBER,
          body: whatsappMessage,
        });
        
        console.log('WhatsApp message sent successfully, SID:', message.sid);
      } else {
        console.log('WhatsApp credentials not properly configured');
      }
    } catch (whatsappError: any) {
      console.error('WhatsApp sending failed:', whatsappError.message);
      console.error('Error code:', whatsappError.code);
      
      // Don't fail the entire request if WhatsApp fails
      // The form submission should still succeed
    }
    
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
}
