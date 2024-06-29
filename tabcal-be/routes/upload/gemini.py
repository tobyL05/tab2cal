import os
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv("API_KEY")
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro')

def get_csv_from_img(img):
    response = model.generate_content([os.getenv("PROMPT"), img], stream=True)
    response.resolve()
    print(response.text)
    return "csv generated"