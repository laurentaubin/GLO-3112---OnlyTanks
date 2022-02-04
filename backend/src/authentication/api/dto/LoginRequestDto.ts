interface LoginRequestDto {
  authProvider: string;
  token?: string;
  username?: string;
}

export default LoginRequestDto;
