from pyairtable import Api
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

class ArticlesService:
    def __init__(self):
        self.api = Api(os.getenv("AIRTABLE_API_KEY"))
        self.base = self.api.base(os.getenv("AIRTABLE_BASE_ID"))
        self.table = self.base.table(os.getenv("AIRTABLE_ARTICLES_TABLE"))  # Таблица для статей

    async def get_all_articles(self):
        try:
            print("Getting all articles...")
            records = self.table.all()
            print(f"Found {len(records)} records")
            articles = []
            for record in records:
                print(f"Processing record: {record}")
                # Преобразуем данные в правильный формат
                article = {
                    "id": record["id"],
                    "title": str(record["fields"].get("title", "")),
                    "content": str(record["fields"].get("content", "")),
                    "author": str(record["fields"].get("author", "")),
                    "created_at": str(record["fields"].get("created_at", "")),
                    "image_url": str(record["fields"].get("image_url", "")),
                    "tags": record["fields"].get("tags", [])
                }
                print(f"Processed article: {article}")
                articles.append(article)
            print(f"Returning {len(articles)} articles")
            return articles
        except Exception as e:
            print(f"Error in get_all_articles: {str(e)}")
            raise Exception(f"Error getting articles: {str(e)}")

    async def get_article_by_id(self, article_id: str):
        try:
            record = self.table.get(article_id)
            if not record:
                return None
            return {
                "id": record["id"],
                "title": record["fields"].get("title", ""),
                "content": record["fields"].get("content", ""),
                "author": record["fields"].get("author", ""),
                "created_at": record["fields"].get("created_at", ""),
                "image_url": record["fields"].get("image_url", ""),
                "tags": record["fields"].get("tags", [])
            }
        except Exception as e:
            raise Exception(f"Error getting article: {str(e)}")

    async def create_article(self, article_data: dict):
        try:
            fields = {
                "title": article_data["title"],
                "content": article_data["content"],
                "author": article_data.get("author", ""),
                "created_at": datetime.now().strftime("%Y-%m-%d"),
                "image_url": article_data.get("image_url", ""),
                "tags": article_data.get("tags", [])
            }
            record = self.table.create(fields)
            return {
                "id": record["id"],
                "title": record["fields"]["title"],
                "content": record["fields"]["content"],
                "author": record["fields"].get("author", ""),
                "created_at": record["fields"]["created_at"],
                "image_url": record["fields"].get("image_url", ""),
                "tags": record["fields"].get("tags", [])
            }
        except Exception as e:
            raise Exception(f"Error creating article: {str(e)}")

    async def update_article(self, article_id: str, article_data: dict):
        try:
            fields = {k: v for k, v in article_data.items() if k != "id"}
            fields["updated_at"] = datetime.now().isoformat()
            record = self.table.update(article_id, fields)
            return {
                "id": record["id"],
                "title": record["fields"]["title"],
                "content": record["fields"]["content"],
                "author": record["fields"].get("author", ""),
                "created_at": record["fields"]["created_at"],
                "image_url": record["fields"].get("image_url", ""),
                "tags": record["fields"].get("tags", [])
            }
        except Exception as e:
            raise Exception(f"Error updating article: {str(e)}")

    async def delete_article(self, article_id: str):
        try:
            self.table.delete(article_id)
            return {"success": True, "message": "Article deleted successfully"}
        except Exception as e:
            raise Exception(f"Error deleting article: {str(e)}")
