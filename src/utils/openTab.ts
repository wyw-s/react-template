import queryString from 'query-string';

/**
 * 打开新页签
 * @param option
 */
const openTab = (option: {
  pathname: string;
  query?: {
    [key: string]: any;
  };
}): void => {
  window.open(
    queryString.stringifyUrl({
      url: option.pathname,
      query: option.query
    }),
    '_blank'
  );
};

export default openTab;
