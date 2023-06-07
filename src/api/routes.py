"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Yeah baby!!! I'm a message that came from the funky backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

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
            "id_fav": fav.id,
            "id_user": fav.user_id,
            "destination": fav.destination,
        })

    return jsonify(fav_data), 200

# get de favorito por user


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
            "id_fav:": fav.id,
            "id_user": fav.user_id,
            "destination": fav.destination,
        })

    return jsonify(fav_data), 200

# POST FAVORITE
@api.route("/favs", methods=["POST"])
def post_favorite():
    data = request.json
    destination = data.get("recommendedDestination")

    if not destination or not current_logged_user_id:
        return jsonify({"error": "Destino obligatorio"}), 400

    # Verifica si el destino ya está en favoritos
    existing_fav = Favorites.query.filter_by(
        destination=destination, user_id=current_logged_user_id
    ).first()

    if existing_fav:
        return jsonify({"error": "El destino ya está en favoritos"}), 400

    # Crea un nuevo objeto Favorites relacionado con el usuario actual
    fav = Favorites(destination=destination, user_id=current_logged_user_id)

    # Guarda el nuevo favorito en la base de datos
    db.session.add(fav)
    db.session.commit()

    return jsonify({"success": "Destino agregado exitosamente"}), 200

#DELETE FAVORITE
@api.route('/favs/<int:id_fav>', methods=['DELETE'])
def delete_favorite(id_fav):

    user_id = current_logged_user_id

    favorite = Favorites.query.filter_by(user_id=user_id, id=id_fav).first()

    if favorite is None:
        return jsonify({'msg' : 'funky favorito no encontrado'}), 404

    db.session.delete(favorite)
    db.session.commit()

    response_body = {'msg' : 'funky favorito eliminado'}
    return jsonify(response_body), 200