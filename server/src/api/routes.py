from fastapi import APIRouter, HTTPException
from ..services.airtable_service import AirtableService
from typing import Dict, List

router = APIRouter()
airtable_service = AirtableService()

@router.post("/records/")
async def create_record(data: Dict):
    try:
        result = await airtable_service.create_record(data)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/records/")
async def get_records():
    try:
        records = await airtable_service.get_records()
        return {"status": "success", "data": records}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/records/{record_id}")
async def update_record(record_id: str, data: Dict):
    try:
        result = await airtable_service.update_record(record_id, data)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/records/{record_id}")
async def delete_record(record_id: str):
    try:
        result = await airtable_service.delete_record(record_id)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
