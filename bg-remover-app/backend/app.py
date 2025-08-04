from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from io import BytesIO
import base64
from utils.bg_remover import remove_background, resize_image
from PIL import Image

app = Flask(__name__)
CORS(app)

@app.route('/remove-bg', methods=['POST'])
def remove_bg():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    file = request.files['image']
    image_bytes = file.read()
    print("Image uploaded:", file.filename, "size:", len(image_bytes))
    # Remove background
    try:
        processed_image = remove_background(image_bytes)
    except Exception as e:
        import traceback
        print('Error in remove_background:', e)
        traceback.print_exc()
        return jsonify({'error': f'Error processing image: {str(e)}'}), 500
    # Create resized versions
    original_io = BytesIO()
    processed_image.save(original_io, format='PNG')
    original_io.seek(0)
    width, height = processed_image.size
    img_512 = resize_image(processed_image, (width // 2, height // 2))
    img_256 = resize_image(processed_image, (width // 4, height // 4))
    io_512 = BytesIO()
    img_512.save(io_512, format='PNG')
    io_512.seek(0)
    io_256 = BytesIO()
    img_256.save(io_256, format='PNG')
    io_256.seek(0)
    # Encode to base64
    def to_b64(io):
        return base64.b64encode(io.getvalue()).decode('utf-8')
    return jsonify({
        'original': to_b64(original_io),
        'size_512': to_b64(io_512),
        'size_256': to_b64(io_256)
    })

@app.route('/replace-bg', methods=['POST'])
def replace_bg():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    fg_file = request.files['image']
    fg_bytes = fg_file.read()
    fg_img = Image.open(BytesIO(fg_bytes)).convert('RGBA')
    print("Image uploaded:", fg_file.filename, "size:", len(fg_bytes))
    # If the image is not transparent, remove background
    if fg_img.getextrema()[3][0] == 255:
        # No transparency, try to remove bg
        try:
            from utils.bg_remover import remove_background
            fg_img = remove_background(fg_bytes)
        except Exception as e:
            print('Failed to remove background:', e)
    bg = None
    # Solid color background
    if 'background' in request.form:
        color = request.form['background']
        if color.startswith('#'):
            color = color.lstrip('#')
        rgb = tuple(int(color[i:i+2], 16) for i in (0, 2, 4))
        bg = Image.new('RGBA', fg_img.size, rgb + (255,))
    # Sample or user-uploaded background image
    elif 'sampleBg' in request.files:
        bg_file = request.files['sampleBg']
        bg = Image.open(bg_file).convert('RGBA').resize(fg_img.size)
    elif 'userBg' in request.files:
        bg_file = request.files['userBg']
        bg = Image.open(bg_file).convert('RGBA').resize(fg_img.size)
    else:
        # Default to white
        bg = Image.new('RGBA', fg_img.size, (255,255,255,255))
    # Composite: paste fg_img (with alpha) onto bg
    bg.paste(fg_img, (0,0), fg_img)
    # Prepare outputs
    out_io = BytesIO()
    bg.save(out_io, format='PNG')
    out_io.seek(0)
    width, height = bg.size
    img_512 = resize_image(bg, (width // 2, height // 2))
    img_256 = resize_image(bg, (width // 4, height // 4))
    io_512 = BytesIO()
    img_512.save(io_512, format='PNG')
    io_512.seek(0)
    io_256 = BytesIO()
    img_256.save(io_256, format='PNG')
    io_256.seek(0)
    def to_b64(io):
        return base64.b64encode(io.getvalue()).decode('utf-8')
    return jsonify({
        'result': to_b64(out_io),
        'original': to_b64(out_io),
        'size_512': to_b64(io_512),
        'size_256': to_b64(io_256)
    })

if __name__ == '__main__':
    app.run(debug=True)
