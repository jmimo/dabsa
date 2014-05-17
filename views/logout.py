from baseview import BaseView
from web import app
from model import User
from flask import Flask,session, request, flash, url_for, redirect, render_template, abort ,g
from flask.ext.login import logout_user

class LogoutView(BaseView):
    methods = ['GET']

    def get_template_name(self):
        return None

    def dispatch_request(self):
        model = self.get_objects()
        logout_user()
        return redirect('/')

app.add_url_rule('/logout', view_func=LogoutView.as_view('logoutview'))
