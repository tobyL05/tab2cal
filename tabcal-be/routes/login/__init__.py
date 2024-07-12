
def handleLogin(request):
    print(request.get_json())
    return "success"


def handleAuth(request):
    print(request)