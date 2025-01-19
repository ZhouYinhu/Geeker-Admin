import { App } from "vue";
import CustomDrawer from "./CustomDrawer/index";
import CustomDialog from "./CustomDialog/index";
import CustomForm from "./CustomForm/index";
import CustomFormItem from "./CustomForm/CustomFormItem";
import { getRemScale } from "@/utils/px2rem";
export default {
  install(app: App) {
    const { isUsePx2Rem } = getRemScale();
    if (isUsePx2Rem) {
      app.component("ElDrawer", CustomDrawer);
      app.component("ElDialog", CustomDialog);
      app.component("ElForm", CustomForm);
      app.component("ElFormItem", CustomFormItem);
    }
  }
};
