# Python http.server that sets Access-Control-Allow-Origin header.
# Adjusted from https://gist.github.com/razor-x/9542707

import os
import sys
import http.server
import socketserver
from urllib.request import HTTPDefaultErrorHandler

PORT = 8000
IP_ADDRESS = '10.0.0.36' # change ip address based on your local ip address
class HTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        http.server.SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    port = PORT
    httpd = socketserver.TCPServer((IP_ADDRESS, port), HTTPRequestHandler)
    try:
        os.chdir('../')
        print(f'\nserving ../ at {IP_ADDRESS}:{PORT}')
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\n...shutting down http server')
        httpd.shutdown()
        sys.exit()
