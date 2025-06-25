from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..services.bullying_service import BullyingService
from ..models.bullying_report import BullyingReport, BullyingReportUpdate

router = APIRouter(prefix="/api/bullying", tags=["bullying"])
bullying_service = BullyingService()

@router.post("/report")
async def create_bullying_report(report: BullyingReport):
    """Создать новый отчет о буллинге"""
    try:
        result = await bullying_service.create_report(report)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/reports")
async def get_reports(status: Optional[str] = Query(None, description="Фильтр по статусу")):
    """Получить все отчеты или отфильтровать по статусу"""
    try:
        if status:
            reports = await bullying_service.get_reports_by_status(status)
        else:
            reports = await bullying_service.get_all_reports()
        return {"status": "success", "data": reports}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/report/{report_id}")
async def get_report(report_id: str):
    """Получить конкретный отчет по ID"""
    try:
        report = await bullying_service.get_report(report_id)
        if not report:
            raise HTTPException(status_code=404, detail="Отчет не найден")
        return {"status": "success", "data": report}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/report/{report_id}")
async def update_report(report_id: str, update_data: BullyingReportUpdate):
    """Обновить статус отчета"""
    try:
        result = await bullying_service.update_report(report_id, update_data)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/report/{report_id}")
async def delete_report(report_id: str):
    """Удалить отчет"""
    try:
        result = await bullying_service.delete_report(report_id)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
