import { isNumber } from "./is";

const isUsePx2Rem = true;

/**
 * 获取基于设备宽度的缩放比例。
 * 该函数没有参数。
 * @returns 返回一个对象，包含以下属性：
 * - isUsePx2Rem：指示是否使用 px 转换为 rem。
 * - fontSize：根据设备宽度计算出的基础字体大小。
 * - scale：字体大小与基础字体大小（16px）的缩放比例。
 * @comment
 * // 屏幕宽度小于等于 1280px 时，字体大小 12px
 * // 屏幕宽度在 1280px 和 1440px 之间时，字体大小 12px - 14px
 * // 屏幕宽度在 1440px 和 1920px 之间时，字体大小 14px - 16px
 * // 屏幕宽度在 1920px 和 3840px 之间时，字体大小 16px - 19px
 * // 屏幕宽度大于 3840px 时，字体大小 19px
 */
export const getRemScale = () => {
  const screenWidth = window.screen.width;
  let fontSize = 16;

  if (screenWidth <= 1280) {
    fontSize = 12;
  } else if (screenWidth > 1280 && screenWidth <= 1440) {
    fontSize = 12 + ((screenWidth - 1280) / 160) * 2;
  } else if (screenWidth > 1440 && screenWidth <= 1920) {
    fontSize = 14 + ((screenWidth - 1440) / 480) * 2;
  } else if (screenWidth > 1920 && screenWidth <= 3840) {
    fontSize = 16 + ((screenWidth - 1920) / 1920) * 3;
  } else {
    fontSize = 19;
  }

  return {
    isUsePx2Rem: isUsePx2Rem,
    fontSize,
    scale: fontSize / 16
  };
};

export const transformPx = (px?: number | string) => {
  const { isUsePx2Rem, scale } = getRemScale();
  if (!isUsePx2Rem || !px) {
    return px;
  }
  if (isNumber(px) || !Number.isNaN(+px)) {
    return +px * scale + "px";
  } else if (px.indexOf("px") > -1) {
    const pxNum = Number(px.slice(0, px.length - 2));
    return pxNum * scale + "px";
  } else {
    return px;
  }
};
