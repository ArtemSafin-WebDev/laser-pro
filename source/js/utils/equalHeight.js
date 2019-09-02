export default function(item) {
  if (item.length) {
    item.matchHeight({
      byRow: true,
      property: 'height',
      target: null,
      remove: false
    });
  }
}
