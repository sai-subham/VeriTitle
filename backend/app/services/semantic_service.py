import numpy as np
from ..core.embedding_cache import embedding_cache

def cosine_similarity(v1: np.ndarray, v2: np.ndarray) -> float:
    dot_product = np.dot(v1, v2)
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2)
    if norm_v1 == 0 or norm_v2 == 0:
        return 0.0
    return float(dot_product / (norm_v1 * norm_v2))

def calculate_semantic_similarity(title: str, existing_titles: list[str]) -> tuple[float, list[dict]]:
    if not existing_titles:
        return 100.0, []
    
    query_embedding = embedding_cache.encode(title)
    
    similarities = []
    for ext_title in existing_titles:
        ext_embedding = embedding_cache.embeddings.get(ext_title)
        if ext_embedding is not None:
            sim = cosine_similarity(query_embedding, ext_embedding) * 100.0
            similarities.append({"name": ext_title, "score": sim})
            
    if not similarities:
        return 100.0, []
        
    similarities.sort(key=lambda x: x["score"], reverse=True)
    max_sim = similarities[0]["score"]
    
    return max_sim, similarities[:5]
