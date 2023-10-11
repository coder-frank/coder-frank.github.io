var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

function toggleFullScreen(cert) {
  const image = document.getElementById(cert);
  image.classList.toggle('fullscreen');
}

function smoothScrollTo(position) {
// Scroll smoothly to the top of the page
window.scrollTo({
top: position,
behavior: 'smooth'
});
}


function getPositionFromTop(element) {
const positionFromTop = element.getBoundingClientRect().top;
alert("Position from top: "+ positionFromTop + " pixels");
}

function closeM()
{
const menu = document.getElementById("menu");
const link = document.getElementById("link");

var t = link.classList
if (t == "fas fa-times")
{
  menu.style.display = "none";
  link.classList.remove('fa-times');
  link.classList.add('fa-bars');
  menu.classList.remove("slide-in");
  menu.classList.add("slide-out");
}
}

function openMenu()
{
const menu = document.getElementById("menu");
const link = document.getElementById("link");

var t = link.classList
if (t == "fas fa-bars")
{
  link.classList.remove('fa-bars');
  link.classList.add('fa-times');
  menu.classList.add("slide-in");
  menu.style.display = "flex";
} else
{
  link.classList.remove('fa-times');
  link.classList.add('fa-bars');
  menu.classList.remove("slide-in");
  menu.classList.add("slide-out");
  setTimeout(function () {
      menu.style.display = "none";
      menu.classList.remove("slide-out");
  }, 300);
}
}

function sendMail() {
// Get form data
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const message = document.getElementById('message').value;

if (name == "" || email == "" || message == "")
{
alert("All fields required");
return;
}
// Prepare mailto link
const subject = encodeURIComponent('Message from ' + name);
const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
const mailtoLink = `mailto:mbanuisfrancis9@gmail.com?subject=${subject}&body=${body}`;

// Redirect the user to the mailto link
window.location.href = mailtoLink;
}

function smoothScroll(target) {
const targetElement = document.querySelector(target);
if (targetElement) {
window.scrollTo({
  top: targetElement.offsetTop,
  behavior: 'smooth' // This enables smooth scrolling
});
}
}

// Smooth scroll when the link is clicked
const smoothScrollLinks = document.querySelectorAll('.smooth-scroll-link');
smoothScrollLinks.forEach(link => {
link.addEventListener('click', event => {
event.preventDefault();
const target = link.getAttribute('href');
smoothScroll(target);
});
});



