# Queue Car (queue_car)

แอปหน้าจอแสดงคิวรถที่ลานชั่งน้ำหนัก ทำไว้เปิดบนจอใหญ่หรือทีวี เพื่อแสดงทะเบียนรถคันล่าสุดของแต่ละช่องชั่ง

## ทำอะไรได้บ้าง

- แบ่งจอเป็น 4 ช่อง (2x2) คือช่อง 01 ถึง 04 แต่ละช่องมีสีของตัวเอง
- แต่ละช่องแสดงเลขทะเบียนรถตัวใหญ่และชื่อหมู่บ้านของรถคันล่าสุดในคิวนั้น ถ้าคิวไหนไม่มีรถจะแสดงว่า "ว่าง"
- **รีเฟรชอัตโนมัติทุก 1 นาที** และกดปุ่มรีเฟรช (มุมขวาล่าง) เพื่อดึงข้อมูลทันทีได้
- มุมขวาล่างแสดงเวลาที่อัปเดตล่าสุด และถ้าโหลดข้อมูลไม่สำเร็จจะแจ้งตรงนั้น
- ใช้ธีมสีเข้ม และตัวอักษรปรับขนาดตามขนาดจอ

## หลักการทำงาน

1. ดึงข้อมูลจาก entity `WeighingQueue` โดยเรียงจากวันที่และเวลาเข้าชั่งล่าสุด (`ZweDate desc, ZweTimein desc`)
2. จัดกลุ่มตามฟิลด์ `ZweQueue` (01 ถึง 04) แล้วหยิบรถคันล่าสุดของแต่ละคิวมาแสดง
3. ตั้งเวลาโหลดรอบถัดไปหลังจากรอบปัจจุบันโหลดเสร็จแล้ว request จึงไม่ซ้อนกัน

## ข้อมูลทางเทคนิค

| รายการ | ค่า |
| --- | --- |
| Template | Basic (freestyle UI5, OData V2) |
| App ID | `com.lannaagro.zdev.queuecar` |
| OData Service | `/sap/opu/odata/sap/ZSB_TMM_WE_QUEUE_O2/` |
| Entity | `WeighingQueue` |
| BSP App / Package | `ZQUEUE_VIEW` / `ZDEV` |
| UI5 Version | 1.136.0 |

ไฟล์สำคัญ:
- `webapp/view/View1.view.xml`: layout ของ 4 ช่องและปุ่มรีเฟรช
- `webapp/controller/View1.controller.js`: ดึงข้อมูล จัดคิว และตั้งเวลารีเฟรช (ปรับรอบได้ที่ `REFRESH_INTERVAL`)
- `webapp/css/style.css`: สีและขนาดตัวอักษรของหน้าจอ

## คำสั่งที่ใช้บ่อย

```bash
npm install          # ติดตั้ง dependency
npm start            # รันแอปโดยต่อกับ SAP backend
npm run build        # build ไปที่ dist/
npm run deploy-test  # ทดสอบ deploy (ไม่เขียนลงระบบจริง)
npm run deploy       # build แล้ว deploy ขึ้น ABAP repository
```

> ชื่อ BSP app ต้องขึ้นต้นด้วย `Z` หรือ `Y` ถ้าไม่ขึ้นต้นแบบนั้น ตอน deploy จะได้ error 400
