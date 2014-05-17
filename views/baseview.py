from flask.views import View
from flask import request, session, make_response, render_template
from flask.ext.login import current_user
from model import AirspaceFile

class BaseView(View):

    def get_template_name(self):
        raise NotImplementedError()

    def render_template(self, context):
        return render_template(self.get_template_name(), **context)
    
    def get_objects(self):
        model = {}
        if current_user.is_authenticated():
            model['user'] = current_user

        return model

    def dispatch_request(self):
        return self.render_template(self.get_objects())
