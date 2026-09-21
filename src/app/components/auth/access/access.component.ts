import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-access',
    templateUrl: './access.component.html',
})

export class AccessComponent implements OnInit {
    lastAttemptedUrl: string | null = '/'; // Redireciona para o Dashboard se não houver uma URL salva

    constructor(private router: Router) { }

    ngOnInit(): void {
        const storedUrl = localStorage.getItem('lastAttemptedUrl');
        if (storedUrl) {
            this.lastAttemptedUrl = storedUrl;
        }
    }

    navigateBack() {
        this.router.navigateByUrl(this.lastAttemptedUrl || '/');
    }
}
