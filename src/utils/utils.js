export const generateKey = pre => {
  return `${pre}_${new Date().getTime()}`;
};

export const removeSpacing = pre => {
  pre = pre.replace(/\s+/g, '-').toLowerCase();
  return pre
};
