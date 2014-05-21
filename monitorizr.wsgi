import sys
import logging

logging.basicConfig(stream=sys.stderr)

sys.path.insert(0, '/srv/openg/monitorizr')

from main import app as application

