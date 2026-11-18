import os
from PIL import Image

img_path = r"C:\Users\OTS\.gemini\antigravity\brain\0e4decaa-555e-422c-9eb3-aa7afb12ec0f\.user_uploaded\media_1795020975265_2cbe81c8.jpg"
im = Image.open(img_path)
print(f"Image size: {im.size}")

# Let's inspect the layout of media_1795020975265_2cbe81c8.jpg
# We can find the bounding boxes of the dark container card, the blueprint image, etc.
w, h = im.size
# Sample some points across the image
print("Sample points:")
for y_ratio in [0.1, 0.3, 0.5, 0.7, 0.9]:
    y = int(h * y_ratio)
    row_colors = [im.getpixel((int(w * x_ratio), y)) for x_ratio in [0.1, 0.25, 0.4, 0.5, 0.6, 0.75, 0.9]]
    print(f"y={y_ratio:.1f}: {row_colors}")
