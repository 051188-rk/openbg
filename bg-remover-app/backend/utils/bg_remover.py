from rembg import remove
from PIL import Image
from io import BytesIO

def remove_background(image_bytes):
    # rembg 2.x expects bytes and returns bytes
    output_bytes = remove(image_bytes)  # returns bytes
    output_image = Image.open(BytesIO(output_bytes))
    return output_image

def resize_image(image, max_size):
    orig_w, orig_h = image.size
    max_w, max_h = max_size
    scale = min(max_w / orig_w, max_h / orig_h, 1.0)
    new_w, new_h = int(orig_w * scale), int(orig_h * scale)
    return image.resize((new_w, new_h), Image.LANCZOS)
