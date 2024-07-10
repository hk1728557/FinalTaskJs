
const jobContainer = document.querySelector(".job-listings");
const filterContainer = document.querySelector(".filter-tags");
const clearButton = document.querySelector(".clear");

let filters = [];

function displayJobs(jobs) {
  jobContainer.innerHTML = "";
  jobs.forEach((job) => {
    const jobElement = document.createElement("div");
    jobElement.classList.add("job-listing");
    if (job.featured) jobElement.classList.add("featured");

    jobElement.innerHTML = `
        <img src="${job.logo}" alt="${job.company} logo">
        <div class="info-container">
            <div class="job-info">
            <div class="job-header">
                <h3>${job.company}</h3>
                ${job.new ? '<span class="new">NEW!</span>' : ""}
                ${job.featured ? '<span class="featured">FEATURED</span>' : ""}
            </div>
            <h2>${job.position}</h2>
            <p>${job.postedAt} · ${job.contract} · ${job.location}</p>
            </div>
            <div class="job-tags">
                <span>${job.role}</span>
                <span>${job.level}</span>
                ${job.languages.map((lang) => `<span>${lang}</span>`).join("")}
                ${job.tools.map((tool) => `<span>${tool}</span>`).join("")}
            </div>
        </div>
      `;

    jobContainer.appendChild(jobElement);
  });

  document.querySelectorAll(".job-tags span").forEach((tag) => {
    tag.addEventListener("click", () => {
      if (!filters.includes(tag.textContent)) {
        filters.push(tag.textContent);
        updateFilters();
      }
    });
  });
}

function updateFilters() {
  filterContainer.innerHTML = filters
    .map(
      (filter) =>
        `<span>${filter}<img class="remove-img" src="images/icon-remove.svg" alt="Remove"></span>`
    )
    .join("");
  filterJobs();

  document.querySelectorAll(".remove-img").forEach((removeIcon) => {
    removeIcon.addEventListener("click", (event) => {
      const filterText = event.target.parentElement.textContent;
      filters = filters.filter((filter) => filter !== filterText);
      updateFilters();
    });
  });
}

function filterJobs() {
  const filteredJobs = jobListings.filter((job) => {
    const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
    return filters.every((filter) => jobTags.includes(filter));
  });

  displayJobs(filteredJobs);
}

clearButton.addEventListener("click", () => {
  filters = [];
  filterContainer.innerHTML = "";
  displayJobs(jobListings);
});

// Initial display
displayJobs(jobListings);
