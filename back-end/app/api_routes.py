from flask import Blueprint, jsonify, request, session
from pymongo import MongoClient
from werkzeug.security import check_password_hash, generate_password_hash

api_routes = Blueprint('api_routes', __name__)

client = MongoClient('mongodb://localhost:27017/')
db = client['HomeHub']
users_collection = db['users']
services_collection = db['services']

@api_routes.route("/login", methods=['POST', 'GET'])
# def login():
#     if request.method == 'POST':
#         email = request.form['email']
#         password = request.form['password']

#         #find email in MongoDB
#         user = users_collection.find_one({'email': email})
        
#         if user and check_password_hash(user['password'], password):
#             session['logged_in'] = True
#             session['user'] = {
#                 'username': user['username'],
#                 'email': user['email'],
#                 'houseNum': user['houseNum'],
#                 'phone': user['phone'],
#                 'location': user['location']
#             }
#             return redirect(url_for('homepage'))
#         else:
#             error = 'Invalid credentials. Please try again.'
#             return render_template('login.html', error=error)
        
#     return render_template('login.html')

# Home page
# @api_routes.route("/homepage")
# def homepage():
#     if not session.get('logged_in'):
#         return redirect(url_for('login'))
    
#     user = session.get('user', {})

#     username = user['username']
#     email = user['email']
#     phone = user['phone']
#     houseNum = user['houseNum']
#     location = user['location']

#     return render_template('homepage.html',
#                             username=username,
#                             email=email,
#                             phone=phone,
#                             houseNum=houseNum,
#                             location=location)

# Register
@api_routes.route('/register', methods=['GET', 'POST'])
def register():
    # lay du lieu tu form
    if request.method == 'POST':
        firstName = request.form['firstName']
        lastName = request.form['lastName']
        email = request.form['email']
        houseNum = request.form['houseNum']
        phone = request.form['phone']
        location = request.form['location']
        password = request.form['password']
        confirm_password = request.form['confirmPassword']

        missing_fields = []
        if not email:
            missing_fields.append("email")
        if not firstName:
            missing_fields.append("first name")
        if not lastName:
            missing_fields.append("last name")
        if not houseNum:
            missing_fields.append("house number")
        if not phone:
            missing_fields.append("phone")
        if not password:
            missing_fields.append("password")
        if not confirm_password:
            missing_fields.append("confirmPassword")
        if not location:
            missing_fields.append("location")
        
        if missing_fields:
            return jsonify({
                "status": "error",
                "message": f"The following fields are missing: {', '.join(missing_fields)}"
            }), 400
        
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
            'username': username,
            'email': email,
            'password': hashed_password,
            'houseNum': houseNum,
            'phone': phone,
            'location': location
        })
  
    return jsonify({
        "status": "success",
        "message": "Registration successful"
    }), 200

# @api_routes.route('/logout')
# def logout():
#     session['logged_id'] = False
#     session['user'] = {}
#     return redirect(url_for('login'))

# Dang ky dich vu
# @api_routes.route('/service', methods=['POST'])
# def service_registration():
#     service_name = request.args.get('name_services')
#     user_name = request.form['name']
#     house_number = request.form['address']
#     using_time = request.form['service_time'].value

#     if user_name and house_number and using_time:
#         services_collection.insert_one({
#             'service_name': service_name,
#             'user_name': user_name,
#             'house_number': house_number,
#             'using_time': using_time,
#             'registration_date': datetime.date()
#         })
        
#         return redirect({{url_for('payment')}})
#     return render_template('homepage.html')

# Payment
# @api_routes.route('/payment', methods=['POST', 'GET'])
# def payment():
#     return render_template('payment.html')