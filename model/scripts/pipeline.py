import json
import random
import numpy as np
import os
from pathlib import Path

# Set seeds for reproducible "training"
random.seed(42)
np.random.seed(42)

# --- CONFIG ---
NUM_USERS = 250
NUM_ITEMS = 500
TOP_N = 20

CATEGORIES = [
    "Audio", "Accessories", "Laptops", "Smart Home", "Gaming", 
    "Wearables", "Cameras", "Networking"
]

SEGMENTS = [
    {
        "id": "budget_electronics",
        "name": "Budget Electronics",
        "description": "Users who prefer cost-effective tech options.",
        "strategy": "Promote high-rated budget items and strict value bundles.",
        "prefs": ["Accessories", "Wearables", "Audio"],
        "price_sensitivity": -1.5,
        "premium_affinity": -1.0
    },
    {
        "id": "premium_audio",
        "name": "Premium Audio",
        "description": "Users who invest in high-fidelity audio equipment.",
        "strategy": "Upsell premium audio gadgets and high-margin accessories.",
        "prefs": ["Audio"],
        "price_sensitivity": 0.2, # Don't mind high prices
        "premium_affinity": 2.0
    },
    {
        "id": "gaming_enthusiast",
        "name": "Gaming Enthusiast",
        "description": "PC and console gamers focused on performance.",
        "strategy": "Highlight trending peripherals, monitors, and gaming gear.",
        "prefs": ["Gaming", "Accessories", "Laptops"],
        "price_sensitivity": -0.5,
        "premium_affinity": 0.8
    },
    {
        "id": "smart_home_fan",
        "name": "Smart Home Adopter",
        "description": "Users upgrading their homes with connected devices.",
        "strategy": "Promote bundles of IoT devices and security cameras.",
        "prefs": ["Smart Home", "Networking", "Cameras"],
        "price_sensitivity": -0.8,
        "premium_affinity": 0.5
    }
]

# Paths
OUT_DIR = Path("../../app/public/data")
os.makedirs(OUT_DIR, exist_ok=True)

# --- GENERATE PLATFORM DATA ---

# 1. Generate Items
print("Generating items...")
items = []
for i in range(1, NUM_ITEMS + 1):
    cat = random.choice(CATEGORIES)
    
    # Normally distributed ratings, clipped 1.0 to 5.0
    rating = round(min(5.0, max(1.0, np.random.normal(4.1, 0.6))), 1)
    
    # Prices vary by category roughly
    price_base = {"Laptops": 800, "Cameras": 500, "Audio": 100, "Gaming": 60, "Smart Home": 80, "Accessories": 25, "Wearables": 150, "Networking": 120}
    price = round(max(9.99, np.random.normal(price_base[cat], price_base[cat]*0.5)), 2)
    
    popularity = int(max(10, np.random.lognormal(mean=5.0, sigma=1.0)))
    
    is_premium = price > price_base[cat] * 1.5
    tags = []
    if rating >= 4.7: tags.append("High Rated")
    if popularity > 500: tags.append("Trending")
    if price < price_base[cat] * 0.7 and rating >= 4.0: tags.append("Good Value")
    if is_premium: tags.append("Premium")
    
    items.append({
        "id": f"i{i:04d}",
        "name": f"{cat} Product {i}", # Placeholder names
        "category": cat,
        "price": price,
        "rating": rating,
        "image": f"https://api.dicebear.com/7.x/shapes/svg?seed={i}&backgroundColor=f8fafc",
        "popularity": popularity,
        "tags": tags,
        "_is_premium": is_premium # hidden field for scoring
    })

# 2. Generate Users
print("Generating users...")
users = []
for i in range(1, NUM_USERS + 1):
    seg = random.choice(SEGMENTS)
    users.append({
        "id": f"u{i:04d}",
        "name": f"User {i:03d} / {seg['name']}",
        "segment": seg['id'],
        "preferences": seg['prefs']
    })

# --- SIMULATE TRAINING & SCORING ---
print("Scoring candidates (simulating offline model inference)...")

# We will build a recommendation dictionary: user_id -> list of recs
recommendations = {}

# Compute min/max to normalize scores gracefully
all_scores = []

# Quick lookups
items_df = items
seg_map = {s['id']: s for s in SEGMENTS}

# Track global insights during scoring
cat_counts = {c: 0 for c in CATEGORIES}
segment_scores = {s['id']: [] for s in SEGMENTS}
reasons_dist = {"category_match": 0, "segment_popularity": 0, "price_fit": 0, "high_rating": 0}

