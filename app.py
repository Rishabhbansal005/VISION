from flask import Flask, render_template, request
import os
import requests
# import cv2
import numpy as np

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'temp/'

# API Keys and Endpoints (replace with your keys)
AZURE_VISION_KEY = "your_azure_key"
AZURE_ENDPOINT = "https://your-endpoint.cognitiveservices.azure.com/vision/v3.2/ocr"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return "No image uploaded"
    
    file = request.files['image']
    img_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(img_path)

    # Call APIs or models here (e.g., text recognition)
    text = azure_ocr(img_path)
    
    return f"Detected Text: {text}"

def azure_ocr(img_path):
    headers = {'Ocp-Apim-Subscription-Key': AZURE_VISION_KEY,
               'Content-Type': 'application/octet-stream'}
    
    with open(img_path, "rb") as image:
        data = image.read()
    
    response = requests.post(AZURE_ENDPOINT, headers=headers, data=data)
    result = response.json()
    return ' '.join([line['text'] for line in result.get('regions', [])[0].get('lines', [])])

if __name__ == '__main__':
    if not os.path.exists('temp'):
        os.makedirs('temp')
    app.run(debug=True)
