from flask import Flask, request, jsonify, send_file
from PIL import Image, ImageOps

from tools import optimizer, cat_detection


app = Flask(__name__)


def receive_image() -> Image.Image:
    if "file" not in request.files:
        return jsonify({"message": "No file part"}), 400

    file = request.files["file"]

    if not file:
        return jsonify({"message": "No file selected"}), 400

    image = Image.open(file.stream)

    # Avoid EXIF orientation issues.
    image = ImageOps.exif_transpose(image)

    return image


@app.route("/", methods=["GET"])
def root_endpoint():
    return jsonify({"API": "purr. Image Engine", "version": "1.0"})


@app.route("/optimize", methods=["POST"])
def optimize_endpoint():
    image = receive_image()

    # Resize the image.
    is_avatar = request.form.get("avatar") == "true"
    image = optimizer.resize_image(image, is_avatar=is_avatar)

    # Optimize the image.
    bytes = optimizer.optimize(image)

    return send_file(
        bytes, mimetype="image/webp", as_attachment=True, download_name="optimized_image.webp"
    )


@app.route("/analyze", methods=["POST"])
def analyze_endpoint():
    image = receive_image()

    # Detect cats in the image.
    detections = cat_detection.detect_cats(image)

    return jsonify(detections)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
