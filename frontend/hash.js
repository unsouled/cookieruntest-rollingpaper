const hash = (b) => {
  for (var a=0,c=b.length;c--;) {
    a+=b.charCodeAt(c);
    a+=a<<10;
    a^=a>>6;
    a+=a<<3;
    a^=a>>11;
  }
  return ((a+(a<<15)&4294967295)>>>0).toString(16);
};

const data = [
  'ITJ',
  'ITP',
  'ETJ',
  'ETP',
  'IFJ',
  'IFP',
  'EFJ',
  'EFP'
];

data.forEach(datum => {
  console.log(datum, hash(datum));
});
