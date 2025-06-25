from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class BullyingReport(BaseModel):
    school_name: str
    bullying_type: str
    description: str
    victim_name: Optional[str] = None
    status: str = "new"  # new, in_progress, resolved, archived
    created_at: str = datetime.now().strftime('%Y-%m-%d')
    updated_at: str = datetime.now().strftime('%Y-%m-%d')

class BullyingReportUpdate(BaseModel):
    status: Optional[str] = None
    admin_notes: Optional[str] = None
    updated_at: str = datetime.now().isoformat()
