from baseview import BaseView
from web import app
from model import User
from flask import Flask,session, request, flash, url_for, redirect, render_template, abort ,g
from flask.ext.login import login_user, logout_user, current_user, login_required

class LoginView(BaseView):
    methods = ['GET', 'POST']

    def get_template_name(self):
        return 'login.html'

    def dispatch_request(self):
        model = self.get_objects()
        if request.method == 'POST':
            username = request.form['username']
            password = request.form['password']
            registered_user = User.query.filter_by(username=username,password=password).first()
            if registered_user and registered_user.username == username:
                login_user(registered_user)
                flash("Logged in successfully.")
                return redirect(request.args.get("next") or url_for("mapview"))
            return render_template("login.html", form=form)

        return self.render_template(model)

app.add_url_rule('/login', view_func=LoginView.as_view('loginview'))
