from fastapi import APIRouter, HTTPException
from ..services.articles_service import ArticlesService
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/articles", tags=["articles"])
articles_service = ArticlesService()

class ArticleBase(BaseModel):
    title: str
    content: str
    author: Optional[str] = None
    image_url: Optional[str] = None
    tags: Optional[List[str]] = []

class ArticleCreate(ArticleBase):
    pass

class ArticleUpdate(ArticleBase):
    pass

class Article(ArticleBase):
    id: str
    created_at: str

@router.get("/", response_model=List[Article])
async def get_all_articles():
    try:
        print("GET /api/articles called")
        articles = await articles_service.get_all_articles()
        print(f"Found {len(articles)} articles")
        return articles
    except Exception as e:
        print(f"Error in get_all_articles: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{article_id}", response_model=Article)
async def get_article(article_id: str):
    try:
        print(f"GET /api/articles/{article_id} called")
        article = await articles_service.get_article_by_id(article_id)
        if not article:
            raise HTTPException(status_code=404, detail="Article not found")
        return article
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=Article)
async def create_article(article: ArticleCreate):
    try:
        return await articles_service.create_article(article.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{article_id}", response_model=Article)
async def update_article(article_id: str, article: ArticleUpdate):
    try:
        updated_article = await articles_service.update_article(article_id, article.dict())
        if not updated_article:
            raise HTTPException(status_code=404, detail="Article not found")
        return updated_article
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{article_id}")
async def delete_article(article_id: str):
    try:
        return await articles_service.delete_article(article_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
