from pyairtable import Api
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("AIRTABLE_API_KEY")
base_id = os.getenv("AIRTABLE_BASE_ID")
table_name = "bullying_reports"  

api = Api(api_key)
base = api.base(base_id)

try:
    table = base.table(table_name)
    record = table.create({
        "reporter_name": "Test Reporter",
        "victim_name": "Test Victim",
        "description": "Test Description",
        "location": "Test Location",
        "date_of_incident": "2025-05-23",
        "witnesses": ["Witness 1", "Witness 2"],
        "evidence_urls": "http://example.com/evidence1",
        "status": "new",
        "admin_notes": "Test notes",
        "created_at": "2025-05-23",
        "updated_at": "2025-05-23"
    })
    print("Успешно создана тестовая запись:", record)
except Exception as e:
    print("Ошибка при создании записи:", str(e))
