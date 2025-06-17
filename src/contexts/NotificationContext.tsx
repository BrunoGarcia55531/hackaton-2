import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface NotificationContextType {
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface Notification {
    id: number;
    message: string;
    type: 'success' | 'error';
}

interface NotificationProviderProps {
    children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const showNotification = useCallback((message: string, type: 'success' | 'error') => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            setNotifications((prev) => prev.filter((notification) => notification.id !== id));
        }, 5000);
    }, []);

    const showSuccess = useCallback((message: string) => {
        showNotification(message, 'success');
    }, [showNotification]);

    const showError = useCallback((message: string) => {
        showNotification(message, 'error');
    }, [showNotification]);

    return (
        <NotificationContext.Provider value={{ showSuccess, showError }}>
            {children}
            {/* Notifications container */}
            <div className="fixed bottom-0 right-0 p-6 space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`px-4 py-3 rounded-lg shadow-lg ${notification.type === 'success'
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                            }`}
                    >
                        {notification.message}
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}
