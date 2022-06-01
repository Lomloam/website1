
import imp
from os import path
from flask import Flask
# for database
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_manager

db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    # __name represents the name of the file
    app = Flask(__name__)
    # encrypts the data and stuff
    app.config['SECRET_KEY'] = "djajsdflkjsdafkjsdfklsj"
    # gives the app the location of the database, sqlite:///database.db
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)
   



    # tells flask about the blueprints we created, imports the paths for the html files
    from .views import views
    from .authentication import authentication
    from .models import User, Note
    # registers the blueprints with flask
    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(authentication, url_prefix='/')

    create_database(app)
 
    # tells flask how to login people
    login_manager = LoginManager()
    login_manager.login_view = 'authentication.login'
    login_manager.init_app(app)

    # use this function to load users
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app

def create_database(app):
    # makes sure the database has been created
    if not path.exists('website_stuff/' + DB_NAME):
        # if not, reate the database
        db.create_all(app=app)
    