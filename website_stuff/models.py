# imports something from the same package as this file
import email
from email.policy import default
from enum import unique
from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

# more general model for storing data
class Note(db.Model):
    # each thing needs a unique id
    id = db.Column(db.Integer, primary_key=True)
    # string with max length 10000
    data = db.Column(db.String(10000))
    # calls func to store time/date of the data
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    # foreign key references a column of another db, this way you can access data from another db
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))

#creates the table for the database
class User(db.Model, UserMixin):
    # primary key is unique identifier
    id = db.Column(db.Integer, primary_key=True)
    # 100 is the max length for the string, unique means that you can't make a user with the same email
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    first_name = db.Column(db.String(100))
    # every time a note is created, add into user's relationship a note 
    notes = db.relationship('Note')

