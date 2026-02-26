import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from .config import settings
from .database import engine, Base, SessionLocal
from .models import Title
from .routes import verify, titles, health
from .core.exceptions import validation_exception_handler, internal_server_error_handler
from .core.embedding_cache import embedding_cache

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def seed_db():
    db = SessionLocal()
    existing = db.query(Title).count()
    if existing == 0:
        logger.info("Seeding database with 15 initial mock titles...")
        seed_data = [
            "Global Solutions Inc", "Apex Technologies", "Vertex Innovations",
            "Quantum Networks", "Stellar Dynamics", "Pioneer Systems",
            "Nova Enterprises", "Nexus Corporation", "Aegis Software",
            "Matrix Analytics", "Summit Group", "Horizon Ventures",
            "Crest Holdings", "Zenith Logistics", "Prime Industries"
        ]
        for name in seed_data:
            db.add(Title(name=name, language="en"))
        db.commit()
    db.close()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up VeriTitle AI Backend")
    Base.metadata.create_all(bind=engine)
    seed_db()
    
    db = SessionLocal()
    embedding_cache.initialize(db)
    db.close()
    
    yield
    # Shutdown
    logger.info("Shutting down")


app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, internal_server_error_handler)

app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(verify.router, prefix="/api", tags=["Verification"])
app.include_router(titles.router, prefix="/api", tags=["Titles"])
