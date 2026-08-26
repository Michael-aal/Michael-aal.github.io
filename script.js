
// ================================
// PORTFOLIO INTERACTIONS
// ================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const progress = document.getElementById("scrollProgress");
const year = document.getElementById("year");
const cursorGlow = document.querySelector(".cursor-glow");

// ================================
// MOBILE MENU
// ================================

menuBtn.addEventListener("click", () => {
  const opened = navLinks.classList.toggle("open");

  menuBtn.setAttribute(
    "aria-expanded",
    opened
  );

  menuBtn.textContent = opened ? "✕" : "☰";
});


// Close menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );

    menuBtn.textContent = "☰";

  });

});


// ================================
// SCROLL PROGRESS
// ================================

window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;

  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const percentage =
    height > 0
      ? (scrollTop / height) * 100
      : 0;

  progress.style.width = `${percentage}%`;

});


// ================================
// ACTIVE NAV LINK
// ================================

const sections =
  document.querySelectorAll("section[id]");

const navItems =
  document.querySelectorAll(".nav-links a");

const sectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navItems.forEach(link => {
            link.classList.remove("active");
          });

          const active =
            document.querySelector(
              `.nav-links a[href="#${entry.target.id}"]`
            );

          if (active) {
            active.classList.add("active");
          }

        }

      });

    },
    {
      threshold: 0.35
    }
  );

sections.forEach(section => {
  sectionObserver.observe(section);
});


// ================================
// SCROLL REVEAL
// ================================

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );

revealElements.forEach(element => {
  revealObserver.observe(element);
});


// ================================
// CURSOR GLOW
// ================================

if (window.matchMedia("(pointer:fine)").matches) {

  window.addEventListener("mousemove", event => {

    cursorGlow.style.left =
      `${event.clientX}px`;

    cursorGlow.style.top =
      `${event.clientY}px`;

  });

} else {

  cursorGlow.style.display = "none";

}


// ================================
// PROJECT INTERACTION
// ================================

const projectLinks =
  document.querySelectorAll(".project-link");

const toast =
  document.getElementById("toast");

projectLinks.forEach(link => {

  link.addEventListener("click", event => {

    event.preventDefault();

    const project =
      link.closest(".project-card")
        ?.querySelector("h3")
        ?.textContent || "Project";

    showToast(
      `${project} project link coming soon 🚀`
    );

  });

});

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);

}


// ================================
// CURRENT YEAR
// ================================

year.textContent =
  new Date().getFullYear();


// ================================
// 3D CODE CARD EFFECT
// ================================

const codeCard =
  document.querySelector(".code-card");

if (
  codeCard &&
  window.matchMedia("(pointer:fine)").matches
) {

  codeCard.addEventListener("mousemove", event => {

    const rect =
      codeCard.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const rotateY =
      ((x / rect.width) - 0.5) * 8;

    const rotateX =
      ((y / rect.height) - 0.5) * -8;

    codeCard.style.transform =
      `perspective(800px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-5px)`;

  });


  codeCard.addEventListener("mouseleave", () => {

    codeCard.style.transform =
      "perspective(800px) rotateX(0) rotateY(0)";

  });

}