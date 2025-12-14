# 小豪的沉浸式翻译作业
def immersive_translate(text):
    trans_map = {"Immersive translation": "沉浸式翻译"}
    return trans_map.get(text, "暂不支持翻译")

if __name__ == "__main__":
    print(immersive_translate("Immersive translation"))
