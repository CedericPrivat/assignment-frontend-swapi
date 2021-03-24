export class Helper {
  static changeUrlToHttps = (url: string): string => {
    const protocol = new URL(url).protocol.slice(0, -1);
    if (protocol === 'http') return url.replace('http', 'https');
    return url;
  };
}
