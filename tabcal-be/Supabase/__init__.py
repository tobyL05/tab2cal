import os
from supabase import create_client, Client

SUPABASE = None

# like a "hook"
def getSupabase():
    global SUPABASE
    if SUPABASE is None:
        url: str = os.environ.get("SUPABASE_URL")
        key: str = os.environ.get("SUPABASE_KEY")
        SUPABASE = create_client(url, key)
    return SUPABASE


