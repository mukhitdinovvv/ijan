import requests
import json

def test_get_articles():
    url = "http://127.0.0.1:8000/api/articles"
    
    response = requests.get(url)
    print(f"Статус: {response.status_code}")
    print(f"Ответ: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")

if __name__ == "__main__":
    test_get_articles()
