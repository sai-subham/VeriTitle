def calculate_final_score(semantic_sim: float, string_sim: float, phonetic_sim: float, flagged_words: list[str], compliance_error: str) -> tuple[float, str, str]:
    # Weighted similarity combination (each is out of 100, so result is out of 100)
    weighted_similarity = (semantic_sim * 0.4) + (string_sim * 0.3) + (phonetic_sim * 0.2)
    
    compliance_penalty = 0.0
    if flagged_words:
        compliance_penalty += 10.0
    
    # We want max probability (100) when there is ZERO similarity.
    # Note: The weights only sum up to 0.9 (0.4 + 0.3 + 0.2), meaning max weighted_similarity is 90.
    # To fix this so zero similarity actually scales properly: we can either scale the 90 up to 100 
    # or just normalize the weights to equal 1.0. Let's make weights sum to 1.0: 
    # Semantic: 45%, String: 35%, Phonetic: 20%
    weighted_similarity = (semantic_sim * 0.45) + (string_sim * 0.35) + (phonetic_sim * 0.2)

    # 100% verification minus how similar we are to existing stuff
    probability = 100.0 - weighted_similarity - compliance_penalty
    probability = max(0.0, min(100.0, probability))
    
    if compliance_error:
        return 0.0, "Rejected", compliance_error
        
    if probability > 80.0 and not flagged_words:
        return probability, "Approved", "Title looks unique and compliant."
    elif 50.0 <= probability <= 80.0 or flagged_words:
        return probability, "Needs Review", "Title has similarities or flagged words."
    else:
        return probability, "Rejected", "Title is too similar to existing titles."
