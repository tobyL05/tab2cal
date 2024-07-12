from .calendar import Parser
from PIL import Image
from io import BytesIO
from .gemini import parse_img
import base64

def handleGenerate(request):
    print("request received")
    imgb64 = request.get_json()['image']
    repeat_mode = request.get_json()['repeat']
    try:
        end_repeat_date = request.get_json()['endRepeatDate']
    except:
        end_repeat_date = None
    print(request.get_json()['repeat'])
    img = Image.open(BytesIO(base64.b64decode(imgb64.split(",")[1])))
    tsv = parse_img(img)
    return Parser(tsv,repeat_mode,end_repeat_date).response()
    # return "success"

# managed to read and parse as tsv