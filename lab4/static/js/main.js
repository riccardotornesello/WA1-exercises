let library, table;

function reloadTable(films) {
  table.innerHTML = "";

  films.forEach((element) => {
    let row = table.insertRow();

    let title = row.insertCell(0);
    title.innerText = element.title;
    if (element.favorite) title.className = "favorite";

    let favorite = row.insertCell(1);
    favorite.innerHTML = `
            <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
            Favorite
            </label>
        `;
    if (element.favorite) favorite.firstElementChild.checked = true;

    let date = row.insertCell(2);
    if (element.watchDate)
      date.innerText = element.watchDate.format("MMMM D, YYYY");

    let rating = row.insertCell(3);
    for (let i = 0; i < element.rating; i++)
      rating.innerHTML += `<i class="bi bi-star-fill"></i>`;
    for (let i = 0; i < 5 - element.rating; i++)
      rating.innerHTML += `<i class="bi bi-star"></i>`;
  });
}

window.addEventListener("load", (event) => {
  library = new FilmLibrary();
  table = document.getElementById("filmsbody");

  // Adding the films to the FilmLibrary
  const f1 = new Film(1, "Pulp Fiction", true, "2022-03-10", 5);
  const f2 = new Film(2, "21 Grams", true, "2022-03-17", 4);
  const f3 = new Film(3, "Star Wars", false);
  const f4 = new Film(4, "Matrix", false);
  const f5 = new Film(5, "Shrek", false, "2022-03-21", 3);
  library.addNewFilm(f1);
  library.addNewFilm(f2);
  library.addNewFilm(f3);
  library.addNewFilm(f4);
  library.addNewFilm(f5);

  reloadTable(library.sortByDate());
});

var triggerTabList = [].slice.call(document.querySelectorAll("#filterList a"));
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl);

  triggerEl.addEventListener("click", function (event) {
    event.preventDefault();
    tabTrigger.show();
    switch (event.target.id) {
      case "all":
        reloadTable(library.sortByDate());
        break;
      case "favorite":
        reloadTable(library.favorite());
        break;
      case "bestrated":
        reloadTable(library.bestRated());
        break;
      case "seenlastmonth":
        reloadTable(library.seenLastMonth());
        break;
    }
  });
});
