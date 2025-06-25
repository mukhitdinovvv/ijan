from pyairtable import Api
import os
from dotenv import load_dotenv

load_dotenv()

AIRTABLE_API_KEY = os.getenv("AIRTABLE_API_KEY")
AIRTABLE_BASE_ID = os.getenv("AIRTABLE_BASE_ID")
AIRTABLE_TABLE_NAME = os.getenv("AIRTABLE_TABLE_NAME")

api = Api(AIRTABLE_API_KEY)
base = api.base(AIRTABLE_BASE_ID)
articles_table = base.table(os.getenv("AIRTABLE_ARTICLES_TABLE"))

try:
    # Создаем тестовую статью
    article = articles_table.create({
        "title": "Как справиться с тревогой: практическое руководство",
        "content": "В этой статье рассматриваются простые и эффективные методы борьбы с тревогой, которые можно применять в повседневной жизни.",
        "created_at": "2025-05-24"
    })
    print("✅ Тестовая статья успешно создана:", article)
    
    # Получаем все статьи
    articles = articles_table.all()
    print("\n📋 Все статьи в таблице:")
    for article in articles:
        print(f"ID: {article['id']}")
        print(f"Заголовок: {article['fields'].get('title')}")
        print(f"Теги: {article['fields'].get('tags')}")
        print("---")

except Exception as e:
    print("❌ Ошибка при создании записи:", str(e))
