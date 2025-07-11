/**
 * 用于解析JSON字符串
 * @param key
 * @returns {any|null}
 */
const jsonParse = (content: string): any => {
  try {
    return JSON.parse(content);
  } catch (e) {
    return null;
  }
};

export default jsonParse;
