import { useEffect, useRef } from 'react';

export const useMessageSeenTracker = (onMessageSeen: (id: string) => void) => {
    const refs = useRef<Map<string, HTMLDivElement>>(new Map());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const messageId = (entry.target as HTMLElement).dataset.messageId;
                        if (messageId) onMessageSeen(messageId);
                    }
                });
            },
            { threshold: 0.7 }
        );

        const currentRefs = refs.current;
        currentRefs.forEach(ref => observer.observe(ref));

        return () => observer.disconnect();
    }, [onMessageSeen]);

    const setMessageRef = (id: string) => (el: HTMLDivElement | null) => {
        if (el) refs.current.set(id, el);
        else refs.current.delete(id);
    };

    return { setMessageRef };
};