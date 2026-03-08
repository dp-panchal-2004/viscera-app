import AsyncStorage from '@react-native-async-storage/async-storage';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000'; // Update this to your dynamic server URL if needed

class SocketService {
    private socket: Socket | null = null;

    initialize() {
        if (this.socket) return;

        this.socket = io(SOCKET_URL, {
            transports: ['websocket'],
            autoConnect: true,
        });

        this.socket.on('connect', async () => {
            console.log('✅ Connected to socket server');
            const userStr = await AsyncStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                // Register with userId and role as required
                this.socket?.emit('register', {
                    userId: user.id || user._id,
                    role: user.role || 'nurse'
                });
            }
        });

        this.socket.on('disconnect', () => {
            console.log('❌ Disconnected from socket server');
        });

        this.socket.on('error', (error) => {
            console.log('Socket Error:', error);
        });
    }

    joinConversation(applicationId: string) {
        if (!this.socket) this.initialize();
        console.log(`Joining conversation: ${applicationId}`);
        this.socket?.emit('join_conversation', { applicationId });
    }

    onNewMessage(callback: (message: any) => void) {
        this.socket?.on('new_message', callback);
    }

    offNewMessage() {
        this.socket?.off('new_message');
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    getSocket() {
        return this.socket;
    }
}

const socketService = new SocketService();
export default socketService;
