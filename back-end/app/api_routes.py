from flask import Blueprint, jsonify, request, session
from pymongo import MongoClient
from werkzeug.security import check_password_hash, generate_password_hash
from bson import ObjectId
from datetime import datetime

api_routes = Blueprint('api_routes', __name__)

client = MongoClient('mongodb://localhost:27017/')
db = client['HomeHub']
users_collection = db['users']
services_collection = db['services']
registered_services = db['registered_services']
feedback_collection = db['feedback']

# chuc nang dang nhap nguoi dung
@api_routes.route("/users/login", methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    #find email in MongoDB
    user = users_collection.find_one({'email': email})
    
    if user and check_password_hash(user['password'], password):
        session['logged_in'] = True
        user = {
            '_id': str(user['_id']),
            'username': user.get('username'),
            'email': user.get('email'),
            'houseNum': user.get('houseNum'),
            'phone': user.get('phone'),
            'location': user.get('location')
        }

        return jsonify({
            "status": "success",
            "message": "Login successfully",
            "user": user
        })
        
    else:
        return jsonify({
            "status": "error",
            "message": "Password don't match or user isn't exists"
        }), 400

# dang ky nguoi dung
@api_routes.route('/users/register', methods=['POST'])
def register():
    try:
        firstName = request.form['firstName']
        lastName = request.form['lastName']
        email = request.form['email']
        houseNum = request.form['houseNum']
        phone = request.form['phone']
        location = request.form['location']
        dob = request.form['dob']
        relation = request.form['relation']
        password = request.form['password']
        confirm_password = request.form['confirmPassword']

        # convert dob
        if dob:
            dob = datetime.strptime(dob, "%d-%m-%Y")
        
        if password != confirm_password:
            return jsonify({
                "status": "error",
                "message": "Passwords don't match"
            }), 400

        existing_user = users_collection.find_one({"email": email})

        if existing_user:
            return jsonify({
                "status": "error",
                "message": "Email already exists. Please use a different email"
            }), 400
    
        hashed_password = generate_password_hash(password)
        username = "{} {}".format(firstName, lastName)

        users_collection.insert_one({
            'first_name': firstName,
            'last_name': lastName,
            'username': username,
            'email': email,
            'password': hashed_password,
            'houseNum': houseNum,
            'phone': phone,
            'location': location,
            'dob': dob,
            'relation': relation
        })
  
        return jsonify({
            "status": "success",
            "message": "Registration successful"
        }), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

# cap nhat thong tin
@api_routes.route('/users/update_info', methods=['PUT'])
def update_info():
    try:
        data_update = request.get_json()

        user_id = data_update['user_id']
        username = data_update['username']
        phone = data_update['phone']
        location = data_update['location']
        dob = data_update['dob']
        dob = datetime.strptime(dob, "%d-%m-%Y")

        # update thong tin nguoi dung
        result = users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': {
                'username': username,
                'phone': phone,
                'location': location
            }}
        )

        if result.modified_count > 0:
            return jsonify({'success': 'Update successfully'}), 200
        else:
            return jsonify({'message': 'Something went wrong, please try again'}), 400

    except Exception as e:
        return jsonify({'message': str(e)}), 500

# gui phan hoi
@api_routes.route('/users/feedback', methods=['POST'])
def send_feedback():
    try:
        data = request.get_json()

        user_id = data['user_id']

        feedback_data = {
            'user_id': user_id,
            'username': data['username'],
            'type': data['feedback_type'],
            'houseNum': data['houseNum'],
            'phone': data['phone'],
            'email': data['email'],
            'content': data['feedback_content'],
            'status': 'Pending',
            'sent_date': datetime.now()
        }

        add_feedback = feedback_collection.insert_one(feedback_data)
        new_feedback_id = add_feedback.inserted_id

        # them truong feedback neu chua co
        users_collection.update_one(
            {"_id": ObjectId(user_id), "feedbacks": {"$exists": False}},
            {"$set": {"feedbacks": []}}
        )

        # them ma feedback vua tao vao feedbacks
        result = users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$addToSet': {'feedbacks': str(new_feedback_id)}}
        )

        if result.modified_count > 0 or result.upserted_id:
            return jsonify({'success': 'Feedback sent successfully'}), 200
        else:
            return jsonify({'message': 'Failed to send feedback, please try again'})

    except Exception as e:
        return jsonify({'message': str(e)}), 500
# load dich vu
@api_routes.route('/services/load_services', methods=['GET'])
def load_services():
    try:
        services = services_collection.find()
        services = [{**service, "_id": str(service['_id'])} for service in services]

        return jsonify(services)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

# Dang ky dich vu
@api_routes.route('/services/registration', methods=['POST'])
def service_registration():
    try:
        data = request.get_json()

        user_id = data['user_id']

        username = data['username']
        service_name = data['service_name']
        houseNum = data['houseNum']
        using_time = data['using_time']
        register_date = datetime.now()

        registration_data = {
            "service_name": service_name,
            "user_id": user_id,
            "username": username,
            "houseNum": houseNum,
            "using_time": using_time,
            "register_date": register_date
        }

        # luu thong tin tour dang ky vao collection registered services
        registered_services.insert_one(registration_data)

        # them truong registered services cua user neu chua co
        users_collection.update_one(
            {'_id': ObjectId(user_id), 'registered_services': {"$exists": False}},
            {'$set': {'registered_services': []}}
        )

        # them ten tour da dang ky
        result = users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$addToSet': {'registered_services': service_name}}
        )

        if result.modified_count > 0 or result.upserted_id:
            return jsonify({'success': 'Service registered successfully'}), 200
        else:
            return jsonify({'message': 'Something went wrong, please try again'})


    except Exception as e:
        return jsonify({'message': str(e)}), 500

#lay thong tin cu dan cua mot can ho
@api_routes.route('/users/get_family_members', methods=['GET'])
def get_family_members():
    try:
        houseNum = request.args.get('houseNum')
        user_id = request.args.get('user_id')

        if not houseNum:
            return jsonify({'message': 'houseNum parameter is missing'}), 400
        
        if not user_id:
            return jsonify({'message': 'user id is missing'}), 400

        # get family member
        family_members = users_collection.aggregate([
            {'$match': {'houseNum': houseNum}}
        ])

        family_member_list = [
            {
                **member,
                '_id': str(member['_id'])
            }
            for member in family_members
        ]

        # get registered service
        services = registered_services.find({'user_id': user_id})

        service_list = [
            {
                **service,
                '_id': str(service['_id']),
                'register_date': service['register_date'].strftime('%d-%m-%Y')
            }
            for service in services
        ]

        # get sent feedbacks
        feedbacks = feedback_collection.find({'user_id': user_id})

        sent_feedbacks = [
            {
                **feedback,
                '_id': str(feedback['_id']),
                'sent_date': feedback['sent_date'].strftime('%d-%m-%Y')
            }
            for feedback in feedbacks
        ]

        return jsonify({
            'success': 'Get information successfully',
            'family_members': family_member_list,
            'registered_services': service_list,
            'sent_feedbacks': sent_feedbacks
        }), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500