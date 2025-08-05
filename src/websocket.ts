import {v1} from "./api/v1/v1";


class WebSocketService {
    private static instance: WebSocketService;
    public socket: WebSocket | null = null;
    private observers: ((state: any) => void)[] = [];
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 3;

    private constructor() {}

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    public connect(url: string): void {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log('WebSocket connected');
            this.reconnectAttempts = 0;
        };

        this.socket.onerror = (e) => {
            console.error('WebSocket error', e);
            this.handleReconnect(url);
        };

        this.socket.onclose = () => {
            console.log('WebSocket disconnected');
            this.handleReconnect(url);
        };

        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.observers.forEach(callback => callback(message));
        };
    }

    private async handleReconnect(url: string) {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) return;

        this.reconnectAttempts++;
        console.log(`Reconnecting attempt ${this.reconnectAttempts}`);

        try {
            await v1.post('/accesstoken', {}, { withCredentials: true });
            this.connect(url);
        } catch (error) {
            console.error('Token refresh failed', error);
            window.location.replace('http://localhost:8080/auth');
        }
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