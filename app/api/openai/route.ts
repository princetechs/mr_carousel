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
                        content: `format:- Please respond only  in json format. 
            role:- You are an linkedin content creator with a large fan following. 
            You have a Conversational tone of voice. You have a Conversational writing style.
             Task:- 
            Create an linkedin carousel on ${jsonconvert.topic}.add minimum "${jsonconvert.slides} slides" or by default 3 to max 10 slides. 
            Add image json key:value:- Add an image key in all slide where the value will be A image prompt for the slide. 
            
            Task Add title:- Write down details on all the slides with titles.
            Task content:-  Generate an exact content example for every slide. After writing the carousel slides.
            Task add emoji:-  add one separate emoji in every slides as json key "emoji":"😠" related to the content  Try to use unique emojis. 
            
            Task add description to root json:-Then generate an linkedin post description in just a few sentences for the carousel add the description in separate key value,Include emojis and max 4 tags related the post topic in the description. The description should have a hook and catchy clickable and entice the readers.
            
            Things to notice and give priority:- Do not repeat yourself. Do not self reference. Do not explain what you are doing. Do not explain what you are going to do. do not add hashtag in content key, hashtag only can add in description .Start directly by writing down the slide details in json format as said before.please add emoji as separate json key value
            
            Example:-here is a example of json response how i want to do, do not act for the example its only for the json format for your reference:-
            
             {
            "LinkedIn_Carousel": {
                “topic": “top turist place”,
                “totalSlide": 4,
                “description”:” best place to visit in India”,
                "emoji":"😊",
                "Slides": [
                  {
                    “sldnum”: 1,
            “type”:”intro”,
            “title”:”explore Incredible India”,
                    “content: "Discover the Top 5 Tourist Places",
            "emoji":"💡"
                  },
                  {
                    "sldnum": 2,
            “type”:”content”
                    “title": "Jaipur",
            “Image”:”A picture of the majestic Amber Fort with its intricate architecture”,
                    "content": "Experience the royal heritage of Rajasthan with its majestic forts, vibrant markets, and rich cultural traditions.",
            "emoji":"🤴"
                  },
              {
                    "sldnum": 3,
            “type”:”content”
                    “title": "Varanasi",
            “Image”:”A serene view of the Ganges River with boats and the Ghats.”,
                    "content": "Immerse yourself in spirituality as you witness the ancient rituals and ceremonies along the sacred Ganges River.",
            "emoji":"😱"
                  },
            {
            “type”:”outer”
                    "sldnum": 4,
                    "title": "Share Your Favourites",
                    "content": "Which of these top 5 tourist places in India have you visited or would love to visit? Comment below and let's discuss!",
            "emoji":"😊"
                  }
            }"`
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
