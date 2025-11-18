# SOLO QR Code / 二维码生成与识别

一个纯前端的 QR 码生成与识别应用，支持中英对照界面、前/后摄像头切换、定格识别结果与一键复制。

## Features / 功能
- Generate QR codes to PNG / 生成二维码并下载 PNG
- Read via camera with facing toggle / 摄像头识别并支持前后切换
- Freeze recognized content / 定格识别内容
- Copy recognized text / 一键复制识别结果
- All in browser, no data upload / 纯前端，本地处理

## Tech / 技术
- `qrcode` for generation
- `BarcodeDetector` with `jsQR` fallback for reading
- Static site (no build step) / 静态站点（无需构建）

## Local Run / 本地运行
- `python -m http.server 8000`
- Open `http://localhost:8000/`

## Deploy to Vercel / 部署到 Vercel
1. Open https://vercel.com/new and import repo `chinesebayg/SOLOqrcode`
2. Framework: `Other (Static)`; Root: `/`; Build: None; Output: None
3. Deploy; visit `https://<project>.vercel.app/`

## Notes / 注意
- Camera needs HTTPS; Vercel provides it / 摄像头需 HTTPS，Vercel 默认提供
- Mobile front camera toggle depends on device support / 前置摄像头切换取决于设备支持