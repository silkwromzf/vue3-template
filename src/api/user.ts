import { get } from '@/components/ajax';

// 获取token
interface TokenResponse {
    token: string;
}

export const getToken = (username = '13800000099') =>
    get<TokenResponse>('xx', {
        params: { username }
    });

export interface User {
    name: string;
    id: number;
    role: number;
}
// 获取用户信息
export const getUserInfo = () => get<User>('xx');
