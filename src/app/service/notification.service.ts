import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private message: string = '';

    setMessage(message: string) {
        this.message = message;
    }

    getMessage(): string {
        const currentMessage = this.message;
        this.clearMessage(); // Limpa a mensagem após exibição
        return currentMessage;
    }

    clearMessage() {
        this.message = '';
    }
}
