# World Cup 2026 App

Ứng dụng tĩnh bằng HTML, CSS và JavaScript để xem lịch thi đấu World Cup 2026 bằng tiếng Việt.

## Tính năng

- Xem bảng xếp hạng theo bảng đấu.
- Xem tỷ số các trận đã qua.
- Xem lịch thi đấu sắp tới.
- Click vào trận đã qua để xem chi tiết: cầm bóng, bàn thắng, thẻ vàng, thẻ đỏ, lỗi và diễn biến chính.
- Tìm kiếm theo đội bóng, sân vận động hoặc thành phố.
- Lọc theo bảng đấu.

## Chạy local

Mở trực tiếp file `index.html` trong trình duyệt hoặc chạy một static server:

```bash
python -m http.server 5176
```

Sau đó mở:

```text
http://localhost:5176
```

## Deploy lên Netlify

### Cách 1: Kéo thả nhanh

1. Vào Netlify.
2. Chọn **Add new site**.
3. Chọn **Deploy manually**.
4. Kéo thả toàn bộ thư mục này lên Netlify.

### Cách 2: Deploy qua GitHub

1. Tạo repository mới trên GitHub.
2. Push toàn bộ thư mục này lên repository đó.
3. Trong Netlify, chọn **Add new site** -> **Import an existing project**.
4. Chọn repository GitHub vừa tạo.
5. Build settings:
   - Build command: để trống
   - Publish directory: `.`
6. Deploy.

## Tự cập nhật dữ liệu bằng API

App có Netlify Function tại `/api/worldcup`. Frontend sẽ tự gọi endpoint này khi chạy trên Netlify. Nếu API chưa cấu hình hoặc bị lỗi, app sẽ dùng dữ liệu dự phòng trong `app.js`.

### Nguồn API được hỗ trợ

1. **API-FOOTBALL / API-SPORTS**  
   Biến môi trường Netlify:
   - `API_FOOTBALL_KEY`: API key của bạn
   - `API_FOOTBALL_LEAGUE_ID`: mặc định `1`
   - `API_FOOTBALL_SEASON`: mặc định `2026`

2. **football-data.org**  
   Biến môi trường Netlify:
   - `FOOTBALL_DATA_TOKEN`: API token của bạn

### Cách cấu hình trên Netlify

1. Vào site trên Netlify.
2. Chọn **Site configuration** -> **Environment variables**.
3. Thêm `API_FOOTBALL_KEY` hoặc `FOOTBALL_DATA_TOKEN`.
4. Deploy lại site.

Ưu tiên dùng `API_FOOTBALL_KEY` vì API này thường có fixtures, standings và dữ liệu trận đấu chi tiết hơn. Gói miễn phí có giới hạn request/ngày, nên function đã bật cache ngắn hạn để giảm số lần gọi API.

## Ghi chú dữ liệu

Dữ liệu trong `app.js` hiện là fallback để web vẫn chạy khi API chưa cấu hình. Khi có API key trên Netlify, web sẽ ưu tiên dữ liệu từ `/api/worldcup`.
