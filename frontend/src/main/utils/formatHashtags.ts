const formatHashtags = (rawHashtags: string[]): string[] => {
  return rawHashtags.map((hashtag) => {
    return "#" + hashtag;
  });
};

export default formatHashtags;
