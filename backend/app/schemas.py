from pydantic import BaseModel, Field
from typing import List, Literal, Optional

class TitleBase(BaseModel):
    title: str = Field(..., description="The title to verify")
    language: str = Field("en", description="Language of the title")

class TitleCreate(TitleBase):
    pass

class TitleResponse(BaseModel):
    id: int
    name: str
    language: str
    
    class Config:
        from_attributes = True

class SimilarTitle(BaseModel):
    name: str
    score: float

class VerificationResponse(BaseModel):
    verificationProbability: float
    semanticScore: float
    stringSimilarityScore: float
    phoneticSimilarityScore: float
    similarTitles: List[SimilarTitle]
    flaggedWords: List[str]
    complianceStatus: Literal["Approved", "Needs Review", "Rejected"]
    finalDecision: str

class ErrorResponse(BaseModel):
    error: str
