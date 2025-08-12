import { motion, type Variants } from "framer-motion";

type CircleBadgeProps = {
  size: number;
  color?: string;
  doneColor?: string;
  variant?: "empty" | "number" | "check";
  isDone?: boolean;
  strokeWidth?: number;       // 你在 App 里有传
  hoverStrokeWidth?: number;  // 你在 App 里有传
  customVariants?: Variants;  // 外部传入 variants
};

export default function CircleBadge({
  size,
  customVariants,
}: CircleBadgeProps) {
  const r = (size - 10) / 2;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <motion.svg width={size} height={size} style={{ display: "block" }}>
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        strokeDasharray="4 3.75"
        variants={customVariants} // 用外部传入的 variants
        transition={{
          strokeWidth: { type: "spring", stiffness: 986.96, damping: 18 },
          stroke: { duration: 0.1, ease: "easeInOut" },
          fill: { duration: 0.1, ease: "easeInOut" }
        }}
      />
    </motion.svg>
  );
}