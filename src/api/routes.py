"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required



api = Blueprint('api', __name__)

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

@api.route('/login', methods=['POST'])
def login():
    # Obtener los datos del usuario desde el cliente
    body = request.get_json()
    email = body['email']
    password = body['password']

    # Existe el usuario en la base de datos?
    user = User.query.filter_by(email=email, password=password).first()

    # si no existe, devuelve un mensaje de error y el código 401
    if user == None:
        return jsonify({"msg": "User or password, Not exist!"}), 401

    # Flask crea un nuevo token JWT. Se lo guarda en su base de datos y lo asocia al usuario que hemos recuperado de la base de datos
    access_token = create_access_token(identity=user.serialize())

    # Devolvemos el token (string) al cliente para que en futuras peticiones a nuestros endpoints protegidos se pueda autentificar
    # (cebolla_patata_queso)
    response_body = {
        "msg": "Token create successfully",
        "token": access_token,
        "email": email
    }

    return jsonify(response_body), 200


