from PIL import Image
import os

# Target directory
output_dir = r"C:\Users\rakes\vs code\open-remove\bg-remover-app\frontend\src\newbg"
os.makedirs(output_dir, exist_ok=True)

# 12 distinct RGB colors
colors = [
    (255, 0, 0),     # Red
    (0, 255, 0),     # Green
    (0, 0, 255),     # Blue
    (255, 255, 0),   # Yellow
    (255, 165, 0),   # Orange
    (128, 0, 128),   # Purple
    (0, 255, 255),   # Cyan
    (255, 192, 203), # Pink
    (128, 128, 128), # Gray
    (0, 0, 0),       # Black
    (255, 255, 255), # White
    (0, 128, 128)    # Teal
]

# Create and save the images
for i, color in enumerate(colors):
    img = Image.new("RGB", (1024, 1024), color=color)
    filename = os.path.join(output_dir, f"bg{i+1}.jpg")
    img.save(filename)
    print(f"Saved {filename}")
