from pyairtable import Api
import os
from dotenv import load_dotenv

load_dotenv()

AIRTABLE_API_KEY = os.getenv("AIRTABLE_API_KEY")
AIRTABLE_BASE_ID = os.getenv("AIRTABLE_BASE_ID")
AIRTABLE_ARTICLES_TABLE = os.getenv("AIRTABLE_ARTICLES_TABLE")

print("Testing Airtable connection...")
print(f"API Key: {AIRTABLE_API_KEY[:10]}...")
print(f"Base ID: {AIRTABLE_BASE_ID}")
print(f"Articles Table: {AIRTABLE_ARTICLES_TABLE}")

try:
    api = Api(AIRTABLE_API_KEY)
    base = api.base(AIRTABLE_BASE_ID)
    table = base.table(AIRTABLE_ARTICLES_TABLE)
    
    print("\nTrying to get all records...")
    records = table.all()
    print(f"\nFound {len(records)} records:")
    for record in records:
        print(f"\nRecord ID: {record['id']}")
        print("Fields:")
        for key, value in record['fields'].items():
            print(f"  {key}: {value}")
        print("---")
        
except Exception as e:
    print(f"\nError: {str(e)}")
