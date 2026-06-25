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

App có Netlify Function tại `/api/worldcup`. Frontend sẽ tự gọi endpoint này khi chạy trên Netlify và tự refresh mỗi 60 phút khi người dùng đang mở trang. Netlify Function cache theo giờ Việt Nam để tiết kiệm quota API: 30 phút trong khung 00h-08h, 6 giờ ở các khung giờ còn lại. Nếu API chưa cấu hình, hết quota hoặc dữ liệu World Cup 2026 trên API chưa đầy đủ, app sẽ báo chưa có dữ liệu live hợp lệ thay vì hiển thị tỷ số dự phòng cũ.

### Nguồn API được hỗ trợ

1. **API-FOOTBALL / API-SPORTS**  
   Biến môi trường Netlify:
   - `API_FOOTBALL_KEY`: API key của bạn
   - `API_FOOTBALL_LEAGUE_ID`: mặc định `1`
   - `API_FOOTBALL_LEAGUE_IDS`: danh sách league id cách nhau bằng dấu phẩy nếu cần thử nhiều id
   - `API_FOOTBALL_SEASON`: mặc định `2026`
   - `API_CACHE_SECONDS`: nếu đặt biến này thì ép một mức cache cố định cho cả ngày
   - `API_ACTIVE_CACHE_SECONDS`: mặc định `1800` giây, tức 30 phút trong khung 00h-08h giờ Việt Nam
   - `API_IDLE_CACHE_SECONDS`: mặc định `21600` giây, tức 6 giờ ngoài khung 00h-08h giờ Việt Nam
   - `API_DETAIL_CACHE_SECONDS`: mặc định `1800` giây, tức 30 phút cho chi tiết từng trận
   - `API_FALLBACK_CACHE_SECONDS`: mặc định `3600` giây, tức 1 giờ khi API lỗi hoặc hết quota
   - `API_FOOTBALL_AUTO_DISCOVER`: đặt `true` nếu muốn tự tìm thêm World Cup league id
   - `API_FOOTBALL_TRY_FALLBACK_IDS`: đặt `true` nếu muốn thử thêm các id dự phòng, tốn request hơn

2. **football-data.org**  
   Biến môi trường Netlify:
   - `FOOTBALL_DATA_TOKEN`: API token của bạn

3. **Tin tức RSS Việt Nam**  
   Tab Tin tức lấy RSS từ VnExpress, Tuổi Trẻ, Thanh Niên và VietnamNet, sau đó lọc các bài liên quan World Cup/FIFA/Cúp thế giới. Thumbnail lấy từ RSS hoặc ảnh trong mô tả bài viết nếu báo cung cấp, app không tự tạo ảnh. Tin tức được cache mặc định 1 giờ bằng `NEWS_CACHE_SECONDS=3600`.

### Cách cấu hình trên Netlify

1. Vào site trên Netlify.
2. Chọn **Site configuration** -> **Environment variables**.
3. Thêm `API_FOOTBALL_KEY` hoặc `FOOTBALL_DATA_TOKEN`.
4. Deploy lại site.

Ưu tiên dùng `API_FOOTBALL_KEY` vì API này thường có fixtures, standings và dữ liệu trận đấu chi tiết hơn. App dùng fixtures/lịch đấu làm nguồn chính và có thể tự tính bảng xếp hạng từ các trận đã kết thúc nếu endpoint standings chưa có dữ liệu. Gói miễn phí có giới hạn request/ngày; cache theo giờ Việt Nam giúp nhiều người truy cập vẫn dùng chung dữ liệu cache thay vì mỗi lượt vào web lại gọi API thật.

## Ghi chú dữ liệu

Dữ liệu mẫu trong `app.js` chỉ dùng khi phát triển giao diện cục bộ. Khi chạy trên Netlify, web ưu tiên dữ liệu từ `/api/worldcup`; nếu API live không hợp lệ, app sẽ không coi dữ liệu mẫu là kết quả thật.
