var MAIL = "lys@exemple.com"; // adresse e-mail de Lys : à remplacer

var $ = function(i) { return document.getElementById(i) };
var n = 1;

$("dt").min = new Date().toISOString().slice(0, 10);
var R = document.querySelectorAll('input[name="ride"]');

function val(k) {
  var e = document.querySelector('input[name="' + k + '"]:checked');
  return e ? e.value : "";
}

function dfr() {
  var d = $("dt").value;
  return d ? d.split("-").reverse().join("/") : "à convenir";
}

function summary() {
  $("n").textContent = n;
  $("s1").textContent = val("ride").replace(/\s*\(.*\)/, "");
  $("s2").textContent = n + " pers. • " + dfr();
}

$("p").onclick = function() { if (n < 20) { n++; summary() } };
$("m").onclick = function() { if (n > 1) { n--; summary() } };

document.addEventListener("change", summary);
summary();

document.querySelectorAll(".pc").forEach(function(c) {
  c.onclick = function() {
    R[+c.dataset.r].checked = true;
    if (c.dataset.r === "1") $("dt").value = "2026-10-17";
    summary();
    location.hash = "reservation";
  };
});

$("go").onclick = function() {
  var nom = $("nom").value.trim();
  var tel = $("tel").value.trim();
  if (!nom || tel.replace(/\D/g, "").length < 8) {
    $("err").textContent = "Merci d'indiquer ton nom et un numéro valide.";
    $("nom").scrollIntoView({ block: "center" });
    return;
  }
  $("err").textContent = "";

  var t = "Bonjour Lys 👋\n" +
          "Je souhaite réserver :\n" +
          "🚴 " + val("ride") + "\n" +
          "📅 " + dfr() + "\n" +
          "👤 " + nom + "\n" +
          "📞 " + tel + "\n" +
          "👥 " + n + " participant(s)\n" +
          "🚲 " + val("velo") + "\n" +
          "📈 Niveau : " + val("niv") +
          ($("msg").value.trim() ? "\n💬 " + $("msg").value.trim() : "") +
          "\nMerci !";

  window.location.href = "mailto:" + MAIL +
    "?subject=" + encodeURIComponent("Réservation — " + val("ride")) +
    "&body=" + encodeURIComponent(t);
};

function route() {
  var r = location.hash === "#reservation";
  $("resa").hidden = !r;
  $("home").hidden = r;
  if (!r && location.hash === "#balades") $("balades").scrollIntoView();
  else window.scrollTo({ top: 0, behavior: "instant" });
}

window.addEventListener("hashchange", route);
route();