from __future__ import annotations

from ultralytics import YOLO
from ultralytics.engine.results import Results
from PIL import Image


yolo = YOLO("../ai/models/purr.model.pt")


class CatDetection:
    def __init__(
        self, classes: list[float], confidences: list[float], coordinates: list[list[float]]
    ):
        self.confidences = []
        self.coordinates = []

        # Filter out non-cat detections
        for i, class_ in enumerate(classes):
            if class_ == 15:
                self.confidences.append(confidences[i])
                self.coordinates.append(
                    {
                        "x1": coordinates[i][0],
                        "y1": coordinates[i][1],
                        "x2": coordinates[i][2],
                        "y2": coordinates[i][3],
                    }
                )

    @staticmethod
    def from_result(result: Results) -> CatDetection:
        """Creates a CatDetection object from a Results object.

        Args:
        - result (Results): The Results object from YOLO prediction.

        Returns:
        - CatDetection: The CatDetection object.
        """
        classes = result.boxes.cls.tolist()
        confidences = result.boxes.conf.tolist()
        coordinates = result.boxes.xyxy.tolist()

        return CatDetection(classes, confidences, coordinates)

    def __len__(self) -> int:
        return len(self.confidences)

    def detection_data(self) -> dict[str, bool | list[dict[str, any]]]:
        """Returns the data of the detections.

        Returns:
        - dict[str, bool | list[dict[str, any]]]: The data of the detections.
        """
        data = []

        for i in range(len(self)):
            data.append(
                {
                    "confidence": self.confidences[i],
                    "coordinates": self.coordinates[i],
                }
            )

        return {"detected": len(data) > 0, "data": data}


def detect_cats(image: Image) -> dict[str, bool | list[dict[str, any]]]:
    """Detects cats in an image.

    Args:
    - image (Image): The image to detect cats in.

    Returns:
    - dict[str, bool | list[dict[str, any]]]: The data of the detections.
    """
    result: Results = yolo.predict(image, conf=0.35)[0]
    detections = CatDetection.from_result(result)

    return detections.detection_data()


# if __name__ == "__main__":
#     image_path = input("Enter image path: ")
#     print(detect_cats(image_path))
