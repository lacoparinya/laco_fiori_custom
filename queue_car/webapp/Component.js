sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/lannaagro/zdev/queuecar/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("com.lannaagro.zdev.queuecar.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // log สถานะ OData model หลัก (mainService)
            var oModel = this.getModel();
            if (oModel && oModel.attachMetadataFailed) {
                oModel.attachMetadataLoaded(function () {
                    console.log("[QueueCar] mainService metadata โหลดสำเร็จ");
                });
                oModel.attachMetadataFailed(function (oEvent) {
                    console.error("[QueueCar] mainService metadata โหลดไม่สำเร็จ:", oEvent.getParameters());
                });
                oModel.attachRequestFailed(function (oEvent) {
                    console.error("[QueueCar] mainService request ล้มเหลว:", oEvent.getParameters());
                });
            }

            // enable routing
            this.getRouter().initialize();
        }
    });
});