for user in users:
    seg = seg_map[user['segment']]
    user_candidates = []
    
    for item in items:
        score = 0.0
        reasons = {
            "category_match": False,
            "segment_popularity": False,
            "price_fit": False,
            "high_rating": False
        }
        
        # 1. Base affinity
        if item['category'] in user['preferences']:
            score += 30.0
            reasons["category_match"] = True
            
        # 2. Segment popularity (approximate)
        if item['category'] in seg['prefs'] and item['popularity'] > 200:
            score += 20.0
            reasons["segment_popularity"] = True
            
        # 3. Collaborative / User taste noise (Simulating latent factors)
        score += np.random.normal(10, 5)
        
        # 4. Ratings weight
        score += (item['rating'] * 5)
        if item['rating'] > 4.5:
            reasons["high_rating"] = True
            
        # 5. Price & Premium adjustments based on segment affinity
        price_norm = np.log1p(item['price'])
        # if seg has negative price sensitivity, high price reduces score.
        price_penalty = price_norm * seg['price_sensitivity'] * 2.0
        score += price_penalty
        
        if item['_is_premium']:
            score += (seg['premium_affinity'] * 15.0)
            
        # Check price fit
        if "Good Value" in item['tags'] and seg['price_sensitivity'] < 0:
            reasons["price_fit"] = True
            score += 15.0
            
        user_candidates.append({
            "item": item,
            "score": score,
            "reasons": reasons
        })
        
    # Sort and take top N
    user_candidates.sort(key=lambda x: x['score'], reverse=True)
    top_cands = user_candidates[:TOP_N]
    
    # Normalize scores locally to 0-100 just for display realism
    max_score = top_cands[0]['score'] if top_cands else 1
    min_score = top_cands[-1]['score'] if top_cands else 0
    diff = max_score - min_score if (max_score - min_score) > 0 else 1
    
    final_recs = []
    for rank, c in enumerate(top_cands):
        # 99 to 80 roughly
        norm_score = int(98 - (rank * (20 / TOP_N)) + random.uniform(-1, 1))
        
        # Build explanation string
        active_reasons = [r for r, v in c['reasons'].items() if v]
        exp = "Recommended because it "
        if "category_match" in active_reasons:
            exp += f"matches your preference for {c['item']['category']}. "
        elif "segment_popularity" in active_reasons:
            exp += "is highly popular for users similar to you. "
        else:
            exp += "aligns with your implicit taste profile. "
            
        if "price_fit" in active_reasons:
            exp += "It also represents great value for your budget."
        elif "high_rating" in active_reasons:
            exp += "It has outstanding community ratings."
            
        final_recs.append({
            "item_id": c['item']['id'],
            "score": norm_score,
            "reasons": c['reasons'],
            "explanation": exp.strip()
        })
        
        # Update insights stats
        cat_counts[c['item']['category']] += 1
        segment_scores[user['segment']].append(norm_score)
        for r, v in c['reasons'].items():
            if v: reasons_dist[r] += 1
            
    recommendations[user['id']] = final_recs

# --- BUILD INSIGHTS ---

print("Aggregating insights dashboard...")
top_cats = [{"category": k, "count": v} for k, v in sorted(cat_counts.items(), key=lambda x: -x[1])[:5]]

seg_perf = []
for s_id, scores in segment_scores.items():
    avg = int(np.mean(scores)) if scores else 0
    seg_perf.append({"segment": s_id, "avg_score": avg})
    
total_reasons = sum(reasons_dist.values()) or 1
reason_brk = [{"reason": k, "percentage": int((v/total_reasons)*100)} for k, v in reasons_dist.items() if v > 0]

# Compute true price distribution of RECOMMENDED items instead of all items
rec_prices = []
for user_recs in recommendations.values():
    for rec in user_recs:
        # lookup price
        itm = next((i for i in items if i['id'] == rec['item_id']), None)
        if itm: rec_prices.append(itm['price'])

p_dists = {"0-50": 0, "50-150": 0, "150-300": 0, "300+": 0}
for p in rec_prices:
    if p < 50: p_dists["0-50"] += 1
    elif p < 150: p_dists["50-150"] += 1
    elif p < 300: p_dists["150-300"] += 1
    else: p_dists["300+"] += 1
price_dist_list = [{"range": k, "count": v} for k, v in p_dists.items()]

r_dists = {"1-3": 0, "3-4": 0, "4-4.5": 0, "4.5-5": 0}
for user_recs in recommendations.values():
    for rec in user_recs:
        itm = next((i for i in items if i['id'] == rec['item_id']), None)
        if itm:
            r = itm['rating']
            if r < 3: r_dists["1-3"] += 1
            elif r < 4: r_dists["3-4"] += 1
            elif r < 4.5: r_dists["4-4.5"] += 1
            else: r_dists["4.5-5"] += 1
rating_dist_list = [{"range": k, "count": v} for k, v in r_dists.items()]

insights = {
    "top_categories": top_cats,
    "segment_performance": seg_perf,
    "price_distribution": price_dist_list,
    "rating_distribution": rating_dist_list,
    "reason_breakdown": reason_brk
}

# --- EXPORT TO JSON ---
print("Exporting JSON artifacts to /app/public/data/ ...")

# Remove hidden processing fields
clean_items = []
for itm in items:
    clean_itm = itm.copy()
    if "_is_premium" in clean_itm:
        del clean_itm["_is_premium"]
    clean_items.append(clean_itm)

with open(OUT_DIR / "users.json", "w") as f:
    json.dump(users, f, indent=2)

with open(OUT_DIR / "items.json", "w") as f:
    json.dump(clean_items, f, indent=2)

with open(OUT_DIR / "recommendations.json", "w") as f:
    json.dump(recommendations, f, indent=2)

with open(OUT_DIR / "insights.json", "w") as f:
    json.dump(insights, f, indent=2)

# Save segment metadata
clean_segs = [{"id": s["id"], "name": s["name"], "description": s["description"], "strategy": s["strategy"]} for s in SEGMENTS]
with open(OUT_DIR / "segments.json", "w") as f:
    json.dump(clean_segs, f, indent=2)

# Save prompts
prompts = [
  {"id": "p1", "text": "Why is this item ranked #1?", "action": "explain_top_rank"},
  {"id": "p2", "text": "Show cheaper alternatives", "action": "filter_cheaper"},
  {"id": "p3", "text": "What should we promote to this user segment?", "action": "show_segment_strategy"},
  {"id": "p4", "text": "Diversity boost (Explore)", "action": "diversity_boost"}
]
with open(OUT_DIR / "prompts.json", "w") as f:
    json.dump(prompts, f, indent=2)

print("Pipeline completed successfully! All files exported.")
