/**
 * 获取uuid
 */
const uuid = (): string => {
  const s: any[] = [];
  const hexDigits = '0123456789ABCDEF';
  for (let i = 0; i < 32; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // 版本4，伪随机数
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  return s.join('');
};

export default uuid;
