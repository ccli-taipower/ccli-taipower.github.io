# ccli-taipower.github.io

BravoRadio 網站 · BRAVO FM 91.3 非官方收聽 App

## 檔案結構

```
├── .well-known/
│   └── apple-app-site-association   # Universal Links 設定（無副檔名）
├── index.html                        # 首頁
├── program/index.html                # 節目分享著陸頁
├── unit/index.html                   # 單元分享著陸頁
├── episode/index.html                # 曲目分享著陸頁
└── assets/
    ├── style.css
    └── landing.js                    # 讀取 query string 填入資料 + App Store 連結
```

## 上架後更新

1. 編輯 `assets/landing.js`，把 `const APP_STORE_URL = ""` 填入 App Store URL
2. 編輯 4 個 HTML 檔（首頁 + 三個著陸頁）的 "App 即將上架" 文字（已由 JS 自動覆蓋，通常不用改 HTML）
3. commit + push，GitHub Pages 會自動部署
