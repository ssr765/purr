import os
from pathlib import Path

from flask import Flask, request, jsonify

from tools import webp, cat_detection


app = Flask(__name__)


@app.route("/", methods=["GET"])
def root_endpoint():
    return jsonify({"API": "purr. Image Engine", "version": "1.0"})


@app.route("/webp", methods=["POST"])
def webp_endpoint():
    input_path = request.json.get("input")

    # Check if input path is missing.
    if input_path is None:
        return jsonify({"error": "Input path missing"}), 400

    input_path = Path(input_path)
    output_path = input_path.with_suffix(".webp")

    # Check if the image is already in WebP format.
    if input_path.suffix == ".webp":
        return jsonify({"status": "Image already in WebP format", "filename": input_path.name})

    # Comprobar que el path de entrada exista.
    if not input_path.exists():
        return jsonify({"error": "Input path does not exist"}), 404

    # Convert the image to WebP format.
    success = webp.convert_to_webp(input_path, output_path)

    # Check if the image was successfully converted.
    if not success:
        return jsonify({"error": "Image could not be converted"}), 500

    # Size comparison
    input_size = input_path.stat().st_size
    output_size = output_path.stat().st_size
    size_comparison = (input_size - output_size) / input_size * 100
    print(f"Size comparison: {size_comparison:.2f}%")

    # Check if the optimized image is bigger than the original image.
    if size_comparison < 0:
        os.remove(output_path)
        return jsonify(
            {"status": "Optimized image is bigger than input image", "filename": input_path.name}
        )

    # Remove original image.
    os.remove(input_path)

    return jsonify({"status": "Optimized!", "filename": output_path.name})


@app.route("/analize", methods=["POST"])
def analize_endpoint():
    input_path = request.json.get("input")

    # Check if input path is missing.
    if input_path is None:
        return jsonify({"error": "Input path missing"}), 400

    input_path = Path(input_path)

    # Check if the input path exists.
    if not input_path.exists():
        return jsonify({"error": "Input path does not exist"}), 404

    # Detect cats in the image.
    detections = cat_detection.detect_cats(input_path)

    return jsonify(detections)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
