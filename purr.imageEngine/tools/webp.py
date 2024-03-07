from PIL import Image


def convert_to_webp(input_path: str, output_path: str, quality: int = 100) -> None:
    """
    Convierte una imagen a formato WebP.

    Args:
    - input_path (str): El path de la imagen de entrada.
    - output_path (str): El path donde se guardará la imagen convertida.
    - quality (int, opcional): La calidad de la imagen de salida, en una escala de 0 a 100. El valor por defecto es 90.
    """
    image = Image.open(input_path)
    image.save(output_path, "WEBP", quality=quality)


if __name__ == "__main__":
    input_path = input("Imagen de entrada: ")
    output_path = input("Imagen de salida: ")

    convert_to_webp(input_path, output_path)
