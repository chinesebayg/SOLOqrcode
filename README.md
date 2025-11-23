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

## Usage / 使用说明
- Generate: 输入文本，选择尺寸与容错级别，点击 `生成 / Generate`，再点击 `下载 / Download` 保存 PNG
- Camera: 选择 `摄像头 / Camera Facing`（后置/前置），点击 `开启摄像头 / Start`，将二维码置于取景框
- Freeze: 点击 `定格 / Freeze` 锁定当前识别内容；再次点击 `取消定格 / Unfreeze` 解除锁定
- Copy: 点击 `复制内容 / Copy` 将识别内容复制到剪贴板
- Stop: 点击 `停止 / Stop` 关闭摄像头
- File Upload: 也可通过选择本地图片文件进行识别

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

## Release / 版本发布
- Latest: `v3.0.0` — Light theme, footer credit, bilingual UI, camera facing toggle, Freeze & Copy
- GitHub Release: https://github.com/chinesebayg/SOLOqrcode/releases/tag/v3.0.0