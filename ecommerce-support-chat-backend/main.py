from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

# Configuration
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("❌ GEMINI_API_KEY not found in environment variables. Please set it in .env file")
MODEL_NAME = "gemini-flash-latest"

genai.configure(api_key=API_KEY)

# System Prompt
SYSTEM_PROMPT = """
You are a professional customer support assistant for a demo e-commerce platform.

This is a demonstration project.
There is no database and no real customer data.

Your role is to answer general customer support questions such as:
- Order tracking (general steps, not specific orders)
- Returns and refunds policy
- Payment issues (general guidance)
- Account problems (login, password reset)
- Shipping information
- Product-related questions (general)

Rules you must follow:
- Be polite, friendly, and professional
- Use clear and simple language
- Keep answers short and useful
- Do NOT ask for or generate personal data (order number, email, address)
- Do NOT pretend to access a database or user account
- If a question requires personal data, explain the general process instead
- Ask follow-up questions only when necessary
- **IMPORTANT**: Format your responses using Markdown. Use bullet points (-), bold text (**text**), and numbered lists (1.) to make the information easy to read and organized.

Platform rules:
- Orders can be tracked via "My Account → My Orders"
- Products can be returned within 14 days after delivery
- Refunds take 5 to 7 business days
- Password reset is available through the "Forgot Password" page
- Customer support is available 24/7

If the user asks something outside this scope, politely explain that this is a demo support chatbot.

Always respond as a real e-commerce customer support agent.

Example behavior:
User: Where is my order?
Chatbot: I cannot access specific orders 😊 However, you can track your order by going to My Account → My Orders and clicking on “Track order”.

User: I want to return a product.
Chatbot: No problem 👍 Returns are possible within 14 days after delivery. Just go to My Account → My Orders and select “Return product”.

Important for interview context:
If asked about technical limitations, you can mention: "For this demo, I voluntarily removed the database to focus on conversational logic, AI integration, and full-stack architecture."
"""

app = FastAPI()

# CORS - Allow frontend to connect
origins = [
    "http://localhost:5173", # Vite default
    "http://localhost:3000",
    "https://*.vercel.app",  # Vercel deployments
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For demo purposes, allow all. In prod, restrict.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model initialization
model = genai.GenerativeModel(MODEL_NAME, system_instruction=SYSTEM_PROMPT)
chat = model.start_chat(history=[])

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        response = chat.send_message(request.message)
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/chat")
def chat_info():
    return {"message": "This endpoint expects a POST request with a JSON body: {'message': 'your message'}"}

@app.get("/")
def read_root():

    return {"message": "E-commerce Support Chatbot API is running"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
