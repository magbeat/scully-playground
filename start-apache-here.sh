#!/bin/bash

docker run -it --rm --name novaloop-ch -v "$PWD/dist/static":/usr/local/apache2/htdocs/ -p 8080:80 httpd:2.4
