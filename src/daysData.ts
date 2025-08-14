export type Task = {
    // id: string;    
    icon: string;
    title: string;
    currentProgress: number;
    totalProgress: number;
    reward: string;
    rewardText: string;
};

export type Day = {
    id: string;                       // 唯一 ID（统一管理）
    dateLabel: string | number;       // 显示的日期，如 14 / "Today"
    week: string;                     // 周几
    status: DayStatus;
    isDone: boolean;
    eventText: string;
    tasks: {
        day: Task[];                    // 当日任务
    };
};

export type DayStatus = 'past' | 'today' | 'future';

export const daysData: Day[] = [
    {
        id: "Aug 14",
        dateLabel: '',
        week: "Sun",
        isDone: true,
        status: "past",
        eventText:'Prepare for your upcoming LIVE on',
        tasks: {
            day: [
                { icon: "/day_task_01.png", title: "Go LIVE for 15 mins", currentProgress: 15, totalProgress: 15, reward: "/reward_gems.png", rewardText: "×10" },
                { icon: "/day_task_02.png", title: "Receive 10 likes", currentProgress: 10, totalProgress: 10, reward: "/reward_gems.png", rewardText: "×10" },
            ]
        },
    },

    {
        id: "Aug 15",
        dateLabel: '',
        week: "Mon",
        isDone: true,
        status: "past",
        eventText:'Plan ahead for success and reserve your slot',
        tasks: {
            day: [
                { icon: "/day_task_01.png", title: "Go LIVE for 60 mins", currentProgress: 60, totalProgress: 60, reward: "/reward_gems.png", rewardText: "×10" },
                { icon: "/day_task_02.png", title: "Receive 30 likes", currentProgress: 30, totalProgress: 30, reward: "/reward_gems.png", rewardText: "×10" },
            ]
        },
    },

    {
        id: "Today",
        dateLabel: "Today",
        week: "",
        isDone: false,
        status: "today",
        eventText:'Plan ahead for success and reserve your slot',
        tasks: {
            day: [
                { icon: "/day_task_01.png", title: "Go LIVE for 45 mins", currentProgress: 30, totalProgress: 45, reward: "/reward_gems.png", rewardText: "×15" },
                { icon: "/day_task_02.png", title: "Receive 20 likes", currentProgress: 16, totalProgress: 20, reward: "/reward_gems.png", rewardText: "×10" },
            ]
        },
    },

    {
        id: "Aug 17",
        dateLabel: '',
        week: "Wed",
        isDone: false,
        status: "future",
        eventText:'Prepare for your upcoming LIVE on',
        tasks: {
            day: [
                { icon: "/day_task_clock.png", title: "Start LIVE Event on time and go LIVE for 30 mins", currentProgress: 0, totalProgress: 30, reward: "/reward_gems.png", rewardText: "×10" },
                { icon: "/day_task_01.png", title: "Go LIVE for 10 mins", currentProgress: 0, totalProgress: 10, reward: "/reward_gems.png", rewardText: "×10" },
                { icon: "/day_task_03.png", title: "Receive 20 conmments", currentProgress: 0, totalProgress: 20, reward: "/reward_gems.png", rewardText: "×10" },
            ]
        },
    },

    {
        id: "Aug 18",
        dateLabel: '',
        week: "Thu",
        isDone: false,
        status: "future",
        eventText:'Plan ahead for success and reserve your slot',
        tasks: {
            day: [
                { icon: "/day_task_01.png", title: "Go LIVE for 30 mins", currentProgress: 0, totalProgress: 30, reward: "/reward_gems.png", rewardText: "×10" },
                { icon: "/day_task_02.png", title: "Receive 20 likes", currentProgress: 0, totalProgress: 20, reward: "/reward_gems.png", rewardText: "×10" },
            ]
        },
    },

    {
        id: "Aug 19",
        dateLabel: '',
        week: "Fri",
        isDone: false,
        status: "future",
        eventText:'Don’t miss out and reserve your LIVE session',
        tasks: {
            day: [
                { icon: "/day_task_01.png", title: "Go LIVE for 20 mins", currentProgress: 0, totalProgress: 20, reward: "/reward_gems.png", rewardText: "×10" },
                { icon: "/day_task_03.png", title: "Receive 30 conmments", currentProgress: 0, totalProgress: 30, reward: "/reward_gems.png", rewardText: "×10" },
            ]
        },
    },

    {
        id: "Aug 20",
        dateLabel: '',
        week: "Sat",
        isDone: false,
        status: "future",
        eventText:'Your audience is waiting so secure your LIVE',
        tasks: {
            day: [
                { icon: "/day_task_01.png", title: "Go LIVE for 15 mins", currentProgress: 0, totalProgress: 15, reward: "/reward_gems.png", rewardText: "×10" },
                { icon: "/day_task_02.png", title: "Receive 15 likes", currentProgress: 0, totalProgress: 15, reward: "/reward_gems.png", rewardText: "×10" },
            ]
        },
    },
    // ...更多日期
];

export const weekTasks: Task[] = [
    {
        icon: "/week_task_01.png",
        title: "Complete “Go LIVE for 30 mins” for 3 times",
        currentProgress: 1,
        totalProgress: 3,
        reward: "/reward_card.png",
        rewardText: "×1"
    },
    {
        icon: "/week_task_02.png",
        title: "Complete “Receive 20 likes” for 5 times",
        currentProgress: 63,
        totalProgress: 120,
        reward: "/reward_card.png",
        rewardText: "×2"
    },
    {
        icon: "/week_task_03.png",
        title: "Go LIVE for 120 mins",
        currentProgress: 143,
        totalProgress: 200,
        reward: "/reward_gems.png",
        rewardText: "×50"
    },
    {
        icon: "/week_task_04.png",
        title: "Receive 200 likes",
        currentProgress: 143,
        totalProgress: 200,
        reward: "/reward_gems.png",
        rewardText: "×50"
    },
    {
        icon: "/week_task_05.png",
        title: "Receive 80 comments",
        currentProgress: 143,
        totalProgress: 200,
        reward: "/reward_gems.png",
        rewardText: "×50"
    },
    {
        icon: "/week_task_06.png",
        title: "Collect 20 diamonds",
        currentProgress: 143,
        totalProgress: 200,
        reward: "/reward_gems.png",
        rewardText: "×50"
    },
];