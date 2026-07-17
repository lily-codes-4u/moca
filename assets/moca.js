/* MOCA shared behaviour: nav dropdowns, date line, site search, slideshow. */

// Close open nav dropdowns when clicking elsewhere.
document.addEventListener("click", function (e) {
  document.querySelectorAll("nav.main details[open]").forEach(function (d) {
    if (!d.contains(e.target)) d.removeAttribute("open");
  });
});

// Today's date in the header date bar, if present.
(function () {
  var el = document.getElementById("todaysdate");
  if (el) {
    el.textContent = new Date().toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  }
})();

// Site search: send a site-restricted query to Google.
(function () {
  var form = document.getElementById("sitesearch");
  if (!form) return;
  form.addEventListener("submit", function () {
    var q = form.querySelector("input[type=search]");
    q.value = "site:moca.virtual.museum " + q.value;
  });
})();

// Slideshow: any .slideshow element cycles its images every 4 seconds.
document.querySelectorAll(".slideshow").forEach(function (show) {
  var imgs = show.querySelectorAll(".stage img");
  if (!imgs.length) return;
  var count = show.querySelector(".count");
  var i = 0, timer = null;

  function go(n) {
    imgs[i].classList.remove("on");
    i = (n + imgs.length) % imgs.length;
    imgs[i].classList.add("on");
    if (count) count.textContent = (i + 1) + " / " + imgs.length;
  }
  function tick() { go(i + 1); }
  function restart() { clearInterval(timer); timer = setInterval(tick, 4000); }

  go(0);
  restart();
  var prev = show.querySelector(".prev");
  var next = show.querySelector(".next");
  if (prev) prev.addEventListener("click", function () { go(i - 1); restart(); });
  if (next) next.addEventListener("click", function () { go(i + 1); restart(); });
  show.addEventListener("mouseenter", function () { clearInterval(timer); });
  show.addEventListener("mouseleave", restart);
});
