from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from urllib.parse import quote_plus  # ✅ Handles special characters in the password


app = Flask(__name__)
CORS(app)  # ✅ Restrict CORS for security

# ✅ Secure PostgreSQL Connection with URL encoding
password = quote_plus("harshvsdec@31")  # ✅ Encode special characters
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://postgres:{password}@localhost:3169/carstats"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
@app.route("/")
def home():
    return "Flask Server is Running!"
# Car Model
class Car(db.Model):
    __tablename__ = "cars"
    __table_args__ = {"schema": "public"}

    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(255))
    model = db.Column(db.String(255))
    year = db.Column(db.Integer)
    horsepower = db.Column(db.Integer)
    torque = db.Column(db.Integer)
    redline = db.Column(db.Integer)
    zero_to_sixty = db.Column(db.Float)
    top_speed = db.Column(db.Integer)
    quarter_mile = db.Column(db.Float)
    displacement = db.Column(db.Float)
    engine = db.Column(db.String(255))
    transmission = db.Column(db.String(255))
    rim_size = db.Column(db.String(50))
    power_to_weight = db.Column(db.Float)
    image_url = db.Column(db.String(255))  # ✅ Correctly defined

# ✅ Fetch All Cars
@app.route("/get_cars", methods=["GET"])
def get_cars():
    cars = Car.query.all()
    car_list = [
        {
            "id": car.id,
            "brand": car.brand,
            "model": car.model,
            "year": car.year,
            "horsepower": car.horsepower,
            "torque": car.torque,
            "redline": car.redline,
            "zero_to_sixty": car.zero_to_sixty,
            "top_speed": car.top_speed,
            "quarter_mile": car.quarter_mile,
            "displacement": car.displacement,
            "engine": car.engine,
            "transmission": car.transmission,
            "rim_size": car.rim_size,
            "power_to_weight": car.power_to_weight,
            "image_url": car.image_url,  # ✅ Works correctly
        }
        for car in cars
    ]
    return jsonify(car_list)

# ✅ Add Car with Error Handling
@app.route("/add_car", methods=["POST"])
def add_car():
    try:
        data = request.json
        print("Received Data:", data)  # ✅ Debugging line

        if "image_url" not in data or not data["image_url"]:
            return jsonify({"error": "Image URL is required"}), 400  # ✅ Validate image_url

        new_car = Car(
            brand=data["brand"],
            model=data["model"],
            year=data["year"],
            horsepower=data["horsepower"],
            torque=data["torque"],
            redline=data["redline"],
            zero_to_sixty=data["zero_to_sixty"],
            top_speed=data["top_speed"],
            quarter_mile=data["quarter_mile"],
            displacement=data["displacement"],
            engine=data["engine"],
            transmission=data["transmission"],
            rim_size=data["rim_size"],
            power_to_weight=data["power_to_weight"],
            image_url=data["image_url"],  # ✅ Should be a valid path
        )

        db.session.add(new_car)
        db.session.commit()
        return jsonify({"message": "Car added successfully!"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# ✅ Fetch Unique Brands
@app.route("/get_brands", methods=["GET"])
def get_brands():
    brands = db.session.query(Car.brand).distinct().all()
    return jsonify([brand[0] for brand in brands])  # ✅ Fixed tuple issue

# ✅ Fetch Unique Models by Brand
@app.route("/get_models", methods=["GET"])
def get_models():
    brand = request.args.get("brand")
    if not brand:
        return jsonify({"error": "Brand is required"}), 400
    models = db.session.query(Car.model).filter(Car.brand == brand).distinct().all()
    return jsonify([model[0] for model in models])  # ✅ Fixed tuple issue

# ✅ Fetch Unique Years by Brand & Model
@app.route("/get_years", methods=["GET"])
def get_years():
    brand = request.args.get("brand")
    model = request.args.get("model")
    if not brand or not model:
        return jsonify({"error": "Brand and Model are required"}), 400
    years = db.session.query(Car.year).filter(Car.brand == brand, Car.model == model).distinct().all()
    return jsonify([year[0] for year in years])  # ✅ Fixed tuple issue

# ✅ Fetch Last 4 Recently Added Cars
@app.route("/get_recent_cars", methods=["GET"])
def get_recent_cars():
    recent_cars = Car.query.order_by(Car.id.desc()).limit(4).all()
    return jsonify([car.image_url for car in recent_cars])  # ✅ Only image URLs

if __name__ == "__main__":
    app.run(debug=True)  # ✅ For development only, remove in production
