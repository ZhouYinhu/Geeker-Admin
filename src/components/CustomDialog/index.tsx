import { defineComponent, computed } from "vue";
import { ElDialog, dialogProps } from "element-plus";
import type { DialogProps } from "element-plus";
import { transformPx } from "@/utils/px2rem";
type CustomDialogProps = Partial<
  DialogProps & {
    modelValue: boolean;
  }
>;
export default defineComponent({
  props: dialogProps,
  emits: ["update:modelValue"],
  setup(props: CustomDialogProps, ctx) {
    const dialogVisible = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        ctx.emit("update:modelValue", value);
      }
    });
    return () => (
      <ElDialog
        {...props}
        v-model={dialogVisible.value}
        width={transformPx(props.width)}
        close-on-press-escape={false}
        close-on-click-modal={false}
        data-alias="custom-dialog"
      >
        {{ default: () => ctx.slots.default?.(), header: () => ctx.slots.header?.(), footer: () => ctx.slots.footer?.() }}
      </ElDialog>
    );
  }
});
