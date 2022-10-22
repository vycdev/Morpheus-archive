export const ymwdhms = (diff: number): string => {
    const yearLen = 1000 * 60 * 60 * 24 * 365;
    const monthLen = 1000 * 60 * 60 * 24 * 30;
    const weekLen = 1000 * 60 * 60 * 24 * 7;
    const dayLen = 1000 * 60 * 60 * 24;
    const hourLen = 1000 * 60 * 60;
    const minLen = 1000 * 60;

    const years = Math.floor(diff / yearLen);
    diff %= yearLen;
    const months = Math.floor(diff / monthLen);
    diff %= monthLen;
    const weeks = Math.floor(diff / weekLen);
    diff %= weekLen;
    const days = Math.floor(diff / dayLen);
    diff %= dayLen;
    const hours = Math.floor(diff / hourLen);
    diff %= hourLen;
    const minutes = Math.floor(diff / minLen);
    diff %= minLen;
    const seconds = Math.floor(diff / 1000);

    return `${years} Year${years > 1 ? "s" : ""} ${months} Month${
        months > 1 ? "s" : ""
    } ${weeks} Week${weeks > 1 ? "s" : ""} ${days} Day${
        days > 1 ? "s" : ""
    } ${hours} Hour${hours > 1 ? "s" : ""} ${minutes} Minute${
        minutes > 1 ? "s" : ""
    } and ${seconds} Second${seconds > 1 ? "s" : ""}`;
};
