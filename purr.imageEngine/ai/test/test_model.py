import pytest
import os
from ultralytics import YOLO

model = YOLO("../models/purr.model.pt")

images = {
    "./images/cats/alexander-london-mJaD10XeD7w-unsplash.webp": 1,
    "./images/cats/amber-kipp-75715CVEJhI-unsplash.webp": 1,
    "./images/cats/ayelt-van-veen-hbiOGtAspCY-unsplash.webp": 2,
    "./images/cats/gena-okami-y1lpMk37EnE-unsplash.webp": 2,
    "./images/cats/haidan-8n2zPI0xrDo-unsplash.webp": 2,
    "./images/cats/jonas-vincent-xulIYVIbYIc-unsplash.webp": 1,
    "./images/cats/kelly-e1u0YdAkh9k-unsplash.webp": 2,
    "./images/cats_and_dogs/anusha-barwa-ppKcYi1CXcI-unsplash.webp": 1,
    "./images/cats_and_dogs/grant-durr-GZXf4kGrqEA-unsplash.webp": 1,
    "./images/dogs/alvan-nee-1VgfQdCuX-4-unsplash.webp": 0,
    "./images/dogs/bruce-warrington-WSAOGHKEqFc-unsplash.webp": 0,
    "./images/dogs/giacomo-lucarini-7M0SG3ZKdlE-unsplash.webp": 0,
    "./images/dogs/tanner-crockett-9WMoaz8kDrU-unsplash.webp": 0,
    "./images/ferrets/rohan-chang-hn0AtxarNNw-unsplash.webp": 0,
    "./images/ferrets/steve-tsang-FnpFMheGjH0-unsplash.webp": 0,
    "./images/ferrets/yulia-vambold-iVliB6Rsvvc-unsplash.webp": 0,
    "./images/raccoons/chris-ensminger-gWo-hfRotrI-unsplash.webp": 0,
    "./images/raccoons/joshua-j-cotten-IWKIHuzl-tU-unsplash.webp": 0,
}


@pytest.mark.parametrize("img_path, expected_count", list(images.items()))
def test_cat_detections(img_path, expected_count):
    result = model(img_path, conf=0.6)[0]
    result.save_txt("result.txt")

    with open("result.txt") as f:
        detections = [result.names[int(line.strip().split(" ")[0])] for line in f.readlines()]

    detections = [d for d in detections if d == "cat"]
    os.remove("result.txt")

    # Detections should match the expected count or be greater than 0 if there are any detections
    assert (len(detections) == expected_count) or (
        len(detections) > 0 and expected_count > 0
    ), f"Expected {expected_count} detections, got {len(detections)}"
