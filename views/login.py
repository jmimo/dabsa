from baseview import BaseView
from web import app
from model import User
from flask import Flask,session, request, flash, url_for, redirect, render_template, abort ,g
from flask.ext.login import login_user, logout_user, current_user, login_required
from forms import LoginForm 

class LoginView(BaseView):
    methods = ['GET', 'POST']

    def get_template_name(self):
        return 'login.html'

    def dispatch_request(self):
        model = self.get_objects()
        form = LoginForm(request.form)
        model['form'] = form
        if request.method == 'POST' and form.validate():
            registered_user = User.query.filter_by(username=form.username.data,password=form.password.data).first()
            if registered_user:
                login_user(registered_user)
                return redirect(request.args.get("next") or url_for("mapview"))

        return self.render_template(model)

app.add_url_rule('/login', view_func=LoginView.as_view('loginview'))
