from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from .api.routes import router
from .api.bullying_routes import router as bullying_router
from .api.articles_routes import router as articles_router
from .api.documents_routes import router as documents_router
from .api.media_routes import router as media_router
from .api.ai_routes import router as ai_router

app = FastAPI(title="iJAN API", default_response_class=JSONResponse)

# Подключаем Together AI router
app.include_router(ai_router)

@app.middleware("http")
async def add_charset_middleware(request, call_next):
    response = await call_next(request)
    if isinstance(response, JSONResponse):
        response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response

# Настройка CORS - поддержка и локальной разработки, и продакшен доменов
# Получаем список разрешенных доменов из переменных окружения или используем дефолтный список
from os import environ

# Для продакшена добавьте в .env строку: ALLOWED_ORIGINS=https://example.com,https://www.example.com
allowed_origins = environ.get("ALLOWED_ORIGINS", "").split(",")
# Всегда добавляем локальные домены для разработки
if not allowed_origins or allowed_origins == [""]:
    allowed_origins = []
allowed_origins.extend(["http://localhost:8081", "http://127.0.0.1:8081", "http://localhost:5173", "*"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Подключаем роуты
app.include_router(router, prefix="/api")
app.include_router(bullying_router)
app.include_router(articles_router)
app.include_router(documents_router)
app.include_router(media_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
