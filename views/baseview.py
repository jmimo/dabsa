from flask.views import View
from flask import request, session, make_response, render_template
from model import AirspaceFile

class BaseView(View):

    def get_template_name(self):
        raise NotImplementedError()

    def render_template(self, context):
        return render_template(self.get_template_name(), **context)
    
    def get_objects(self):
        airspaceFile = None
        if request:
            if request.cookies:
                selected_file_id = request.cookies.get('selected_file')
                if selected_file_id:
                    airspaceFile = AirspaceFile.query.get(selected_file_id)
                    if session:
                        session['selected_file'] = selected_file_id
        return {'files': AirspaceFile.query.all(), 'selected_file': airspaceFile}

    def dispatch_request(self):
        if request.args.get('airspacefileid'):
            session['selected_file'] = request.args.get('airspacefileid')

        if session:
            if session['selected_file']:
                response = make_response(self.render_template(self.get_objects()))
                response.set_cookie('selected_file', session['selected_file'])
                return response
        else:
            return self.render_template(self.get_objects())
