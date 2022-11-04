export function isValidUrl(url: string): boolean {
  const objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
  return objRE.test(url);
}

console.log(isValidUrl('https://stackoverflow.com/questions/1303872'));

// [\wа-я]