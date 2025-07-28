export function formatTime(
    input: Date | string,
    options?: { timeZone?: string }
): string {
    const date: Date = typeof input === 'string' ? new Date(input) : input;
    if (isNaN(date.getTime())) throw new Error('Invalid date input');

    return options?.timeZone
        ? date.toLocaleTimeString('ru-RU', {
            timeZone: options.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
        : `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export const formatInput = (input: string) => {
    const digits = input.replace(/\D/g, '');

    let formatted = '';
    if (digits.length > 0) {
        formatted += digits.substring(0, 1);
    }
    if (digits.length > 1) {
        formatted += ' ' + digits.substring(1, 4);
    }
    if (digits.length > 4) {
        formatted += ' ' + digits.substring(4, 7);
    }
    if (digits.length > 7) {
        formatted += ' ' + digits.substring(7, 9);
    }
    if (digits.length > 9) {
        formatted += '-' + digits.substring(9, 11);
    }
    return formatted;
};
