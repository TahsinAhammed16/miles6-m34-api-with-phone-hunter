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
                          <button class="btn btn-accent text-white" onclick="handleShowDetail('${phone.slug}')">Show Details</button>
                      </div>
                  </div>`;
    phoneContainer.appendChild(phoneCard);
  }
  // hide loading spinner
  toggleLoadingSpinner(false);
}

// load single phone card data
const handleShowDetail = (slug) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then((res) => res.json())
    .then((data) => {
      const phone = data.data;
      showPhoneDetails(phone);
    });
};

// show phone details
const showPhoneDetails = (phone) => {
  const showDetailContainer = document.getElementById("show-detail-container");
  console.log(phone);
  showDetailContainer.innerHTML = `<div class= "bg-slate-200 rounded-lg mb-8"> 
  <img class="mx-auto" src="${phone.image}" alt="">
  </div
  <h1><span class="text-3xl font-bold">${phone.name}</span></h1>
  <p class="text-xs py-3">It is a long established fact that a reader will be distracted by the
      readable
      <br>
      content of a page when looking at its layout.
  </p>
  <p class="text-sm pb-1"><span class="font-semibold">Storage :</span> ${phone?.mainFeatures?.storage}</p>
  <p class="text-sm pb-1"><span class="font-semibold">Display Size :</span> ${phone?.mainFeatures?.displaySize}</p>
  <p class="text-sm pb-1"><span class="font-semibold">Chipset :</span> ${phone?.mainFeatures?.chipSet}</p>
  <p class="text-sm pb-1"><span class="font-semibold">Memory : </span> ${phone?.mainFeatures?.memory}</p>
  <p class="text-sm pb-1"><span class="font-semibold">Slug :</span> ${phone?.slug}</p>
  <p class="text-sm pb-1"><span class="font-semibold">Release data :</span> ${phone?.releaseDate}</p>
  <p class="text-sm pb-1"><span class="font-semibold">Brand :</span> ${phone?.brand}</p>
  <p class="text-sm pb-1"><span class="font-semibold">GPS :</span> ${phone?.others?.GPS}</p>`;

  // display the modal
  showDetailsModal.showModal();
};

// search input, button
const handleSearch = () => {
  // (1) loading spinner function call line 57
  toggleLoadingSpinner(true);

  const searchField = document.getElementById("search-field");
  const getText = searchField.value;
  console.log(getText);
  phoneLoad(getText);
};

// (2) loading spinner -- (3) hide spinner line 42
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
