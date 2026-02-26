from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import TitleBase, VerificationResponse
from ..models import Title
from ..services.string_service import calculate_string_similarity
from ..services.semantic_service import calculate_semantic_similarity
from ..services.phonetic_service import calculate_phonetic_similarity
from ..services.compliance_service import check_compliance
from ..services.scoring_service import calculate_final_score

router = APIRouter()

@router.post("/verify-title", response_model=VerificationResponse)
def verify_title(request: TitleBase, db: Session = Depends(get_db)):
    if not request.title or not request.title.strip():
        raise HTTPException(status_code=400, detail="Title cannot be empty")
        
    existing_titles = [t.name for t in db.query(Title).all()]
    
    # 1. Compliance
    flagged, compliance_err = check_compliance(request.title, existing_titles)
    
    if existing_titles:
        # 2. Semantic
        semantic_score, similar_titles = calculate_semantic_similarity(request.title, existing_titles)
        
        # 3. String & Phonetic
        max_str_sim = 0.0
        max_phon_sim = 0.0
        
        for ext_title in existing_titles:
            str_sim = calculate_string_similarity(request.title, ext_title)
            if str_sim > max_str_sim:
                max_str_sim = str_sim
                
            phon_sim = calculate_phonetic_similarity(request.title, ext_title)
            if phon_sim > max_phon_sim:
                max_phon_sim = phon_sim
                
    else:
        semantic_score = 0.0
        max_str_sim = 0.0
        max_phon_sim = 0.0
        similar_titles = []
        
    # Final Scoring
    probability, status, decision = calculate_final_score(
        semantic_sim=semantic_score,
        string_sim=max_str_sim,
        phonetic_sim=max_phon_sim,
        flagged_words=flagged,
        compliance_error=compliance_err
    )
    
    return VerificationResponse(
        verificationProbability=round(probability, 2),
        semanticScore=round(semantic_score, 2),
        stringSimilarityScore=round(max_str_sim, 2),
        phoneticSimilarityScore=round(max_phon_sim, 2),
        similarTitles=[{"name": st["name"], "score": round(st["score"], 2)} for st in similar_titles],
        flaggedWords=flagged,
        complianceStatus=status,
        finalDecision=decision
    )
