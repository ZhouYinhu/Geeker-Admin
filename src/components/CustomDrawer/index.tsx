import { defineComponent, ref, computed } from "vue";
import { ElDrawer, drawerProps } from "element-plus";
import type { DrawerProps } from "element-plus";
import { transformPx } from "@/utils/px2rem";
type CustomDrawerProps = Partial<
  DrawerProps & {
    modelValue: boolean;
  }
>;
type DrawerInstance = InstanceType<typeof ElDrawer>;
export default defineComponent({
  props: drawerProps,
  emits: ["update:modelValue"],
  setup(props: CustomDrawerProps, ctx) {
    const drawerRef = ref<DrawerInstance>();
    const dialogVisible = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        ctx.emit("update:modelValue", value);
      }
    });
    const handleClose = () => {
      drawerRef.value?.handleClose();
    };
    ctx.expose({
      handleClose
    });
    return () => (
      <ElDrawer
        v-model={dialogVisible.value}
        ref={drawerRef}
        {...props}
        size={transformPx(props.size)}
        close-on-press-escape={false}
        close-on-click-modal={false}
        data-alias="custom-drawer"
      >
        {{ default: () => ctx.slots.default?.(), header: () => ctx.slots.header?.(), footer: () => ctx.slots.footer?.() }}
      </ElDrawer>
    );
  }
});
