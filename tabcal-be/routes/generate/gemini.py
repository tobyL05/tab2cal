from datetime import date
import os

import traceback
from flask import abort
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
def get_prompt():
    prompt = os.getenv("GEMINI_PROMPT")
    curr_date = date.today().strftime("%Y/%m/%d")
    curr_day = date.today().strftime("%A")
    parsed = prompt.replace("<current_day>", curr_day).replace("<current_date>", curr_date).replace("<year>", str(date.today().year))
    # print(parsed)
    return parsed


API_KEY = os.getenv("API_KEY")
generation_config = {
  "temperature": 0.3,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    system_instruction=get_prompt()
)

def parse_img(img) -> str:
    try:
        response = model.generate_content([get_prompt(), img])
        response.resolve()
        # print(response.text)
        return response.text
    except:
        print(traceback.format_exc())
        print("An error occurred")
    return abort(500)


if __name__ == "__main__":
    # print(get_prompt())
    print(os.getenv("GEMINI_PROMPT"))