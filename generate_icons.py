#!/usr/bin/env python3
"""
Chrome 擴充功能圖示生成器
自動生成 16x16, 48x48, 128x128 的 PNG 圖示
"""

import os
from PIL import Image, ImageDraw, ImageFont
import math

def create_icon(size, filename):
    """創建指定尺寸的圖示"""
    # 創建畫布
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 顏色定義
    primary_color = (66, 133, 244)  # Google Blue
    secondary_color = (52, 168, 83)  # Google Green
    white = (255, 255, 255, 255)
    
    # 繪製漸層背景
    corner_radius = size // 8
    draw.rounded_rectangle([0, 0, size-1, size-1], radius=corner_radius, fill=primary_color)
    
    # 添加漸層效果（簡化版）
    for i in range(size//2):
        alpha = int(255 * (1 - i / (size//2)) * 0.3)
        overlay_color = (*secondary_color, alpha)
        draw.rounded_rectangle([i, i, size-1-i, size-1-i], radius=max(1, corner_radius-i//2), outline=overlay_color)
    
    # 根據尺寸繪製不同內容
    if size >= 128:
        # 大圖示：完整文字和符號
        try:
            font_large = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", size//4)
            font_small = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", size//6)
        except:
            font_large = ImageFont.load_default()
            font_small = ImageFont.load_default()
        
        # 繪製 "BASE"
        text = "BASE"
        bbox = draw.textbbox((0, 0), text, font=font_small)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (size - text_width) // 2
        y = size // 4
        draw.text((x, y), text, font=font_small, fill=white)
        
        # 繪製 "64"
        text = "64"
        bbox = draw.textbbox((0, 0), text, font=font_large)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (size - text_width) // 2
        y = size // 2 - text_height // 2
        draw.text((x, y), text, font=font_large, fill=white)
        
        # 繪製轉換箭頭
        arrow_y = size * 3 // 4
        arrow_start = size // 4
        arrow_end = size * 3 // 4
        arrow_size = size // 16
        
        # 箭頭主線
        draw.line([arrow_start, arrow_y, arrow_end, arrow_y], fill=white, width=3)
        # 箭頭頭部
        draw.line([arrow_end - arrow_size, arrow_y - arrow_size, arrow_end, arrow_y], fill=white, width=3)
        draw.line([arrow_end - arrow_size, arrow_y + arrow_size, arrow_end, arrow_y], fill=white, width=3)
        
        # 編碼點
        dot_y = size * 7 // 8
        dot_spacing = size // 8
        dot_radius = size // 32
        for i in range(4):
            x = size // 4 + i * dot_spacing
            draw.ellipse([x-dot_radius, dot_y-dot_radius, x+dot_radius, dot_y+dot_radius], fill=white)
    
    elif size >= 48:
        # 中圖示：簡化設計
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", size//4)
        except:
            font = ImageFont.load_default()
        
        # 繪製 "B64"
        text = "B64"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (size - text_width) // 2
        y = size // 3
        draw.text((x, y), text, font=font, fill=white)
        
        # 簡化箭頭
        arrow_y = size * 2 // 3
        arrow_start = size // 3
        arrow_end = size * 2 // 3
        arrow_size = size // 12
        
        draw.line([arrow_start, arrow_y, arrow_end, arrow_y], fill=white, width=2)
        draw.line([arrow_end - arrow_size, arrow_y - arrow_size//2, arrow_end, arrow_y], fill=white, width=2)
        draw.line([arrow_end - arrow_size, arrow_y + arrow_size//2, arrow_end, arrow_y], fill=white, width=2)
        
        # 編碼點
        dot_y = size * 5 // 6
        dot_radius = size // 24
        for i in range(3):
            x = size // 3 + i * size // 6
            draw.ellipse([x-dot_radius, dot_y-dot_radius, x+dot_radius, dot_y+dot_radius], fill=white)
    
    else:
        # 小圖示：最簡設計
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", size//3)
        except:
            font = ImageFont.load_default()
        
        # 繪製 "64"
        text = "64"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (size - text_width) // 2
        y = (size - text_height) // 2
        draw.text((x, y), text, font=font, fill=white)
    
    # 保存圖示
    img.save(filename, 'PNG', optimize=True)
    print(f"✅ 已生成 {filename} ({size}x{size})")

def main():
    """主函數"""
    print("🎨 開始生成 Chrome 擴充功能圖示...")
    
    # 確保 icons 目錄存在
    icons_dir = "icons"
    if not os.path.exists(icons_dir):
        os.makedirs(icons_dir)
        print(f"📁 已創建 {icons_dir} 目錄")
    
    # 生成各尺寸圖示
    sizes = [16, 48, 128]
    
    for size in sizes:
        filename = os.path.join(icons_dir, f"icon{size}.png")
        create_icon(size, filename)
    
    print("\n🎉 所有圖示生成完成！")
    print("📋 接下來請：")
    print("1. 檢查 icons/ 目錄中的新圖示")
    print("2. 執行 ./prepare-release.sh 重新建立發佈檔案")
    print("3. 上傳新的 ZIP 檔案到 Chrome Web Store")

if __name__ == "__main__":
    try:
        main()
    except ImportError:
        print("❌ 錯誤：需要安裝 Pillow 庫")
        print("請執行：pip install Pillow")
    except Exception as e:
        print(f"❌ 發生錯誤：{e}")
        print("請檢查權限或手動使用網頁版圖示生成器")
