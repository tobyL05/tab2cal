from datetime import date
import os
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv("API_KEY")
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro')

def get_prompt():
    prompt = os.getenv("GEMINI_PROMPT")
    curr_date = date.today().strftime("%Y/%m/%d")
    curr_day = date.today().strftime("%A")
    return prompt.replace("<current_day>", curr_day).replace("<current_date>", curr_date)


def get_csv_from_img(img):
    try:
        response = model.generate_content([get_prompt(), img], stream=True)
        response.resolve()
    except:
        print("An error occurred")
    
    print(response.text)
    return "csv generated"


if __name__ == "__main__":
    # print(get_prompt())
    print(os.getenv("GEMINI_PROMPT"))