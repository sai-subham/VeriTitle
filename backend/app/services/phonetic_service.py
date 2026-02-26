from metaphone import doublemetaphone
from .string_service import normalize_string

def calculate_phonetic_similarity(title1: str, title2: str) -> float:
    t1 = normalize_string(title1)
    t2 = normalize_string(title2)
    
    words1 = t1.split()
    words2 = t2.split()
    
    m1 = [doublemetaphone(w)[0] for w in words1 if doublemetaphone(w)[0]]
    m2 = [doublemetaphone(w)[0] for w in words2 if doublemetaphone(w)[0]]
    
    s1 = " ".join([m for m in m1 if m])
    s2 = " ".join([m for m in m2 if m])
    
    if not s1 or not s2:
        return 0.0
        
    from rapidfuzz import fuzz
    return fuzz.ratio(s1, s2)
