#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Base Encoder Chrome Extension 圖示生成器
使用 Python PIL 生成高品質的 PNG 圖示
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_base_encoder_icon(size):
    """創建 Base Encoder 圖示"""
    # 創建新圖像 (RGBA 模式支援透明背景)
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 計算尺寸相關的數值
    corner_radius = size // 6
    padding = size // 10
    
    # 繪製圓角矩形背景
    # 創建漸層效果的顏色
    primary_color = (66, 133, 244)  # Google Blue
    secondary_color = (52, 168, 83)  # Google Green
    
    # 簡化版：使用單色背景
    background_color = primary_color + (255,)  # 添加 alpha 通道
    
    # 繪製圓角矩形
    draw.rounded_rectangle(
        [0, 0, size-1, size-1], 
        radius=corner_radius, 
        fill=background_color
    )
    
    # 繪製文字或符號
    text_color = (255, 255, 255, 255)  # 白色
    
    if size >= 48:
        # 大圖示：顯示 "B64"
        try:
            font_size = max(size // 4, 8)
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
        except:
            font = ImageFont.load_default()
        
        text = "B64"
        # 計算文字位置（居中）
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = (size - text_width) // 2
        y = (size - text_height) // 2 - size // 10
        
        draw.text((x, y), text, fill=text_color, font=font)
        
        # 繪製轉換箭頭
        arrow_y = y + text_height + size // 8
        arrow_size = size // 6
        center_x = size // 2
        
        # 箭頭線條
        draw.line([center_x - arrow_size, arrow_y, center_x + arrow_size, arrow_y], 
                  fill=text_color, width=max(1, size//32))
        # 箭頭頭部
        draw.line([center_x + arrow_size - arrow_size//3, arrow_y - arrow_size//3,
                   center_x + arrow_size, arrow_y], fill=text_color, width=max(1, size//32))
        draw.line([center_x + arrow_size - arrow_size//3, arrow_y + arrow_size//3,
                   center_x + arrow_size, arrow_y], fill=text_color, width=max(1, size//32))
        
    elif size >= 24:
        # 中圖示：顯示 "64"
        try:
            font_size = max(size // 3, 8)
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
        except:
            font = ImageFont.load_default()
        
        text = "64"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = (size - text_width) // 2
        y = (size - text_height) // 2
        
        draw.text((x, y), text, fill=text_color, font=font)
        
    else:
        # 小圖示：簡單幾何圖形
        center = size // 2
        symbol_size = size // 3
        
        # 中央方塊
        draw.rectangle([center - symbol_size//2, center - symbol_size//2,
                       center + symbol_size//2, center + symbol_size//2], 
                      fill=text_color)
        
        # 周圍的點
        dot_size = max(1, size // 16)
        positions = [
            (center - symbol_size, center - symbol_size),
            (center + symbol_size, center - symbol_size),
            (center, center + symbol_size)
        ]
        
        for x, y in positions:
            draw.ellipse([x - dot_size, y - dot_size, x + dot_size, y + dot_size], 
                        fill=text_color)
    
    return img

def main():
    """主函數"""
    # 確保 icons 目錄存在
    icons_dir = "icons"
    if not os.path.exists(icons_dir):
        os.makedirs(icons_dir)
    
    # 生成各種尺寸的圖示
    sizes = [16, 48, 128]
    
    for size in sizes:
        print(f"生成 {size}x{size} 圖示...")
        img = create_base_encoder_icon(size)
        
        # 保存圖示
        filename = f"{icons_dir}/icon{size}.png"
        img.save(filename, "PNG", optimize=True)
        
        # 檢查檔案大小
        file_size = os.path.getsize(filename)
        print(f"  ✅ {filename} ({file_size} bytes)")
    
    print("\n🎉 所有圖示生成完成！")
    print("\n📋 使用方式：")
    print("1. 檢查 icons/ 目錄中的新圖示檔案")
    print("2. 使用 ./prepare-release.sh 重新打包")
    print("3. 上傳到 Chrome Web Store")

if __name__ == "__main__":
    main()
