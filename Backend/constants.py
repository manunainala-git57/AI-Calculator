from dotenv import load_dotenv
import os

load_dotenv()


SERVER_URL = 'localhost'
PORT = '7000' 
ENV = 'dev'
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
