// src/components/TaskItem.tsx
import ProgressBar from "./ProgressBar";
import styles from "./home.module.css";

type Variant = 'past' | 'today' | 'future';

export default function TaskItem({
    variant,
    task,
}: {
    variant: Variant;
    task: {
        // id: string;
        icon: string;
        title: string;
        currentProgress: number;
        totalProgress: number;
        reward: string;
        rewardText: string;
    };
}) {
    const progress = task.totalProgress > 0
        ? task.currentProgress / task.totalProgress
        : 0;

    return (
        <div className={styles.taskItem}>
            <div className={styles.taskItemInner}>
                <img src={task.icon} className={styles.taskImg} alt="" />

                <div className={styles.taskInfo}>
                    <div className={styles.taskProgressContent}>
                        <div className={styles.taskTitle}>{task.title}</div>

                        {/* 进度区域：past 有 ✓ + 进度条；today 有进度条；future 不显示进度条 */}
                        <div className={styles.progressContainer}>
                            {variant === "past" && (
                                <>
                                    <img
                                        src="/tick.png"       // 放 public/check.svg
                                        alt=""
                                        className={styles.taskCheck}
                                    />
                                    <div className={styles.progressText}>

                                        {`${task.currentProgress}/${task.totalProgress}`}
                                    </div>
                                </>
                            )}

                            {variant === "today" && (
                                <>
                                    <ProgressBar progress={progress} />
                                    <div className={styles.progressText}>
                                        {`${task.currentProgress}/${task.totalProgress}`}
                                    </div>
                                </>
                            )}

                            {variant === "future" && (
                                <div className={styles.futurePlaceholder}>
                                    <div className={styles.progressText}>
                                        {`${task.currentProgress}/${task.totalProgress}`}
                                    </div>
                                </div>
                            )}
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

        </div>
    );
}