# ER Crop (zercrop)

แอป SAP Fiori สำหรับดูข้อมูลฤดูกาลเพาะปลูก (Crop Master) ว่าแต่ละ crop ใช้เมล็ดพันธุ์และวัสดุอะไร และมีช่วงวันที่เท่าไร

## ทำอะไรได้บ้าง

- **List Report:** แสดงรายการ crop เป็นตาราง กรองและค้นหาได้ ตัวกรองวันที่เลือกเป็นช่วงได้ และบันทึก variant ได้
- **Object Page:** ดูรายละเอียดของแต่ละ crop ได้แก่
  - Crop Code / Crop Name
  - Seed Code / Material
  - วันเริ่มและวันสิ้นสุดของ crop (Crop Start / End)
  - ช่วงวันที่มีผล (Valid From / Valid To)

## ข้อมูลทางเทคนิค

| รายการ | ค่า |
| --- | --- |
| Template | List Report / Object Page (OData V2) |
| App ID | `com.lannaagro.zlaco.zercrop` |
| OData Service | `/sap/opu/odata/sap/ZUI_TMM_ER_CROP_V4/` |
| Entity หลัก | `ErCrop` |
| BSP App / Package | `ZTMMERCROP` / `ZDEV` |
| UI5 Version | 1.136.0 |

หน้าจอทั้งหมดสร้างจาก annotation (`webapp/annotations/annotation.xml`) และไม่มี custom code

## คำสั่งที่ใช้บ่อย

```bash
npm install          # ติดตั้ง dependency
npm start            # รันแอปโดยต่อกับ SAP backend
npm run start-mock   # รันแอปด้วย mock data
npm run build        # build ไปที่ dist/
npm run deploy       # build แล้ว deploy ขึ้น ABAP repository
```
