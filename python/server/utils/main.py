import base64


def mp3_to_base64_data_uri(mp3_file_path):
    with open(mp3_file_path, "rb") as file:
        mp3_data = file.read()
        base64_data = base64.b64encode(mp3_data).decode("utf-8")
        data_uri = f"data:audio/mp3;base64,{base64_data}"
        return data_uri
