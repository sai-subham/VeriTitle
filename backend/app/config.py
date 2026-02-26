import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "VeriTitle AI"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./verititle.db")
    @property
    def cors_origins(self) -> list[str]:
        if isinstance(self.ALLOWED_ORIGINS, str):
            return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(',')]
        return self.ALLOWED_ORIGINS
    
    ALLOWED_ORIGINS: list[str] | str = ["http://localhost:3000"]
    BANNED_WORDS: list[str] = ["government", "national", "official", "reserve"]

settings = Settings()
