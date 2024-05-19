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


def resize_image(image: Image.Image, *, is_avatar: bool = False) -> Image.Image:
    """
    Redimensiona una imagen a un tamaño de 1080px en su lado más largo, manteniendo la relación de
    aspecto. Si la imagen es más pequeña que 1080px de ancho o alto, la imagen original será retornada.

    En caso de que la imagen sea un avatar, la imagen será recortada al centro para que tenga un
    tamaño de 256x256px.

    Args:
    - image (Image): La imagen a redimensionar.

    Returns:
    - Image: La imagen redimensionada.

    Example:
    >>> image = Image.open("image.jpg")
    >>> resized_image = resize_image(image)
    """
    if is_avatar:
        width, height = image.size
        new_size = min(width, height)
        if width > height:
            left = (width - new_size) / 2
            top = 0
            right = (width + new_size) / 2
            bottom = new_size
        else:
            left = 0
            top = (height - new_size) / 2
            right = new_size
            bottom = (height + new_size) / 2

        image = image.crop((left, top, right, bottom))

    resize_size = 256 if is_avatar else 1080

    width = image.width
    height = image.height

    if width <= resize_size and height <= resize_size:
        return image

    if width > height:
        new_width = resize_size
        new_height = int((resize_size / width) * height)

    else:
        new_height = resize_size
        new_width = int((resize_size / height) * width)

    # Antialiasing for better quality.
    return image.resize((new_width, new_height), Image.Resampling.LANCZOS)
