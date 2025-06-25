from pyairtable import Api, Table
from ..config import AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME

class AirtableService:
    def __init__(self):
        self.api = Api(AIRTABLE_API_KEY)
        self.table = Table(AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME)

    async def create_record(self, data: dict):
        return self.table.create(data)

    async def get_records(self, formula=None):
        return self.table.all(formula=formula)

    async def update_record(self, record_id: str, data: dict):
        return self.table.update(record_id, data)

    async def delete_record(self, record_id: str):
        return self.table.delete(record_id)
