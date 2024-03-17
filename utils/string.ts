export const getLastNCharacter = (string: string, numOfCharacter: number) => {
  return string?.slice(-numOfCharacter);
};

export const getSearchParam = (stringUrl: string, searchParam: string) => {
  const url = new URL(stringUrl);
  var urlParams = new URLSearchParams(url.search);
  return urlParams.get(searchParam);
};
