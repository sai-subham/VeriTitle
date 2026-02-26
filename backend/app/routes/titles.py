from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import TitleCreate, TitleResponse
from ..models import Title
from ..core.embedding_cache import embedding_cache

router = APIRouter()

@router.get("/titles", response_model=list[TitleResponse])
def get_titles(db: Session = Depends(get_db)):
    """Fetch all titles."""
    return db.query(Title).all()

@router.post("/add-title", response_model=TitleResponse)
def add_title(title: TitleCreate, db: Session = Depends(get_db)):
    """Add a new title manually to database."""
    db_title = Title(name=title.title, language=title.language)
    db.add(db_title)
    db.commit()
    db.refresh(db_title)
    
    # Update cache
    embedding_cache.refresh_cache(db)
    
    return db_title
