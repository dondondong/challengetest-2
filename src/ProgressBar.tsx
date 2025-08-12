import { motion, useMotionValue, animate } from "framer-motion";
import { useRef, useLayoutEffect, useEffect } from "react";
import styles from "./home.module.css";

export default function ProgressBar({
    progress = 0.6, // 0~1
}) {
    const bgRef = useRef<HTMLDivElement | null>(null);
    const widthPx = useMotionValue(0);

    const p = Math.max(0, Math.min(1, progress));

    const play = () => {
        if (!bgRef.current) return;
        const total = bgRef.current.getBoundingClientRect().width;
        const target = total * p;

        // 从0到目标宽度
        widthPx.set(0);
        const controls = animate(widthPx, target, {
            type: "spring",
            stiffness: 200, // 越大越“硬”
            damping: 40,    // 越小越“弹”
        });
        return () => controls.stop();
    };

    useEffect(() => {
        const stop = play();
        return () => stop && stop();
    }, [p]);

    useLayoutEffect(() => {
        if (!bgRef.current) return;
        const ro = new ResizeObserver(() => {
            play();
        });
        ro.observe(bgRef.current);
        return () => ro.disconnect();
    }, []);

    return (
        <div ref={bgRef} className={styles.progressBarBg}>
            <motion.div
                className={styles.progressBar}
                style={{ width: widthPx }}
            />
        </div>
    );
}