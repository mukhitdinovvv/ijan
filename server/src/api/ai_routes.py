from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from ..services.ai_service import chat_with_ai

router = APIRouter(prefix="/api/ai", tags=["ai"])

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

@router.post("/chat")
def chat_endpoint(request: ChatRequest):
    reply = chat_with_ai([m.dict() for m in request.messages])
    return {"reply": reply}
