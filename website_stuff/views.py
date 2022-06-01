from fileinput import filename
from unittest import result
from flask import Blueprint, redirect, render_template, request, flash, jsonify
from flask_login import login_user, login_required, logout_user, current_user
import os
import os
import keras
import keras.models
import keras.models
import tensorflow as tf
from keras_preprocessing import image
from PIL import Image
import base64
import io
import re

# Helper libraries
import numpy as np
# blueprint means that the file has all the url's defined.

views = Blueprint('views', __name__)

# creates the url's for the different html files. can also be used to call a function for a different purpose, like the ml model
@views.route('/')
@login_required
def index():
    return render_template('index.html', user=current_user)

@views.route('/maze')
@login_required
def maze():
    return render_template('maze.html', user=current_user)

@views.route('/shapes')
@login_required
def shapes():
    return render_template('shapes.html', user=current_user)    
    
@views.route('/sorts')
@login_required
def sorts():
    return render_template('sorts.html', user=current_user)    

@views.route('/test')
@login_required
def test():
    return render_template('test.html', user=current_user)  

@views.route('/runML', methods = ['GET', 'POST'])
@login_required
def upload_file():

    # checks if a string can be converted to a float
    def isfloat(num):
     try:
        float(num)
        return True
     except ValueError:
        return False

    # if there is an html post request, do this stuff. This request comes from a submit form
    if request.method == 'POST':
      
      # stores the file that is submitted
      f = request.files['file']
      # gets the name of the file
      name = f.filename
      # gets the extension of the file
      ext = os.path.splitext(name)[1]
      # checks if the file is an image, if not, rejects it
      if ext == '.png' or ext == '.PNG' or ext == '.jpeg' or ext == '.JPEG' or ext == '.JPG' or ext == '.jpg':
         # saves the image localy
         f.save((name))
         # loads the ml model
         model = keras.models.load_model("C:/Users/kosar/PycharmProjects/website/website_stuff/mn.h5")
         # the possible outcomes of the model
         class_names = ["Honda", "Husqvarna", "Kawasaki", "Ktm", "Suzuki", "Yamaha"]
         # prepares the image for insertion into the model
         img_path = name
         img = image.load_img(img_path, target_size=(32, 32))
         img = (np.expand_dims(img, 0))
         pred = model.predict(img)
         # gets a weird array from the prediction
         test = str(pred[0])
         
         # grabs all of the floats from that string
         nums = re.findall(r"[-+]?(?:\d*\.\d+|\d+)", test)
         print(nums)
         # gets the largest number from the array. The largest number corresponds to the predicted outcome
         maxNum = -float('inf')
         index = 0
         
         for i in range(len(nums)-1):
            num = float(nums[i])
            if num > maxNum:
                maxNum = num
                index = i
        # result is equal to the index of the max num in class names
         result = class_names[index]
         
         # returns to the front end the result
         flash(result, category="success")
         im = Image.open(name)
         im = im.convert("RGB")
         data = io.BytesIO()
         im.save(data, "JPEG")
         encoded_img_data = base64.b64encode(data.getvalue())
         os.remove(name)
         return render_template('test.html', img_data=encoded_img_data.decode('utf-8'))
         
         
      else:
          flash('wrong file type', category='error')
          return redirect('/test')

    return redirect('/test')
