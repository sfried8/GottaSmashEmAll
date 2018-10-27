export default {
    shuffle: function shuffle(array) {
        var m = array.length,
            t,
            i;

        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    },
    isSorted: function isSorted(arr) {
  const limit = arr.length - 1;
  return arr.every((_, i) => (i < limit ? arr[i] <= arr[i + 1] : true));
}
};
