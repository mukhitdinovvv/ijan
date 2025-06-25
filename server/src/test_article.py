import requests
import json

def test_create_article():
    url = "http://127.0.0.1:8000/api/articles"
    data = {
        "title": "Первая статья",
        "content": "Содержание первой тестовой статьи",
        "author": "Админ"
    }
    
    response = requests.post(url, json=data)
    print(f"Статус: {response.status_code}")
    print(f"Ответ: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")

if __name__ == "__main__":
    test_create_article()
