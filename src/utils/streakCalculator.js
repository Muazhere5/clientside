// Function to check if two dates are consecutive days
const isConsecutive = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    // Set both to midnight to ignore time differences
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds and convert to days
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((d1.getTime() - d2.getTime()) / oneDay);
    
    return diffDays === 1; // If d1 is exactly 1 day after d2
};

/**
 * Calculates the current consecutive streak based on a history of timestamps.
 * Assumes completionHistory is an array of Date objects (timestamps).
 * @param {Array<Date|string>} completionHistory 
 * @returns {number} The current streak length.
 */
export const calculateCurrentStreak = (completionHistory = []) => {
    if (completionHistory.length === 0) return 0;

    // 1. Filter out duplicate completions on the same day and sort descending (newest first)
    const uniqueCompletionDates = [];
    const uniqueDays = new Set();
    
    // Convert timestamps to date strings (YYYY-MM-DD) for uniqueness check
    const sortedHistory = completionHistory
        .map(dateStr => new Date(dateStr))
        .sort((a, b) => b.getTime() - a.getTime()); // Sort newest to oldest
        
    sortedHistory.forEach(date => {
        const dayKey = date.toISOString().split('T')[0];
        if (!uniqueDays.has(dayKey)) {
            uniqueDays.add(dayKey);
            uniqueCompletionDates.push(date);
        }
    });
    
    if (uniqueCompletionDates.length === 0) return 0;

    let streak = 0;
    let currentDate = uniqueCompletionDates[0];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if the most recent completion was today or yesterday
    const lastCompletionDay = new Date(currentDate);
    lastCompletionDay.setHours(0, 0, 0, 0);
    
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((today.getTime() - lastCompletionDay.getTime()) / oneDay);

    // If the last completion was more than one day ago, the streak is broken (unless it's today)
    if (diffDays > 1) {
        return 0; 
    }
    
    // Start counting the streak from the latest completion
    if (diffDays === 0 || diffDays === 1) {
        streak = 1;
    }
    
    // Iterate through the rest of the unique completion dates
    for (let i = 1; i < uniqueCompletionDates.length; i++) {
        const previousDate = uniqueCompletionDates[i - 1];
        const currentDateToCheck = uniqueCompletionDates[i];
        
        // Use a function that checks for exact consecutive day differences
        if (isConsecutive(previousDate, currentDateToCheck)) {
            streak++;
        } else {
            // Streak is broken
            break;
        }
    }

    return streak;
};