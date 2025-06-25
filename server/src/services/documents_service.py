from pyairtable import Api
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

class DocumentsService:
    def __init__(self):
        self.api = Api(os.getenv("AIRTABLE_API_KEY"))
        self.base = self.api.base(os.getenv("AIRTABLE_BASE_ID"))
        self.table = self.base.table(os.getenv("AIRTABLE_DOCUMENTS_TABLE"))

    async def get_all_documents(self):
        try:
            records = self.table.all()
            documents = []
            for record in records:
                document = {
                    "id": record["id"],
                    "title": record["fields"].get("title", ""),
                    "description": record["fields"].get("description", ""),
                    "file_url": record["fields"].get("file_url", ""),
                    "created_at": record["fields"].get("created_at", ""),
                    "category": record["fields"].get("category", ""),
                    "tags": record["fields"].get("tags", [])
                }
                documents.append(document)
            return documents
        except Exception as e:
            raise Exception(f"Error getting documents: {str(e)}")

    async def get_document_by_id(self, document_id: str):
        try:
            record = self.table.get(document_id)
            if not record:
                return None
            return {
                "id": record["id"],
                "title": record["fields"].get("title", ""),
                "description": record["fields"].get("description", ""),
                "file_url": record["fields"].get("file_url", ""),
                "created_at": record["fields"].get("created_at", ""),
                "category": record["fields"].get("category", ""),
                "tags": record["fields"].get("tags", [])
            }
        except Exception as e:
            raise Exception(f"Error getting document: {str(e)}")

    async def create_document(self, document_data: dict):
        try:
            fields = {
                "title": document_data["title"],
                "description": document_data["description"],
                "file_url": document_data["file_url"],
                "created_at": datetime.now().strftime("%Y-%m-%d"),
                "category": document_data.get("category", ""),
                "tags": document_data.get("tags", [])
            }
            record = self.table.create(fields)
            return {
                "id": record["id"],
                **{k: v for k, v in record["fields"].items()}
            }
        except Exception as e:
            raise Exception(f"Error creating document: {str(e)}")

    async def update_document(self, document_id: str, document_data: dict):
        try:
            fields = {k: v for k, v in document_data.items() if k != "id"}
            record = self.table.update(document_id, fields)
            return {
                "id": record["id"],
                **{k: v for k, v in record["fields"].items()}
            }
        except Exception as e:
            raise Exception(f"Error updating document: {str(e)}")

    async def delete_document(self, document_id: str):
        try:
            self.table.delete(document_id)
            return {"success": True, "message": "Document deleted successfully"}
        except Exception as e:
            raise Exception(f"Error deleting document: {str(e)}")

    async def get_documents_by_category(self, category: str):
        try:
            formula = f"{{category}} = '{category}'"
            records = self.table.all(formula=formula)
            documents = []
            for record in records:
                document = {
                    "id": record["id"],
                    "title": record["fields"].get("title", ""),
                    "description": record["fields"].get("description", ""),
                    "file_url": record["fields"].get("file_url", ""),
                    "created_at": record["fields"].get("created_at", ""),
                    "category": record["fields"].get("category", ""),
                    "tags": record["fields"].get("tags", [])
                }
                documents.append(document)
            return documents
        except Exception as e:
            raise Exception(f"Error getting documents by category: {str(e)}")
