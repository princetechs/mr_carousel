import { NextRequest } from 'next/server';
import OpenAI from 'openai'; // Import OpenAI


// Define the request body interface
interface RequestBody {
        topic: string;
        slides: number;
        // Add other expected properties from the request body
}

// Define the response message format
interface ResponseMessage {
        role: string;
        content: string;
}
// Create an instance of the OpenAIApi class with type declarations
const openaiApi = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req: NextRequest) {
        const bodyText = await req.text();
        const jsonconvert: RequestBody = JSON.parse(bodyText);
        if (!jsonconvert.topic) {
                return new Response('Invalid input data. The "topic" field is empty.', { status: 400 });
        }

        if (jsonconvert.slides < 3 || jsonconvert.slides > 10) {
                return new Response('Invalid input data. "slides" should be between 3 and 10.', { status: 400 });
        }

        const messages: any = [

                {
                        role: "user",
                        content: `JSON Response Only
                        Role: Conversational LinkedIn content creator
                        Task: Create a LinkedIn carousel on ${jsonconvert.topic} with a total of ${jsonconvert.slides} slides.
                        * Include image prompts for each slide.
                        * Add slide titles, content examples, and a unique emoji per slide.
                        Additional Task:
                        * Craft a catchy carousel description with emojis and up to 4 related tags.
                        Example Format:
                        json
                        
                        { "LinkedIn_Carousel": { "topic": "top tourist places", "totalSlide": "4", "description": "best places to visit in India", "emoji": "😊", "Slides": [ { "sldnum": 1, "type": "intro", "title": "explore Incredible India", "content": "Discover Top 5 Tourist Places", "emoji": "💡" }, { "sldnum": 2, "type": "content", "title": "Jaipur", "Image": "majestic Amber Fort", "content": "Experience Rajasthan's royal heritage.", "emoji": "🤴" }, { "sldnum": 3, "type": "content", "title": "Varanasi", "Image": "Ganges River view", "content": "Immerse in spirituality by the sacred river.", "emoji": "😱" }, { "sldnum": 4, "type": "outer", "title": "Share Favourites", "content": "Which places have you visited? Comment below!", "emoji": "😊" } ] } }
                        Provide the JSON details promptly without additional explanations or unrelated details.`
                },
        ];

        const response = await openaiApi.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages,
                max_tokens: 2000, // Adjust the maximum number of tokens as needed
        });


        // Respond to the client with the OpenAI API response
        return Response.json(response);
}
