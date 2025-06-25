from pyairtable import Api
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

class MediaService:
    def __init__(self):
        self.api = Api(os.getenv("AIRTABLE_API_KEY"))
        self.base = self.api.base(os.getenv("AIRTABLE_BASE_ID"))
        self.table = self.base.table(os.getenv("AIRTABLE_MEDIA_TABLE"))

    async def get_all_media(self):
        try:
            records = self.table.all()
            media_items = []
            for record in records:
                media = {
                    "id": record["id"],
                    "title": record["fields"].get("title", ""),
                    "description": record["fields"].get("description", ""),
                    "media_url": record["fields"].get("media_url", ""),
                    "type": record["fields"].get("type", ""),
                    "created_at": record["fields"].get("created_at", ""),
                    "duration": record["fields"].get("duration", 0),
                    "tags": record["fields"].get("tags", [])
                }
                media_items.append(media)
            return media_items
        except Exception as e:
            raise Exception(f"Error getting media items: {str(e)}")

    async def get_media_by_id(self, media_id: str):
        try:
            record = self.table.get(media_id)
            if not record:
                return None
            return {
                "id": record["id"],
                "title": record["fields"].get("title", ""),
                "description": record["fields"].get("description", ""),
                "media_url": record["fields"].get("media_url", ""),
                "type": record["fields"].get("type", ""),
                "created_at": record["fields"].get("created_at", ""),
                "duration": record["fields"].get("duration", 0),
                "tags": record["fields"].get("tags", [])
            }
        except Exception as e:
            raise Exception(f"Error getting media item: {str(e)}")

    async def create_media(self, media_data: dict):
        try:
            fields = {
                "title": media_data["title"],
                "description": media_data["description"],
                "media_url": media_data["media_url"],
                "type": media_data["type"],
                "created_at": datetime.now().strftime("%Y-%m-%d"),
                "duration": media_data.get("duration", 0),
                "tags": media_data.get("tags", [])
            }
            record = self.table.create(fields)
            return {
                "id": record["id"],
                **{k: v for k, v in record["fields"].items()}
            }
        except Exception as e:
            raise Exception(f"Error creating media item: {str(e)}")

    async def update_media(self, media_id: str, media_data: dict):
        try:
            fields = {k: v for k, v in media_data.items() if k != "id"}
            record = self.table.update(media_id, fields)
            return {
                "id": record["id"],
                **{k: v for k, v in record["fields"].items()}
            }
        except Exception as e:
            raise Exception(f"Error updating media item: {str(e)}")

    async def delete_media(self, media_id: str):
        try:
            self.table.delete(media_id)
            return {"success": True, "message": "Media item deleted successfully"}
        except Exception as e:
            raise Exception(f"Error deleting media item: {str(e)}")

    async def get_media_by_type(self, media_type: str):
        try:
            formula = f"{{type}} = '{media_type}'"
            records = self.table.all(formula=formula)
            media_items = []
            for record in records:
                media = {
                    "id": record["id"],
                    "title": record["fields"].get("title", ""),
                    "description": record["fields"].get("description", ""),
                    "media_url": record["fields"].get("media_url", ""),
                    "type": record["fields"].get("type", ""),
                    "created_at": record["fields"].get("created_at", ""),
                    "duration": record["fields"].get("duration", 0),
                    "tags": record["fields"].get("tags", [])
                }
                media_items.append(media)
            return media_items
        except Exception as e:
            raise Exception(f"Error getting media items by type: {str(e)}")
