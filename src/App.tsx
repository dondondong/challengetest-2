import { useMemo, useState, useRef, useEffect } from "react";
import styles from "./home.module.css";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  animate,
  type Transition,
} from "framer-motion";
import CircleBadge from "./CircleBadge";
import TaskItem from "./TaskItem";
import ProgressBar from "./ProgressBar";
import { daysData, weekTasks } from "./daysData"; // 或相对路径
import DynamicModule from "./DynamicModule";

export default function Home() {
  const dates = daysData;

  // 默认选中 Today
  const [selectedId, setSelectedId] = useState<string>(() => {
    const t = dates.find((d) => d.dateLabel === "Today");
    return t ? t.id : (dates[0]?.id as string);
  });

  // 当前对象 & 索引
  const currentDay = useMemo(
    () => dates.find((d) => d.id === selectedId) ?? dates[0],
    [dates, selectedId]
  );
  const selectedIndex = useMemo(
    () => dates.findIndex((d) => d.id === selectedId),
    [dates, selectedId]
  );

  // 方向：-1 = 切到更早（从左进），+1 = 切到更晚（从右进）
  const [direction, setDirection] = useState(0);
  const handleSelect = (nextId: string) => {
    if (nextId === selectedId) return;
    const nextIndex = dates.findIndex((d) => d.id === nextId);
    if (nextIndex !== -1) {
      setDirection(nextIndex > selectedIndex ? +1 : -1);
      setSelectedId(nextId);
    }
  };

  // 当日内容左右切换（带方向）
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      position: "absolute" as const,
      width: "100%",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
      width: "100%",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -0 : 0, // ← 反方向退出，避免停在原地
      opacity: 0,
      position: "absolute" as const,
      width: "100%",
    }),
  };

  const spring: Transition = {
    type: "spring",
    stiffness: 600,
    damping: 42,
    mass: 0.6,
  };

  // ========= 关键：让 Week / Month 在“原位置”用 y 跟随位移 =========
  // 测量“当日内容栈”（动态模块 + 标题 + 日任务）的真实高度变化
  const stackInnerRef = useRef<HTMLDivElement | null>(null);
  const prevHeightRef = useRef<number>(0);

  // 用 motion value 控制 Week / Month 的 y；每次切换让 y: delta -> 0
  const weekY = useMotionValue(0);
  const monthY = useMotionValue(0);

  // 首次渲染记录高度，避免第一帧跳动
  // useLayoutEffect(() => {
  //   if (stackInnerRef.current) {
  //     prevHeightRef.current = stackInnerRef.current.getBoundingClientRect().height;
  //     console.log(32432)
  //   }
  // }, []);

  // 切换 selectedId 后，在首帧前完成 y 的设置：先把 y 设成“高度差”，再弹回 0
  useEffect(() => {
    if (!stackInnerRef.current) return;
    const newH = stackInnerRef.current.getBoundingClientRect().height;
    // const oldH = prevHeightRef.current || newH;
    // const delta = newH - oldH; // 变矮 => 正，变高 => 负
    // console.log('deleta' + delta)
    // 让 week/month 先抵消这段高度差，再顺滑回 0
    weekY.set(0);
    monthY.set(0);
    const c1 = animate(weekY, 0);
    const c2 = animate(monthY, 0);

    prevHeightRef.current = newH;
    return () => {
      c1.stop();
      c2.stop();
    };
  }, [selectedId]); // 仅在切换日期时触发

  // Week / Month 的布局动画（保底）：如果你更喜欢纯位移，可不需要 layout
  const layoutSpring: Transition = { type: "spring", stiffness: 500, damping: 40 };

  return (
    <div className={styles.content}>
      <img className={styles.banner} src="/vt-01.png" alt="" style={{ zIndex: 100 }} />

      {/* 用 layoutRoot 让后代 layout 更稳定（可选） */}
      <motion.div className={styles.dialogContainer} layoutRoot>
        {/* header */}
        <div className={styles.headerContainer}>
          <h1>Manage your LIVE and win rewards!</h1>
          <div style={{ display: "flex" }}>
            <img src="/gem_1.png" alt="" style={{ width: 15, marginRight: 4 }} />
            <div className={styles.headerSub}>
              300 gems in total · Get 150 more gems to unlock Flare card x2
            </div>
          </div>
        </div>

        {/* 日历 */}
        <div className={styles.calContainer}>
          {dates.map((d) => {
            const isSelected = d.id === selectedId;

            const dateVariants = {
              rest: { color: isSelected ? "#fff" : "rgba(255,255,255,.5)" },
              hover: { color: isSelected ? "#fff" : "rgba(255,255,255,1)" },
            };

            return (
              <motion.div
                key={d.id}
                className={styles.calItem}
                onClick={() => handleSelect(d.id)}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.div variants={dateVariants} className={styles.calDateContainer}>
                  <div
                    className={styles.calDate}
                    style={{ display: d.dateLabel === "" ? "none" : "block" }}
                  >
                    {d.dateLabel}
                  </div>
                  <div
                    className={styles.calWeek}
                    style={{ display: d.dateLabel === "Today" ? "none" : "block" }}
                  >
                    {d.week}
                  </div>
                </motion.div>
                <div className={styles.calBadgeWrap}>
                  <CircleBadge size={32} isDone={d.isDone} isSelected={isSelected} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ====== 当日内容栈：动态模块 + 标题 + 日任务（整体左右切换） ====== */}
        <div style={{ position: "relative", minHeight: 40 }}>
          <div ref={stackInnerRef} style={{ position: "relative", width: "100%" }}>
            <AnimatePresence custom={direction} >
              <motion.div
                key={`stack-${currentDay.id}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: spring, opacity: { duration: 0.12, ease: "easeInOut" } }}
                layout
              >
                {/* 动态模块 */}
                <DynamicModule status={currentDay.status}
                  key={`${currentDay.id}`}
                  dateId={currentDay.id}
                  text={currentDay.eventText}
                />

                {/* 标题跟着一起动 */}
                <h2>{currentDay.id}</h2>

                {/* 今日（日任务） */}
                <div className={styles.taskGridContainer} style={{ marginBottom: 36 }}>
                  {currentDay.tasks.day.map((task) => (
                    <TaskItem key={task.title} variant={currentDay.status} task={task} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ====== Week：在“原位置”做位移动画，避免跳 ====== */}
        <motion.div
          className={styles.taskContainer}
          style={{ marginBottom: 36, y: weekY, position: "relative" }}
          transition={layoutSpring} // 可留可去：主要靠 y 动画
        >
          <h2>This week</h2>
          <div className={styles.taskGridContainer}>
            {weekTasks.map((task) => {
              return (
                <div key={`${task.title}`} className={styles.taskItem}>
                  <div className={styles.taskItemInner}>
                    <img src={task.icon} className={styles.taskImg} alt="" />
                    <div className={styles.taskInfo}>
                      <div className={styles.taskProgressContent}>
                        <div className={styles.taskTitle}>{task.title}</div>
                        <div className={styles.progressContainer}>
                          <ProgressBar
                            progress={task.currentProgress / task.totalProgress}
                          />
                          <div
                            style={{
                              color: "rgba(255,255,255,.5)",
                              fontWeight: 300,
                              fontSize: 13,
                              fontFeatureSettings: `'tnum' on, 'lnum' on`,
                            }}
                          >
                            {`${task.currentProgress}/${task.totalProgress}`}
                          </div>
                        </div>
                      </div>

                      <div className={styles.taskRewardContainer}>
                        <img
                          className={styles.taskRewardImg}
                          src={task.reward}
                          alt=""
                        />
                        <div className={styles.taskRewardText}>{task.rewardText}</div>
                      </div>
                    </div>
                    <div className={styles.goLiveContainer}>
                      <div className={styles.goLiveButton}>
                        <div>Go LIVE</div>
                        <img src="/goliveicon.png" alt="" className={styles.goLiveIcon} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ====== Month：同理用 y 位移 ====== */}
        <motion.div
          className={styles.taskContainer}
          style={{ y: monthY, position: "relative" }}
          transition={layoutSpring}
        >
          <h2>This month</h2>
          <img style={{ width: "100%" }} src="/monthcard.png" alt="" />
        </motion.div>

        <img className={styles.banner} src="/banner.png" alt="" />
      </motion.div>
    </div>
  );
}