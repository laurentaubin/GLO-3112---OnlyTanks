class HashtagsFormatter {
  public addHashtagSymbol = (rawHashtags: string[]): string[] => {
    return rawHashtags.map((hashtag) => {
      return "#" + hashtag;
    });
  };

  public removeHashtagSymbol = (hashtags: string[]): string[] => {
    return hashtags.map((hashtag) => {
      return hashtag.substring(1);
    });
  };
}

export default new HashtagsFormatter();
