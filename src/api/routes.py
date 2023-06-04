"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Yeah baby!!! I'm a message that came from the funky backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# post user
@api.route('/signup', methods=['POST'])
def add_user():

    request_body_user = request.get_json()
    new_user = User(
        email=request_body_user['email'], password=request_body_user['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify('user added:', request_body_user), 200

# [GET] /users Listar todos los usuarios


@api.route('/user', methods=['GET'])
def get_users():
    users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), users))
    return jsonify(all_users), 200


# FAVORITE LOGGED
current_logged_user_id = 4

# [GET] /fav Listar favoritos


@api.route("/favs", methods=["GET"])
# @jwt_required()
def get_user_favs():

    # Obtengo el usuario al que pertenece el token JWT
    # current_user = get_jwt_identity()

    # Busca todos los gatos asociados al usuario actual
    favs = Favorites.query.filter_by(user_id=current_logged_user_id)

    # Crea una lista para almacenar los datos de los gatos
    fav_data = []

    # Recorre los gatos y agrega sus datos a la lista
    for fav in favs:
        fav_data.append({
            "id": fav.id,
            "name": fav.destination
        })

    return jsonify(fav_data), 200

@api.route("/favs/<int:user_id>", methods=["GET"])
# @jwt_required()
def get_user_id_favs(user_id):

    # Obtengo el usuario al que pertenece el token JWT
    # current_user = get_jwt_identity()

    # Busca todos los gatos asociados al usuario actual
    favs = Favorites.query.filter_by(user_id=user_id)

    # Crea una lista para almacenar los datos de los gatos
    fav_data = []

    # Recorre los gatos y agrega sus datos a la lista
    for fav in favs:
        fav_data.append({
            "id": fav.id,
            "name": fav.destination
        })

    return jsonify(fav_data), 200