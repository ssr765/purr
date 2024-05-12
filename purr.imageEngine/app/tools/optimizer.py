import io
from pathlib import Path

from PIL import Image


def optimize(image: Image.Image, quality: int = 80) -> io.BytesIO:
    """
    Optimiza una imagen en formato JPEG o PNG, reduciendo su calidad a un valor específico.

    Args:
    - image (Image): La imagen a optimizar.
    - quality (int): La calidad de la imagen optimizada. Por defecto es 80.

    Returns:
    - Image: La imagen optimizada.

    Example:
    >>> image = Image.open("image.jpg")
    >>> optimized_image = optimize(image)
    """

    output = io.BytesIO()
    image.save(output, format="WEBP", optimize=True, quality=quality)

    # Reset the buffer position to the beginning to avoid sending an empty file.
    output.seek(0)

    return output


def resize_image(image: Image.Image) -> Image.Image:
    """
    Redimensiona una imagen a 1080px de ancho o alto, manteniendo la relación de aspecto.
    Si la imagen es más pequeña que 1080px de ancho o alto, la imagen original será retornada.

    Args:
    - image (Image): La imagen a redimensionar.

    Returns:
    - Image: La imagen redimensionada si la imagen original es más grande que 1080px de ancho o alto.

    Example:
    >>> image = Image.open("image.jpg")
    >>> resized_image = resize_image(image)
    """
    witdh = image.width
    height = image.height

    if witdh <= 1080 and height <= 1080:
        return image

    if witdh > height:
        new_width = 1080
        new_height = int((1080 / witdh) * height)

    else:
        new_height = 1080
        new_width = int((1080 / height) * witdh)

    # Antialiasing for better quality.
    return image.resize((new_width, new_height), Image.Resampling.LANCZOS)
