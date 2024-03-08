from pathlib import Path

from PIL import Image


def convert_to_webp(input_path: Path, output_path: Path, quality: int = 100) -> bool:
    """
    Convierte una imagen a formato WebP.

    Args:
    - input_path: El path de la imagen de entrada.
    - output_path: El path donde se guardará la imagen convertida.
    - quality: La calidad de la imagen de salida, en una escala de 0 a 100. El valor por defecto es 90.

    Returns:
    - bool: Si la imagen fue convertida exitosamente.

    Example:
    >>> input_path = Path("input.jpg")
    >>> output_path = Path("output")
    >>> convert_to_webp(input_path, output_path)
    True
    """
    image = Image.open(input_path)

    output_dir = output_path.parent
    filename = output_path.stem
    image.save(output_dir / (filename + ".webp"), "WEBP", quality=quality)

    return True


if __name__ == "__main__":
    input_path = input("Entry image: ")
    output_path = input("Output image: ")
    convert_to_webp(input_path, output_path)
