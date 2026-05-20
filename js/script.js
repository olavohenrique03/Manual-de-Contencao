const BASE_PATH = "/Proj_Joana/";

fetch( BASE_PATH + "components/header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });

fetch( BASE_PATH + "./components/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });