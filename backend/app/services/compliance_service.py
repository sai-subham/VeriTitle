from ..config import settings
from .string_service import normalize_string

def check_compliance(title: str, existing_titles: list[str]) -> tuple[list[str], str]:
    flagged = []
    t_norm = normalize_string(title)
    words = t_norm.split()
    
    for word in words:
        if word in settings.BANNED_WORDS:
            flagged.append(word)
            
    if len(title) < 3:
        return flagged, "Title too short (min 3 chars)"
    if len(title) > 150:
        return flagged, "Title too long (max 150 chars)"
        
    for ext_title in existing_titles:
        if normalize_string(ext_title) == t_norm:
            return flagged, "Exact duplicate found"
            
    return flagged, ""
