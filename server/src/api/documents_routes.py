from fastapi import APIRouter, HTTPException
from ..services.documents_service import DocumentsService
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/documents", tags=["documents"])
documents_service = DocumentsService()

class DocumentBase(BaseModel):
    title: str
    description: str
    file_url: str
    category: Optional[str] = None
    tags: Optional[List[str]] = []

class DocumentCreate(DocumentBase):
    pass

class DocumentUpdate(DocumentBase):
    pass

class Document(DocumentBase):
    id: str
    created_at: str

@router.get("/")
async def get_all_documents():
    try:
        print("GET /api/documents called")
        documents = await documents_service.get_all_documents()
        print(f"Found {len(documents)} documents")
        return documents
    except Exception as e:
        print(f"Error in get_all_documents: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/category/{category}", response_model=List[Document])
async def get_documents_by_category(category: str):
    try:
        return await documents_service.get_documents_by_category(category)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{document_id}", response_model=Document)
async def get_document(document_id: str):
    try:
        document = await documents_service.get_document_by_id(document_id)
        if not document:
            raise HTTPException(status_code=404, detail="Document not found")
        return document
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=Document)
async def create_document(document: DocumentCreate):
    try:
        return await documents_service.create_document(document.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{document_id}", response_model=Document)
async def update_document(document_id: str, document: DocumentUpdate):
    try:
        updated_document = await documents_service.update_document(document_id, document.dict())
        if not updated_document:
            raise HTTPException(status_code=404, detail="Document not found")
        return updated_document
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{document_id}")
async def delete_document(document_id: str):
    try:
        return await documents_service.delete_document(document_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
