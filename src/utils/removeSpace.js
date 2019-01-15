const removeSpacing = pre => {
  pre = pre.replace(/\s+/g, '-').toLowerCase();
  return pre
};

export default removeSpacing;
