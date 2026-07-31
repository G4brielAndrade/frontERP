import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Injectable({ providedIn: 'root' })
export class ClaimGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const claim = route.data['claim'] as string;
        if (this.auth.hasClaim(claim)) return true;
        this.router.navigate(['/acesso-negado']);
        return false;
    }
}
