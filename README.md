# LACO Fiori Custom Apps

รวมแอป SAP Fiori (UI5) ที่พัฒนาเองสำหรับงานไร่และลานชั่งน้ำหนัก ทุกแอปเชื่อมต่อกับระบบ SAP S/4HANA On-Premise ผ่าน OData V2

## รายการโปรแกรม

| โปรแกรม | ชื่อแอป | ทำอะไร | BSP App |
| --- | --- | --- | --- |
| [zfarmer](zfarmer/README.md) | Z Farmer | จัดการข้อมูลชาวไร่ (Farmer Master): ค้นหา ดู และแก้ไข | `ZTMMFAMER` |
| [zercrop](zercrop/README.md) | ER Crop | ดูข้อมูล crop: crop code, seed, material และช่วงวันที่ของแต่ละ crop | `ZTMMERCROP` |
| [queue_car](queue_car/README.md) | Queue Car | หน้าจอแสดงคิวรถ 4 ช่องที่ลานชั่ง สำหรับเปิดบนจอใหญ่ รีเฟรชอัตโนมัติทุก 1 นาที | `ZQUEUE_VIEW` |

### zfarmer: ข้อมูลชาวไร่
- ใช้ template List Report / Object Page และ entity `Farmer`
- Service: `ZUI_TMM_WE_FARMER_WEB_V2`

### zercrop: ข้อมูล Crop
- ใช้ template List Report / Object Page และ entity `ErCrop`
- Service: `ZUI_TMM_ER_CROP_V4`
- หน้าจอสร้างจาก annotation ทั้งหมด ไม่มี custom code

### queue_car: จอแสดงคิวรถ
- เป็น freestyle UI5 (Basic template) ดึงข้อมูลจาก entity `WeighingQueue`
- Service: `ZSB_TMM_WE_QUEUE_O2`
- แสดงทะเบียนรถและหมู่บ้านของรถคันล่าสุดในคิว 01 ถึง 04 และมีปุ่มรีเฟรชที่มุมขวาล่าง

## ข้อมูลร่วม

| รายการ | ค่า |
| --- | --- |
| SAP System | `https://vhlnwds4ap01.sap.lannaagro.com:44300` (client 110) |
| ABAP Package | `ZDEV` |
| UI5 Version | 1.136.0 (theme `sap_horizon`) |
| เครื่องมือ | SAP Fiori tools (`@sap/ux-ui5-tooling`), UI5 CLI v4 |

## เริ่มต้นใช้งาน

แต่ละแอปเป็นโปรเจกต์ npm แยกกัน ให้เข้าไปที่โฟลเดอร์ของแอปที่ต้องการก่อน แล้วค่อยรันคำสั่ง:

```bash
cd <ชื่อโปรแกรม>
npm install          # ติดตั้ง dependency (ครั้งแรก)
npm start            # รันแอปโดยต่อกับ SAP backend
npm run start-mock   # รันแอปด้วย mock data
npm run build        # build ไปที่ dist/
npm run deploy       # build แล้ว deploy ขึ้น ABAP repository
```

## หมายเหตุการ deploy

- ตั้งค่า deploy อยู่ใน `ui5-deploy.yaml` ของแต่ละแอป และไฟล์นี้ไม่ถูก commit (อยู่ใน `.gitignore`) เพราะมี transport request ของแต่ละคน
- ชื่อ BSP app ต้องขึ้นต้นด้วย `Z` หรือ `Y` และยาวไม่เกิน 15 ตัวอักษร ถ้าไม่เป็นไปตามนี้ ตอน deploy จะได้ error 400
- ถ้า deploy ไม่ผ่าน ให้ลอง `npm run deploy-test` ก่อน (มีใน zercrop และ queue_car เป็นการทดสอบ ไม่เขียนลงระบบจริง) เพื่อดูข้อความ error จาก SAP
