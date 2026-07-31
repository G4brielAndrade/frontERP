import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './service/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private authService: AuthService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;

        const token = this.authService.getToken(); // ou localStorage.getItem(...)

        if (token) {
            this.authService.loadClaims(); // carrega claims do backend via userId extraído do token
        }
    }
}
