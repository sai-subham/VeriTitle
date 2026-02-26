from rapidfuzz import fuzz
import re

def normalize_string(s: str) -> str:
    s = s.lower()
    s = re.sub(r'[^a-z0-9\s]', '', s)
    return s.strip()

def calculate_string_similarity(title1: str, title2: str) -> float:
    t1 = normalize_string(title1)
    t2 = normalize_string(title2)
    return fuzz.ratio(t1, t2)
