// src/components/DynamicModule.tsx
import styles from "./home.module.css";

interface Props {
    status: "today" | "past" | "future";
    dateId: string;
    text: string;
}

export default function DynamicModule({ status, dateId, text }: Props) {

    if (status === "today") {
        return (
            <div className={styles.dynamicModule}>
                <div className={styles.dynamicModuleContainer}>
                    <div className={styles.dynamicModuleIconContainer}>
                        <img className={styles.liveTipsIcon} src="/live_tips.png" alt="" />
                    </div>
                    <div className={styles.liveTipsContent}>
                        <div className={styles.liveTipsTitle}>LIVE Tips:</div>
                        <div className={styles.liveTipsText}>
                            Ask your audiences for LIVE topics through daily polls!
                        </div>
                    </div>
                    <img
                        className={styles.liveTipsCancelIcon}
                        src="/live_tips_cancel.png"
                        alt=""
                    />
                </div>
            </div>
        );
    }

    if (status === "past") {
        return (
            <div className={styles.dynamicModule}>
                <div className={styles.dynamicModuleContainer}>
                    <img
                        className={styles.dynamicModuleIconContainer}
                        src="/tick_summary.png"
                        alt=""
                    />
                    <div className={styles.summaryContent}>
                        <div className={styles.summaryTitle}>
                            Well done! All daily challenges completed on {dateId}!
                        </div>
                        <div className={styles.summaryText}>
                            Go LIVE for
                            <span className={styles.summaryTextHighlight}>120</span> mins ·
                            Recieved
                            <span className={styles.summaryTextHighlight}>15</span> comments ·
                            Completed
                            <span className={styles.summaryTextHighlight}>2</span> challenges
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (status === "future") {
        return (
            <div className={styles.dynamicModule}>
                <div className={styles.dynamicModuleContainer}>
                    <img
                        className={styles.dynamicModuleIconContainer}
                        src="/live_event_not.png"
                        alt=""
                    />
                    <div className={styles.liveEventContent}>
                        <div className={styles.liveEventTitle}>

                            {text} on {dateId}!
                        </div>
                        <div className={styles.liveEventText}>
                            Earn 10 points by setting a LIVE Event and go LIVE for 30mins on this date
                        </div>
                    </div>
                    <div className={styles.iconButtonContainer}>
                        <div>Set LIVE Event</div>
                        <img className={styles.buttonIcon} src="/Chevron_Right_LTR.png" alt="" />
                    </div>
                </div>
            </div>
        );
    }

    return null; // future 或其他状态不渲染
}