import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "VeriTitle AI"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./verititle.db")
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]
    BANNED_WORDS: list[str] = ["government", "national", "official", "reserve"]

settings = Settings()
