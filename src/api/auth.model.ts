export interface Auth {
    user: string;
    password: string;
    endActiveSessions: boolean;
}

export interface AlterarSenha {
    password: string,
    newPassword: string,
    newPasswordConfirmation: string,
}
