
// services/WebSocketService.ts
class WebSocketService {
    private static instance: WebSocketService;
    public socket: WebSocket | null = null;
    private observers: ((state: any) => void)[] = [];
    private constructor() {}

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    public connect(url: string): void {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => console.log('WebSocket connected');
        this.socket.onerror = (e) => console.error('WebSocket error', e);

        this.socket.onmessage = (event) => {

            const message = JSON.parse(event.data);

            this.observers.forEach(callback => callback(message))
        };
    }

    public AddListener(callback: (state: any) => void) {
        this.observers.push(callback)
    }
    public DeleteListener(callback: (state: any) => void) {
        this.observers.filter(callbacke => callback !== callbacke)
    }



    public sendMessage(message: unknown): void {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        }
    }

}

export default WebSocketService.getInstance();