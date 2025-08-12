import { motion } from "framer-motion";

export default function CircleBadge({
  size,
  color,
  doneColor = "#ffffff",
  variant = "empty",
  isDone = false,
  customVariants,
}) {
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