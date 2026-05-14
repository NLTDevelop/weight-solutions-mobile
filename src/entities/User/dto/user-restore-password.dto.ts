export interface UserRestorePasswordDto {
    email: string;
}

export interface UserVerifyRestoreCodeDto {
    email: string;
    code: string;
}

export interface UserVerifyRestoreCodeResponseDto {
    message: string;
    reset_token: string;
    email: string;
}

export interface UserConfirmRestorePasswordDto {
    email: string;
    reset_token: string;
    password: string;
}
