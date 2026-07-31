import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Directive({ selector: '[temPermissao]' })
export class TemPermissaoDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private auth: AuthService
    ) { }

    @Input() set temPermissao(claim: string) {
        if (this.auth.hasClaim(claim)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }


    }
}
