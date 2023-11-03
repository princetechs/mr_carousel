import { NextRequest } from 'next/server';

// Define the response message format
interface ResponseMessage {
  role: string;
  content: string;
}


export async function GET(request: Request) {

  return Response.json({
    role: 'string',
    content: 'string'
  });
}