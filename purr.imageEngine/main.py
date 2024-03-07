from flask import Flask, request, jsonify

from tools import webp


app = Flask(__name__)


@app.route("/", methods=["GET"])
def root_endpoint():
    return jsonify({"API": "purr. Image Engine", "version": "1.0"})


@app.route("/post_test", methods=["POST"])
def post_test_endpoint():
    return jsonify(request.json)


@app.route("/webp", methods=["POST"])
def webp_endpoint():

    # webp.convert_to_webp("input.jpg", "output.webp")
    return jsonify({"API": "Enpoint WIP"})


if __name__ == "__main__":
    app.run(debug=True)
