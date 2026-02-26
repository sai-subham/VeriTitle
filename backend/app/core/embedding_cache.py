from sentence_transformers import SentenceTransformer
import numpy as np
from sqlalchemy.orm import Session
from ..models import Title

class EmbeddingCache:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(EmbeddingCache, cls).__new__(cls)
            cls._instance.model = None
            cls._instance.embeddings = {}
            cls._instance.titles = []
        return cls._instance

    def initialize(self, db: Session):
        if self.model is None:
            self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.refresh_cache(db)

    def refresh_cache(self, db: Session):
        db_titles = db.query(Title).all()
        self.titles = [t.name for t in db_titles]
        if self.titles:
            embeddings_array = self.model.encode(self.titles)
            for i, title in enumerate(self.titles):
                self.embeddings[title] = embeddings_array[i]

    def encode(self, text: str) -> np.ndarray:
        return self.model.encode(text)

embedding_cache = EmbeddingCache()
