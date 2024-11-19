from flask_cors import CORS
from flask import Flask
from .api_routes import api_routes

SECRET_KEY = '104b8506c04bd36d3aefbd1334f2dfffc63eca3311d6acb9ee23cfba71adcab7'

def create_app():
    app = Flask(__name__)
    CORS(app, origins=['http://127.0.0.1:5501'])
    # app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'fallback_secret')
    app.secret_key = SECRET_KEY
    app.config['SESSION_COOKIE_SECURE'] = False
    app.register_blueprint(api_routes)

    return app