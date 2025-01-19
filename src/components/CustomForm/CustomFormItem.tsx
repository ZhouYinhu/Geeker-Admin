import { defineComponent, ref } from "vue";
import { ElFormItem } from "element-plus";
import type { FormItemProps, FormItemInstance, FormValidateCallback } from "element-plus";
import { transformPx } from "@/utils/px2rem";
import { formItemProps } from "element-plus";
type CustomFormItemProps = FormItemProps;
export default defineComponent({
  props: formItemProps,
  setup(props: Partial<CustomFormItemProps>, ctx) {
    const formItemRef = ref<FormItemInstance>();
    const validate = (trigger: string, callback?: FormValidateCallback | undefined) => {
      return formItemRef.value?.validate(trigger, callback);
    };
    const resetField = () => {
      return formItemRef.value?.resetField();
    };
    const clearValidate = () => {
      return formItemRef.value?.clearValidate();
    };
    ctx.expose({
      validate,
      resetField,
      clearValidate
    });
    return () => (
      <ElFormItem ref={formItemRef} {...props} label-width={transformPx(props.labelWidth)} data-alias="custom-form-item">
        {{ default: () => ctx.slots.default?.() }}
      </ElFormItem>
    );
  }
});
