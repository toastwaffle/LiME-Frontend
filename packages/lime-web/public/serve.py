#!/usr/bin/env python3
"""Serve files with a rewrite rule to index.html."""

import argparse
import os
import http.server


class RequestHandler(http.server.SimpleHTTPRequestHandler):

  def translate_path(self, path):
    root = os.path.dirname(os.path.abspath(__file__))

    if os.path.isfile(os.path.join(root, path[1:])):
      return os.path.join(root, path[1:])

    return os.path.join(root, 'index.html')


def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--bind', '-b', default='')
  parser.add_argument('--port', '-p', default=8000, type=int)
  args = parser.parse_args()
  http.server.test(HandlerClass=RequestHandler, port=args.port, bind=args.bind)

if __name__ == '__main__':
  main()
