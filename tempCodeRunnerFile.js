async function test() {
  db.collection("cities").doc("LA2").set({
    name: "Los Angeles 2",
    state: "CA 2",
    country: "USA 2"
  });
}