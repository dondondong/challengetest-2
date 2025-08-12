import { useState } from "react"
import styles from "./home.module.css"
import { motion } from "framer-motion";
import CircleBadge from "./CircleBadge.js";
import ProgressBar from "./ProgressBar.js";
// import { div, style, title } from "framer-motion/client";

export default function Home() {
  // const [calHovered, setCalHovered] = useState(false)
  // const [hovered, setHovered] = useState(false);
  // 存储当前选中的日期 index
  // const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const dates = [
    { date: 14, week: 'Sun', isSelected: false, isDone: true },
    { date: 15, week: 'Mon', isSelected: false, isDone: true },
    { date: `Today`, week: '', isSelected: true, isDone: false },
    { date: 17, week: 'Wed', isSelected: false, isDone: false },
    { date: 18, week: 'Thu', isSelected: false, isDone: false },
    { date: 19, week: 'Fri', isSelected: false, isDone: false },
    { date: 20, week: 'Sat', isSelected: false, isDone: false },
  ]

  const dayTaskArr = [
    {
      icon: '/day_task_01.png',
      title: 'Go LIVE for 30 mins',
      currentProgress: 15,
      totalProgress: 30,
      reward: '/reward_gems.png',
      rewardText: '×10'
    },
    {
      icon: '/day_task_02.png',
      title: 'Receive 20 likes',
      currentProgress: 16,
      totalProgress: 20,
      reward: '/reward_gems.png',
      rewardText: '×10'
    }
  ]

  const weekTaskArr = [
    {
      icon: '/week_task_01.png',
      title: 'Complete “Go LIVE for 30 mins” for 3 times',
      currentProgress: 1,
      totalProgress: 3,
      reward: '/reward_card.png',
      rewardText: '×1'
    },
    {
      icon: '/week_task_02.png',
      title: 'Complete “Receive 20 likes” for 5 times',
      currentProgress: 1,
      totalProgress: 5,
      reward: '/reward_card.png',
      rewardText: '×1'
    },
    {
      icon: '/week_task_03.png',
      title: 'Go LIVE for 120 mins',
      currentProgress: 63,
      totalProgress: 120,
      reward: '/reward_gems.png',
      rewardText: '×50'
    },
    {
      icon: '/week_task_04.png',
      title: 'Receive 200 likes',
      currentProgress: 143,
      totalProgress: 200,
      reward: '/reward_gems.png',
      rewardText: '×50'
    },
    {
      icon: '/week_task_05.png',
      title: 'Receive 80 comments',
      currentProgress: 23,
      totalProgress: 80,
      reward: '/reward_gems.png',
      rewardText: '×50'
    },
    {
      icon: '/week_task_06.png',
      title: 'Collect 20 diamonds',
      currentProgress: 7,
      totalProgress: 20,
      reward: '/reward_gems.png',
      rewardText: '×50'
    },
  ]

  return (
    <div className={styles.content}>
      <img className={styles.banner} src="/vt-01.png" alt="" style={{ zIndex: 100 }} />
      <div className={styles.dialogContainer}>

        {/* header */}
        <div className={styles.headerContainer}>
          <h1>Manage your LIVE and win rewards!</h1>
          <div style={{ display: "flex" }}>
            <img src="/gem_1.png" alt="" style={{ width: 15, marginRight: 4 }} />
            <div className={styles.headerSub}>300 gems in total · Get 150 more gems to unlock Flare card x2</div>
          </div>
        </div>

        {/* calendar */}
        <div className={styles.calContainer}>
          {dates.map((date, index) => {
            const isSelected = selectedIndex === index;
            const variant = date.isDone ? "check" : "empty";

            // 根据选中状态动态生成 CircleBadge 的 variants
            const circleVariants = {
              rest: {
                strokeWidth: isSelected ? 3.5 : 2.5,
                stroke: isSelected ? "#ffffff" : "#666",
                fill: isSelected ? "rgba(255,255,255,.05)" : "none"
              },
              hover: {
                strokeWidth: isSelected ? 3.5 : 2.5, // 如果选中，hover 再更粗
                stroke: isSelected ? "#ffffff" : "rgba(255,255,255,.5)",
              },
            };

            // 根据选中状态动态生成 text 的 variants
            const dateVariants = {
              rest: {
                color: isSelected ? "#ffffff" : "rgba(255, 255, 255, .5)"
              },
              hover: {
                color: isSelected ? "#ffffff" : "rgba(255, 255, 255, 1)"
              },
            };

            return (
              <motion.div
                key={`${date.date}-${date.week}`}
                className={styles.calItem}
                onClick={() =>
                  setSelectedIndex(selectedIndex === index ? index : index)
                }
                initial="rest"
                whileHover="hover"
                animate="rest" // 默认常驻 rest
              >
                {/* 日历日期 */}
                <motion.div variants={dateVariants} className={styles.calDateContainer}>
                  <div className={styles.calDate}>{date.date}</div>
                  <div className={styles.calWeek} style={date.date === 'Today' ? {display: 'none'} : {display: 'auto'}}>{date.week}</div>
                </motion.div>

                {/* 日历虚线框 */}
                <div className={styles.calBadgeWrap}>
                  <CircleBadge
                    size={40}
                    strokeWidth={2.5}
                    hoverStrokeWidth={2.5}
                    color="#666"
                    variant={variant}
                    isDone={date.isDone}
                    customVariants={circleVariants} // 传入自定义 variants
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 日任务 */}
        <div className={styles.taskContainer} style={{
          marginBottom: 36
        }}>
          <h2>Today</h2>
          <div className={styles.taskGridContainer}>
            {dayTaskArr.map((task) => {
              return (
                <div
                  key={`${task.title}`}
                  className={styles.taskItem}
                >
                  <img src={task.icon} className={styles.taskImg} alt="" />
                  <div className={styles.taskInfo}>
                    <div className={styles.taskProgressContent}>
                      <div className={styles.taskTitle}>{task.title}</div>
                      <div className={styles.progressContainer}>
                        <ProgressBar
                          progress={task.currentProgress / task.totalProgress}
                        />
                        <div style={{ color: "rgba(255,255,255,.5)", fontWeight: 300, fontSize: 13, fontFeatureSettings: `'tnum' on, 'lnum' on` }}>
                          {`${task.currentProgress}/${task.totalProgress}`}
                        </div>
                      </div>

                    </div>

                    <div className={styles.taskRewardContainer}>
                      <img className={styles.taskRewardImg} src={task.reward} alt="" />
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
              )

            })}
          </div>
        </div>

        {/* 周任务 */}
        <div className={styles.taskContainer} style={{
          marginBottom: 36
        }}>
          <h2>This week</h2>
          <div className={styles.taskGridContainer}>
            {weekTaskArr.map((task) => {
              return (
                <div
                  key={`${task.title}`}
                  className={styles.taskItem}
                >
                  <img src={task.icon} className={styles.taskImg} alt="" />
                  <div className={styles.taskInfo}>
                    <div className={styles.taskProgressContent}>
                      <div className={styles.taskTitle}>{task.title}</div>
                      <div className={styles.progressContainer}>
                        <ProgressBar
                          progress={task.currentProgress / task.totalProgress}
                        />
                        <div style={{ color: "rgba(255,255,255,.5)", fontWeight: 300, fontSize: 13, fontFeatureSettings: `'tnum' on, 'lnum' on` }}>
                          {`${task.currentProgress}/${task.totalProgress}`}
                        </div>
                      </div>

                    </div>

                    <div className={styles.taskRewardContainer}>
                      <img className={styles.taskRewardImg} src={task.reward} alt="" />
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
              )

            })}
          </div>
        </div>

        {/* 月任务 */}
        <div className={styles.taskContainer} >
          <h2>This month</h2>
          <img style={{ width: '100%' }} src="/monthcard.png" alt="" />
        </div>

        <img className={styles.banner} src="/banner.png" alt="" />
      </div>
    </div>

  )
}