function phoneLoad(getText) {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${getText}`)
    .then((res) => res.json())
    .then((data) => {
      const phones = data.data;
      displayPhones(phones);
    });
}

function displayPhones(phones) {
  const phoneContainer = document.getElementById("phone-container");
  // clear old phone container cards, before adding new cards
  phoneContainer.textContent = "";

  // (2) display show all button if there are more than 12 phones, if its lesser than 12 the button will hide
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 6) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // (1) display only first 12 phones -- (2) line 15
  phones = phones.slice(0, 6);

  for (const phone of phones) {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `<figure class="px-10 pt-10">
                 <img src="${phone.image}" />
              </figure>
                 <div class="card-body items-center text-center">
                      <h2 class="card-title text-2xl font-bold">${phone.phone_name}</h2>
                      <p class="text-lg">There are many variations of passages of available, but the majority have suffered</p>
                      <p class="text-2xl font-bold">$999</p>
                      <div class="card-actions">
                          <button class="btn btn-accent text-white">Show Details</button>
                      </div>
                  </div>`;
    phoneContainer.appendChild(phoneCard);
  }
}

// search input, button
const handleSearch = () => {
  const searchField = document.getElementById("search-field");
  const getText = searchField.value;
  console.log(getText);
  phoneLoad(getText);
};
