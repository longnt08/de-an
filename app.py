from flask import (Flask,
                    request,
                      render_template,
                      session,
                      redirect,
                      flash,
                      url_for)
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.secret_key = 'd6ff5607bdcbfdec15e51c7f2e3a67337637b23e5af34f91b66a676894f75e85'
app.static_folder = 'static'
app.template_folder = 'templates'

client = MongoClient('mongodb://localhost:27017/')
db = client['HomeHub']
users = db['users']

# Login
@app.route("/", methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        #find email in MongoDB
        user = users.find_one({'email': email})
        
        if user and check_password_hash(user['password'], password):
            session['logged_in'] = True
            session['user'] = {
                'username': user['username'],
                'email': user['email'],
                'houseNum': user['houseNum'],
                'phone': user['phone'],
                'location': user['location']
            }
            return redirect(url_for('homepage'))
        else:
            error = 'Invalid credentials. Please try again.'
            return render_template('login.html', error=error)
        
    return render_template('login.html')

# Home page
@app.route("/homepage")
def homepage():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    
    user = session.get('user', {})

    username = user['username']
    email = user['email']
    phone = user['phone']
    houseNum = user['houseNum']
    location = user['location']

    return render_template('homepage.html',
                            username=username,
                            email=email,
                            phone=phone,
                            houseNum=houseNum,
                            location=location)

# Register
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':

        firstName = request.form['firstName']
        lastName = request.form['lastName']
        username = "{} {}".format(firstName, lastName)
        email = request.form['email']
        houseNum = request.form['houseNum']
        phone = request.form['phone']
        location = request.form['location']
        password = request.form['password']

        #Check if email already exists in the database
        existing_email = users.find_one({"email": email})

        if existing_email:
            error = 'Email already exists'
            return render_template('register.html', error = error)
    
        # hash the password for security
        hashed_password = generate_password_hash(password)

        #Save the neu user in MongoDB
        users.insert_one({
            'username': username,
            'email': email,
            'password': hashed_password,
            'houseNum': houseNum,
            'phone': phone,
            'location': location
        })

        flash('Registration successful! Please login')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/logout')
def logout():
    session['logged_id'] = False
    session['user'] = {}
    return redirect(url_for('login'))

if __name__=='__main__':
    app.run(debug=True)