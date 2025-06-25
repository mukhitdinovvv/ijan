from pyairtable import Api, Table
import os
from dotenv import load_dotenv

load_dotenv()

AIRTABLE_API_KEY = os.getenv("AIRTABLE_API_KEY")
AIRTABLE_BASE_ID = os.getenv("AIRTABLE_BASE_ID")
AIRTABLE_TABLE_NAME = os.getenv("AIRTABLE_TABLE_NAME")
from ..models.bullying_report import BullyingReport, BullyingReportUpdate

BULLYING_TABLE = AIRTABLE_TABLE_NAME

class BullyingService:
    def __init__(self):
        self.api = Api(AIRTABLE_API_KEY)
        self.table = Table(AIRTABLE_API_KEY, AIRTABLE_BASE_ID, BULLYING_TABLE)

    async def create_report(self, report: BullyingReport):
        """Создает новый отчет о буллинге"""
        print(f"Creating report: {report.dict()}")
        print(f"Using table: {BULLYING_TABLE}")
        try:
            result = self.table.create(report.dict())
            print(f"Success! Created record: {result}")
            return result
        except Exception as e:
            print(f"Error creating record: {str(e)}")
            raise e

    async def get_all_reports(self):
        """Получает все отчеты"""
        return self.table.all()

    async def get_report(self, report_id: str):
        """Получает конкретный отчет по ID"""
        return self.table.get(report_id)

    async def update_report(self, report_id: str, update_data: BullyingReportUpdate):
        """Обновляет статус отчета"""
        return self.table.update(report_id, update_data.dict(exclude_unset=True))

    async def delete_report(self, report_id: str):
        """Удаляет отчет"""
        return self.table.delete(report_id)

    async def get_reports_by_status(self, status: str):
        """Получает отчеты по статусу"""
        formula = f"{{status}} = '{status}'"
        return self.table.all(formula=formula)
