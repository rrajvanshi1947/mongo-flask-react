from flask import Flask, request, render_template, session, jsonify, json
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token)
from flask_bcrypt import Bcrypt
from datetime import datetime
from mongo import mongo
import json
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = 'secret'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, supports_credentials=True)


@app.route('/')
def home():
    if 'username' in session:
        return 'You are logged in as ' + session['username']    #render home page of user here

    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    print('Inside login request')
    print('Email:', request.get_json()['email'])
    print('Password:', request.get_json()['password'])
    users = mongo.users
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ''

    response = users.find_one({'email': email})

    if response:
        print('Email id found')
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity = {
                'first_name': response['first_name'],
                'last_name': response['last_name'],
                'email': response['email']
            }
            )
            result = jsonify({'token': access_token})
            print('Password matched')
        else:
            result = jsonify({'error': 'Invalid password'})
            print('Invalid Password')
    else:
        result = jsonify({'error': 'Invalid email'})
        print('Invalid email')
    
    return result


@app.route('/register', methods=['POST'])
def register():
    print('Inside registration request')
    print('First Name:', request.get_json()['first_name'])
    print('Last Name:', request.get_json()['last_name'])
    print('Email:', request.get_json()['email'])
    print('Password:', request.get_json()['password'])
    users = mongo.users
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()

    # Insert check for user email already exists
    
    user_id = users.insert({
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'password': password,
        'created': created
    })
    new_user = users.find_one({'_id': user_id})
    print('Registration complete')
    result = {'email': new_user['email'] + ' registered'}
    return jsonify({'result': result})

@app.route('/getdata', methods=['GET'])
def getData():
    print('Inside get data')
    data = []
    coll = mongo.demoData
    for obj in coll.find():
        JSONEncoder().encode(obj)
        data.append(obj)
    print(data)
    return JSONEncoder().encode(data)

if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(host = '127.0.0.1', port = 5000, debug = True)
