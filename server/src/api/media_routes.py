from fastapi import APIRouter, HTTPException
from ..services.media_service import MediaService
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/media", tags=["media"])
media_service = MediaService()

class MediaBase(BaseModel):
    title: str
    description: str
    media_url: str
    type: str  # 'video' или 'audio'
    duration: Optional[float] = 0
    tags: Optional[List[str]] = []

class MediaCreate(MediaBase):
    pass

class MediaUpdate(MediaBase):
    pass

class Media(MediaBase):
    id: str
    created_at: str

@router.get("/")
async def get_all_media():
    try:
        print("GET /api/media called")
        media = await media_service.get_all_media()
        print(f"Found {len(media)} media items")
        return media
    except Exception as e:
        print(f"Error in get_all_media: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/type/{media_type}", response_model=List[Media])
async def get_media_by_type(media_type: str):
    if media_type not in ["video", "audio"]:
        raise HTTPException(status_code=400, detail="Invalid media type. Must be 'video' or 'audio'")
    try:
        return await media_service.get_media_by_type(media_type)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{media_id}", response_model=Media)
async def get_media(media_id: str):
    try:
        media = await media_service.get_media_by_id(media_id)
        if not media:
            raise HTTPException(status_code=404, detail="Media not found")
        return media
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=Media)
async def create_media(media: MediaCreate):
    if media.type not in ["video", "audio"]:
        raise HTTPException(status_code=400, detail="Invalid media type. Must be 'video' or 'audio'")
    try:
        return await media_service.create_media(media.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{media_id}", response_model=Media)
async def update_media(media_id: str, media: MediaUpdate):
    if media.type not in ["video", "audio"]:
        raise HTTPException(status_code=400, detail="Invalid media type. Must be 'video' or 'audio'")
    try:
        updated_media = await media_service.update_media(media_id, media.dict())
        if not updated_media:
            raise HTTPException(status_code=404, detail="Media not found")
        return updated_media
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{media_id}")
async def delete_media(media_id: str):
    try:
        return await media_service.delete_media(media_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
