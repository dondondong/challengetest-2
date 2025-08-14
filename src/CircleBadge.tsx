import { motion, type Variants } from "framer-motion";

type CircleBadgeProps = {
  size: number;
  isDone?: boolean;
  isSelected?: boolean;
  isHovered?: boolean;

  // 未完成（normal）
  strokeColor?: string;
  selectedStrokeColor?: string;
  strokeWidth?: number;
  selectedStrokeWidth?: number;
  hoverStrokeColor?: string;
  seletedHoverStrokeColor?: string;
  hoverStrokeWidth?: number;
  selectedHoverStrokeWidth?: number;

  // 已完成（done）
  doneStrokeColor?: string;
  selectedDoneStrokeColor?: string;
  doneStrokeWidth?: number;
  selectedDoneStrokeWidth?: number;
  doneHoverStrokeColor?: string;
  selectedDoneHoverStrokeColor?: string;
  doneHoverStrokeWidth?: number;
  selectedDoneHoverStrokeWidth?: number;

  customVariants?: Variants;
  checkSrc?: string;
};

export default function CircleBadge({
  size,
  isDone = false,
  isSelected = false,

  // 未完成
  strokeColor = "rgba(255,255,255,.3)",
  selectedStrokeColor = 'rgba(255,255,255,.92)',
  strokeWidth = 2.5,
  selectedStrokeWidth = 3.5,
  hoverStrokeColor = "rgba(255,255,255,.4)",
  seletedHoverStrokeColor = "rgba(255,255,255,1)",
  hoverStrokeWidth = 2.5,
  selectedHoverStrokeWidth = 3.5,

  // 已完成
  doneStrokeColor = "rgba(255,255,255,.1)",
  selectedDoneStrokeColor = "rgba(255,255,255,1)",
  doneStrokeWidth = 2.5,
  selectedDoneStrokeWidth = 2.5,
  doneHoverStrokeColor = "rgba(255,255,255,.2)",
  selectedDoneHoverStrokeColor = "rgba(255,255,255,1)",
  doneHoverStrokeWidth = 2.5,
  selectedDoneHoverStrokeWidth = 2.5,

  customVariants,
  checkSrc = "/tick_summary.png",
}: CircleBadgeProps) {
  // 半径用“最大描边”算，避免 hover 变粗被裁切
  const maxSW = Math.max(
    strokeWidth,
    hoverStrokeWidth,
    doneStrokeWidth,
    doneHoverStrokeWidth
  );
  const r = (size - maxSW) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const circleVariants: Variants = isDone
    ? {
      rest: {
        stroke: isSelected ? selectedDoneStrokeColor : doneStrokeColor,
        strokeWidth: isSelected ? selectedDoneStrokeWidth : doneStrokeWidth,
        fill: "none",
        strokeDasharray: undefined
      },
      hover: {
        stroke: isSelected ? selectedDoneHoverStrokeColor : doneHoverStrokeColor,
        strokeWidth: isSelected ? selectedDoneHoverStrokeWidth : doneHoverStrokeWidth
      },
    }
    : {
      rest: {
        stroke: isSelected ? selectedStrokeColor : strokeColor,
        strokeWidth: isSelected ? selectedStrokeWidth : strokeWidth,
        fill: "none",
        strokeDasharray: "4 3.75"
      },
      hover: {
        stroke: isSelected ? seletedHoverStrokeColor : hoverStrokeColor,
        strokeWidth: isSelected ? selectedHoverStrokeWidth : hoverStrokeWidth
      },
    };

  const variantsToUse = customVariants ?? circleVariants;

  // 对勾图标摆放
  const checkSize = size * 0.5;
  const checkX = cx - checkSize / 2;
  const checkY = cy - checkSize / 2;

  return (
    <motion.svg
      width={size}
      height={size}
      style={{ display: "block" }}
      aria-hidden="true"
    >
      {/* 单一圆圈：颜色/粗细/虚线都交给 variants */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        variants={variantsToUse}
        transition={{
          strokeWidth: { type: "spring", stiffness: 900, damping: 18 },
          stroke: { duration: 0.12, ease: "easeInOut" },
          fill: { duration: 0.12, ease: "easeInOut" },
        }}
      />

      {/* 已完成显示对勾 */}
      {isDone && (
        <motion.image
          href={checkSrc}
          x={checkX}
          y={checkY}
          width={checkSize}
          height={checkSize}
          transition={{
            opacity: { duration: 0.12, ease: "easeInOut" },
          }}
        />
      )}
    </motion.svg>
  );
}