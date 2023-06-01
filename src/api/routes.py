"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def sign_up():

    request_body_user = request.get_json()
    email = request_body_user['email']

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify('Email already exists'), 400

    new_user = User(
        email=email, password=request_body_user['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify('User added', request_body_user), 200