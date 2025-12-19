let incidentdata = JSON.parse(localStorage.getItem("incidentdata")) || [];

const listbox = document.getElementById("incidentList");
const detailbox = document.getElementById("incidentDetails");

const threatfilter = document.getElementById("filterThreat");
const statusfilter = document.getElementById("filterStatus");

const form = document.getElementById("incidentForm");

const titleinput = document.getElementById("title");
const locationinput = document.getElementById("location");
const threatinput = document.getElementById("threat");
const statusinput = document.getElementById("status");
const descriptioninput = document.getElementById("description");
function renderlist() {
  listbox.innerHTML = "";

  let tfilter = threatfilter.value;
  let sfilter = statusfilter.value;

  let visibledata = incidentdata.filter(item =>
    (tfilter === "all" || item.threat === tfilter) &&
    (sfilter === "all" || item.status === sfilter)
  );

  if (visibledata.length === 0) {
    listbox.innerHTML = "<p>No incidents to display.</p>";
    return;
  }

  visibledata.forEach(item => {
    let card = document.createElement("div");
    card.className = "incident-card";

    if (item.threat === "Critical") {
      card.classList.add("critical");
    }
    card.innerHTML = `
      <strong>${item.title}</strong><br>
      Location: ${item.location}<br>
      Threat: ${item.threat}<br>
      Status: ${item.status}<br>
      Time: ${item.time}
    `;

    card.onclick = () => showdetails(item);
    listbox.appendChild(card);
  });
}
function showdetails(item) {
  detailbox.innerHTML = `
    <h2>${item.title}</h2>
    <p><strong>Location:</strong> ${item.location}</p>
    <p><strong>Threat:</strong> ${item.threat}</p>
    <p><strong>Status:</strong> ${item.status}</p>
    <p><strong>Description:</strong> ${item.description}</p>
    <p><strong>Reported:</strong> ${item.time}</p>
  `;
}

form.onsubmit = function (e) {
  e.preventDefault();

  let newentry = {
    title: titleinput.value.trim(),
    location: locationinput.value.trim(),
    threat: threatinput.value,
    status: statusinput.value,
    description: descriptioninput.value.trim(),
    time: new Date().toLocaleString()
  };

   incidentdata.unshift(newentry);
  localStorage.setItem("incidentdata", JSON.stringify(incidentdata));

  form.reset();

  threatfilter.value = "all";
  statusfilter.value = "all";

  renderlist();
  listbox.scrollIntoView({ behavior: "smooth" });
};

threatfilter.onchange = renderlist;
statusfilter.onchange = renderlist;

renderlist();