sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    // OData V2 ของ Service Binding ZSB_TMM_WE_QUEUE_O2 (ตรงกับ mainService ใน manifest.json)
    var SERVICE_URL = "/sap/opu/odata/sap/ZSB_TMM_WE_QUEUE_O2/WeighingQueue?$orderby=ZweDate desc,ZweTimein desc&$format=json";
    var REFRESH_INTERVAL = 60000; // รีเฟรชอัตโนมัติทุก 1 นาที
    var QUEUE_KEYS = { "01": "q1", "02": "q2", "03": "q3", "04": "q4" };

    function emptyQueues(sCarNo) {
        return {
            q1: { ZcarNo: sCarNo, ZweNo: "-", ZweNet: "" },
            q2: { ZcarNo: sCarNo, ZweNo: "-", ZweNet: "" },
            q3: { ZcarNo: sCarNo, ZweNo: "-", ZweNet: "" },
            q4: { ZcarNo: sCarNo, ZweNo: "-", ZweNet: "" }
        };
    }

    return Controller.extend("com.lannaagro.zdev.queuecar.controller.View1", {
        onInit: function () {
            // โมเดลสำหรับเก็บค่าแสดงผลแยก 4 คิว
            this.getView().setModel(new JSONModel(emptyQueues("---")), "display");

            // สถานะการโหลด: busy + เวลาอัปเดตล่าสุด
            this.getView().setModel(new JSONModel({ busy: false, status: "" }), "state");

            this.loadQueueData();
        },

        // ปุ่มรีเฟรชด้วยมือ
        onRefresh: function () {
            this.loadQueueData();
        },

        loadQueueData: function () {
            var oState = this.getView().getModel("state");
            if (oState.getProperty("/busy")) {
                return;
            }
            oState.setProperty("/busy", true);

            // เริ่มนับ 1 นาทีใหม่ทุกครั้งที่โหลด (กดรีเฟรชเองแล้วจะไม่โหลดซ้ำทันที)
            clearTimeout(this._timerId);

            fetch(SERVICE_URL, {
                method: "GET",
                headers: { "Accept": "application/json" }
            })
            .then(function (res) {
                if (!res.ok) {
                    throw new Error("HTTP " + res.status);
                }
                return res.json();
            })
            .then(function (data) {
                var aItems = (data.d && data.d.results) || data.value || [];
                var oQueues = emptyQueues("ว่าง");
                var oFilled = {};

                // หยิบรถคันล่าสุดของแต่ละคิว (รองรับ "1", " 1", 1 ให้เป็น "01")
                aItems.forEach(function (item) {
                    var sQueue = String(item.ZweQueue == null ? "" : item.ZweQueue).trim().padStart(2, "0");
                    var sKey = QUEUE_KEYS[sQueue];
                    if (sKey && !oFilled[sKey]) {
                        oQueues[sKey] = item;
                        oFilled[sKey] = true;
                    }
                });

                this.getView().getModel("display").setData(oQueues);
                oState.setProperty("/status", "อัปเดตล่าสุด " + new Date().toLocaleTimeString("th-TH"));
            }.bind(this))
            .catch(function () {
                oState.setProperty("/status", "โหลดข้อมูลไม่สำเร็จ " + new Date().toLocaleTimeString("th-TH"));
            })
            .finally(function () {
                oState.setProperty("/busy", false);
                if (!this._bExited) {
                    this._timerId = setTimeout(this.loadQueueData.bind(this), REFRESH_INTERVAL);
                }
            }.bind(this));
        },

        onExit: function () {
            this._bExited = true;
            clearTimeout(this._timerId);
        }
    });
});
