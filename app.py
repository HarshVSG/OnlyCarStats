from flask import Flask, request, jsonify, render_template # type: ignore

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def index():
    return render_template('carstats.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    cn, hp, tq, wt, cl = data.get('car_name'), float(data.get('horsepower')), float(data.get('torque')), float(data.get('weight')), float(data.get('cylinder'))
    ty, dr, et, ft= data.get('vehicle_type'), data.get('drivetrains'),  data.get('engine_type'),  data.get('fuel_type')
    
    if ft == 'Petrol':
        if et == 'Naturally Aspirated':
            if dr == 'FWD':
                if ty == 'Hatch':
                    ac = 108 * (wt / ((hp * tq) / cl))
                    ts = 10.93 * (hp ** 0.625) * (cl ** -0.284)
                    qm = 31.50 * (wt ** -0.026) / (hp ** 0.056 * tq ** 0.024 * cl ** 0.120)
                else:
                    ac = 107 * (wt / ((hp * tq) / cl))
                    ts = 10.93 * (hp ** 0.625) * (cl ** -0.284)
                    qm = 8.29 * (wt ** 0.392) / ((hp ** 0.215) * (tq ** 0.197) * (cl ** -0.015))
            else:
                ac = 0
                ts = 0
                qm = 0  # Other drivetrain configurations
        else:
            ac = 0
            ts = 0
            qm = 0  # Other engine types
    else:
        ac = 0
        ts = 0
        qm = 0  # Other fuel types

    result = {
        'Name': cn,
        'HorsePower': hp,
        'Torque(nm)': tq,
        '0 to 100kmph': round(ac,2),
        'Top Speed(kmph)': round(ts),
        '1/4th Mile': round(qm, 2)
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)