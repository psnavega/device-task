export function delayStatusHandler({ lastUpdated }: { lastUpdated: Date }): string {
    const now = new Date().getTime();
    const lastUpdatedTime = new Date(lastUpdated).getTime();
    const diff = now - lastUpdatedTime;
    const minutes = Math.floor(diff / 60000);

    const dayInMinutes = 60 * 24;

    if (minutes > 30 && minutes <= dayInMinutes) {
        return 'critical';
    }
    if (minutes > dayInMinutes ) {
        return 'warning';
    }
    return 'ok';
}