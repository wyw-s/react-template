const closeWin = (timeout = 1000): void => {
  setTimeout(() => {
    // 空字符串中间要加空格
    const url = ' ';
    window.open(url, '_self')?.close();
    // 刷新父级页面
    if (window.opener && window.opener.location) {
      window.opener.location.reload();
    }
  }, timeout);
};

export default closeWin;
