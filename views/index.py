from baseview import BaseView
from web import app

class IndexView(BaseView):

    def get_template_name(self):
        return 'index.html'
    
    def get_navloc(self):
        return 'index'

app.add_url_rule('/', view_func=IndexView.as_view('indexview'))
