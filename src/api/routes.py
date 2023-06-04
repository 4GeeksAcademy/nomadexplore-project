"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

    response_body = {
        "message": "Yeah baby!!! I'm a message that came from the funky backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# [GET] /users Listar todos los usuarios del blog
@api.route('/user', methods=['GET'])
def get_users():
    users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), users))
    return jsonify(all_users), 200

# post user
@api.route('/signup', methods=['POST'])
def add_users():

    request_body_user = request.get_json()
    new_user = User(
        email=request_body_user['email'], password=request_body_user['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify('user added:', request_body_user), 200
