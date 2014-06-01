from wtforms import Form, StringField, PasswordField, FileField, TextAreaField, validators

class LoginForm(Form):
    username = StringField('username', [validators.Length(min=4, max=255)])
    password = PasswordField('password', [validators.Length(min=4, max=255)])

class AirspaceFileUploadForm(Form):
    file = FileField('file', [validators.InputRequired(message='Please specify a valid file path')])

class FlightUploadForm(Form):
    file = FileField('file')
    name = StringField('name', [validators.optional(), validators.Length(max=512, message='Maximum length cannot exceed 512 characters')])
    description = TextAreaField('description', [validators.optional(), validators.Length(max=4096, message='Maximum length cannot exceed 4096 characters')]) 

