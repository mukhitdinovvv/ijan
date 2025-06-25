import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_articles():
    # 1. Создание статьи
    article_data = {
        "title": "Тестовая статья о буллинге",
        "content": "Это тестовая статья о том, как распознать буллинг в школе",
        "author": "Тестовый Автор",
        "tags": ["буллинг", "школа", "тест"]
    }
    
    response = requests.post(f"{BASE_URL}/api/articles", json=article_data)
    print("\n=== Создание статьи ===")
    print(f"Статус: {response.status_code}")
    print(f"Ответ: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
    
    if response.status_code == 200:
        article_id = response.json()["id"]
        
        # 2. Получение всех статей
        response = requests.get(f"{BASE_URL}/api/articles")
        print("\n=== Список всех статей ===")
        print(f"Статус: {response.status_code}")
        print(f"Количество статей: {len(response.json())}")
        
        # 3. Получение конкретной статьи
        response = requests.get(f"{BASE_URL}/api/articles/{article_id}")
        print("\n=== Получение статьи по ID ===")
        print(f"Статус: {response.status_code}")
        print(f"Ответ: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")

def test_documents():
    # 1. Создание документа
    document_data = {
        "title": "Памятка по предотвращению буллинга",
        "description": "Документ содержит основные рекомендации для учителей",
        "file_url": "https://example.com/test-doc.pdf",
        "category": "Методические материалы",
        "tags": ["памятка", "учителям", "тест"]
    }
    
    response = requests.post(f"{BASE_URL}/api/documents", json=document_data)
    print("\n=== Создание документа ===")
    print(f"Статус: {response.status_code}")
    print(f"Ответ: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
    
    if response.status_code == 200:
        document_id = response.json()["id"]
        
        # 2. Получение всех документов
        response = requests.get(f"{BASE_URL}/api/documents")
        print("\n=== Список всех документов ===")
        print(f"Статус: {response.status_code}")
        print(f"Количество документов: {len(response.json())}")
        
        # 3. Получение документов по категории
        response = requests.get(f"{BASE_URL}/api/documents/category/Методические материалы")
        print("\n=== Получение документов по категории ===")
        print(f"Статус: {response.status_code}")
        print(f"Количество документов в категории: {len(response.json())}")

def test_media():
    # 1. Создание медиа
    media_data = {
        "title": "Видео-лекция о буллинге",
        "description": "Обучающее видео для школьных психологов",
        "media_url": "https://example.com/test-video.mp4",
        "type": "video",
        "duration": 1800,
        "tags": ["видео", "лекция", "тест"]
    }
    
    response = requests.post(f"{BASE_URL}/api/media", json=media_data)
    print("\n=== Создание медиа ===")
    print(f"Статус: {response.status_code}")
    print(f"Ответ: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
    
    if response.status_code == 200:
        media_id = response.json()["id"]
        
        # 2. Получение всего медиа-контента
        response = requests.get(f"{BASE_URL}/api/media")
        print("\n=== Список всего медиа-контента ===")
        print(f"Статус: {response.status_code}")
        print(f"Количество медиа: {len(response.json())}")
        
        # 3. Получение медиа по типу
        response = requests.get(f"{BASE_URL}/api/media/type/video")
        print("\n=== Получение медиа по типу ===")
        print(f"Статус: {response.status_code}")
        print(f"Количество видео: {len(response.json())}")

if __name__ == "__main__":
    print("=== Тестирование API материалов ===")
    print("\nТестирование статей...")
    test_articles()
    
    print("\nТестирование документов...")
    test_documents()
    
    print("\nТестирование медиа...")
    test_media()
