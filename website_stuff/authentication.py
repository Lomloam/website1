from flask import Blueprint, render_template, request, flash, redirect, url_for
from website_stuff.models import User
from flask_login import login_user, login_required, logout_user, current_user
# imports the db object from init.py
from . import db 
# imports hash to secure password and store it not as pure text
from werkzeug.security import generate_password_hash, check_password_hash
# blueprint means that the file has all the url's defined.

authentication = Blueprint('authentication', __name__)


# creates the routes for the authentication pages(login, logout, signup)

@authentication.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # gets the following data upon attempt at login
        email = request.form.get('email')
        password = request.form.get('password')

        # looks through the db for this specific user
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash('Logged In!', category="success")
                login_user(user, remember=True)
                return redirect(url_for('views.index'))
            else:
                flash("Incorrect Password", category='error')
        else:
            flash("There is no user with that email.", category='errror')

    return render_template("login.html", user=current_user)


@authentication.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('.login'))


@authentication.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        password1 = request.form.get('pass1')
        password2 = request.form.get('pass2')

        user = User.query.filter_by(email=email).first()
        if user:
            flash("There is already an account under this email", category='error')
        elif len(email) < 4:
            flash("Email must be more than 4 characters.", category='error')
        elif len(first_name) < 2:
            flash("First name must be more than 1 characters.", category='error')
        elif password1 != password2:
            flash("Passwords don\'t match.", category='error')
        elif len(password1) < 7:
            flash("Password must be at least 7 characters.", category='error')
        else:
            # creates a user with the following parameters
            new_user = User(email=email, first_name=first_name, password=generate_password_hash(password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            flash("Account created!", category='success')
            login_user(new_user)
            return redirect('/')
    return render_template("signup.html")
