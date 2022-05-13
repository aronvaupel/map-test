//@ts-ignore
export default function buildLocationList(stores) {
  for (const store of stores.features) {
    /* Add a new listing section to the sidebar. */
    const listings = document.getElementById("listings");
    //@ts-ignore
    const listing = listings.appendChild(document.createElement("div"));
    /* Assign a unique `id` to the listing. */
    listing.id = `listing-${store.properties.id}`;
    /* Assign the `item` class to each listing for styling. */
    listing.className = "item";

    /* Add the link to the individual listing created above. */
    const link = listing.appendChild(document.createElement("a"));
    link.href = "#";
    link.className = "title";
    link.id = `link-${store.properties.id}`;
    link.innerHTML = `${store.properties.address}`;

    /* Add details to the individual listing. */
    const details = listing.appendChild(document.createElement("div"));
    details.innerHTML = `${store.properties.city}`;
    if (store.properties.phone) {
      details.innerHTML += ` · ${store.properties.phoneFormatted}`;
    }
    if (store.properties.distance) {
      const roundedDistance = Math.round(store.properties.distance * 100) / 100;
      details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
    }
  }
}
