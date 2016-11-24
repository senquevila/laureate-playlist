import logging
import webapp2

class HomeHandler(webapp2.RequestHandler):
    def get(self):
        INDEX_HTML = open('index.html').read()
        self.response.out.write(INDEX_HTML)

def handle_404(request, response, exception):
    logging.exception(exception)
    response.write('Error 404: Page Not Found')
    response.set_status(404)

def handle_500(request, response, exception):
    logging.exception(exception)
    response.write('Error 500: A Server Error ocurred')
    response.set_status(500)

app = webapp2.WSGIApplication([
    webapp2.Route(r'/', HomeHandler)
])

app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500