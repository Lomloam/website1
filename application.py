# imports the create app function from init.py
from website_stuff import create_app

application = create_app()
application.config['MAX_CONTENT_LENGTH'] = 8 * 1024 * 1024
# runs the flask application only if the main.py file is run directly

application.run(host='0.0.0.0', debug=False, threaded=True)

