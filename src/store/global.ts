/**
 * 全局状态管理
 */
import { atom } from 'recoil';
import jsonParse from '@/utils/jsonParse';
import { UserInfo } from '@/constant/common';
import KEYS from './keys';

interface userInfoStateProps {
  account: string;
  avatar: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  role: string;
  userId: string;
}

/**
 * 保存用户信息到全局
 */
export const userInfoState = atom<Partial<userInfoStateProps>>({
  key: KEYS.UserInfo,
  default: jsonParse(window.sessionStorage.getItem(UserInfo) || '') ?? {}
});
