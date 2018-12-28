# Quickref  [![Build Status](https://travis-ci.org/mwohlf/apollo.svg?branch=dev)](https://travis-ci.org/mwohlf/apollo)

setup for elestic search

echo "vm.max_map_count=262144" >> /usr/lib/sysctl.d/vm.conf
or 
sysctl -w vm.max_map_count=262144


## Docker


docker-compose up --build elasticsearch

docker-compose up --build kibana



[michael@snoopy docker]$ docker rm elasticsearch
elasticsearch
[michael@snoopy docker]$ docker volume rm docker_es-data
docker_es-data



#### cleanup

docker system prune -a

docker network rm docker_user-bridge

docker volume rm docker_es-data docker_filebeat-data docker_postgres-data docker_redis-data

docker image prune

docker image rm docker_filebeat docker_logstash

#

gradle clean build



# Backend

run gradle bootRun

ng generate c footer

ng generate c header

ng generate c pages/login

ng generate c pages/page1 -d


event source:

https://thepracticaldeveloper.com/2017/11/04/full-reactive-stack-ii-the-angularjs-client/

startup docker:

[michael@snoopy docker]$ gradle composeUp

see: https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-gradle-plugin


crate Swagger Defintion

gradle generateSwaggerDocumentation

gradle generateApi

gradle bootRun



# Frontend

see:
https://github.com/jeroenouw/AngularMaterialFirebase/blob/master/docs/FEATURES.md

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
