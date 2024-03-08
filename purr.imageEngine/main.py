from pathlib import Path

from flask import Flask, request, jsonify

from tools import webp


app = Flask(__name__)


@app.route("/", methods=["GET"])
def root_endpoint():
    return jsonify({"API": "purr. Image Engine", "version": "1.0"})


@app.route("/post_test", methods=["POST"])
def post_test_endpoint():
    input_ = request.json.get("input")
    output = request.json.get("output")
    return jsonify({"input": input_, "output": output})


@app.route("/webp", methods=["POST"])
def webp_endpoint():
    input_path = request.json.get("input")
    output_path = request.json.get("output")

    # Comprobar que los parámetros de entrada no estén vacíos.
    if not all([input_path, output_path]):
        return jsonify({"error": "Input or output paths missing"}), 400

    input_path = Path(input_path)
    output_path = Path(output_path)

    # Comprobar que el path de entrada exista.
    if not input_path.exists():
        return jsonify({"error": "Input path does not exist"}), 404

    # Convertir la imagen a formato WebP.
    success = webp.convert_to_webp(input_path, output_path)

    # Comprobar si la imagen fue convertida exitosamente.
    if not success:
        return jsonify({"error": "Image could not be converted"}), 500

    return jsonify({"API": "Enpoint WIP"})


if __name__ == "__main__":
    app.run(debug=True)
