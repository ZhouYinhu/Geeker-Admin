import { defineComponent, ref } from "vue";
import { ElForm } from "element-plus";
import type { FormProps, FormInstance, FormItemProp, FormValidateCallback } from "element-plus";
import { formProps } from "element-plus";
import { transformPx } from "@/utils/px2rem";
type Arrayable<T> = T | T[];
type CustomFormProps = Partial<FormProps>;
export default defineComponent({
  props: formProps,
  setup(props: CustomFormProps, ctx) {
    const formRef = ref<FormInstance>();
    const validate = (callback?: FormValidateCallback | undefined) => {
      return formRef.value?.validate(callback);
    };
    const validateField = (props?: Arrayable<FormItemProp> | undefined, callback?: FormValidateCallback | undefined) => {
      return formRef.value?.validateField(props, callback);
    };
    const resetFields = (props?: Arrayable<FormItemProp> | undefined) => {
      return formRef.value?.resetFields(props);
    };
    const scrollToField = (prop: FormItemProp) => {
      return formRef.value?.scrollToField(prop);
    };
    const clearValidate = (props?: Arrayable<FormItemProp> | undefined) => {
      return formRef.value?.clearValidate(props);
    };
    ctx.expose({
      validate,
      validateField,
      resetFields,
      scrollToField,
      clearValidate
    });
    return () => (
      <ElForm {...props} ref={formRef} label-width={transformPx(props.labelWidth)} data-alias="custom-form">
        {{ default: () => ctx.slots.default?.() }}
      </ElForm>
    );
  }
});
