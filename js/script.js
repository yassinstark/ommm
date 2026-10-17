
document.addEventListener("DOMContentLoaded", () => {
  // Soundtrack
  const universeSong = document.getElementById("universeSong");
  const enterUniverse = document.getElementById("enterUniverse");

  if (universeSong && enterUniverse) {
    enterUniverse.addEventListener("click", () => {
      universeSong.play().catch(() => {
        // Playback may require the audio file to exist first.
      });
    });
  }

  // Director's cut: expandable memory notes
  document.querySelectorAll(".memory-file").forEach((file) => {
    file.addEventListener("click", () => {
      const isOpen = file.classList.toggle("open");
      file.setAttribute("aria-expanded", String(isOpen));

      const action = file.querySelector(".file-action");

      if (action) {
        action.textContent = isOpen
          ? "Close confidential note −"
          : "Open confidential note +";
      }
    });
  });

  // Reading progress bar
  const progressBar = document.getElementById("progressBar");

  function updateProgress() {
    if (!progressBar) return;

    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener("scroll", updateProgress, {
    passive: true
  });

  window.addEventListener("resize", updateProgress);
  updateProgress();

  // Subtle reveal animation
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document
      .querySelectorAll(
        "section > *, .card, .poster, .promise, .envelope-wrap"
      )
      .forEach((item) => {
        item.classList.add("reveal");
        revealObserver.observe(item);
      });
  }

  // Open and close the letter
  const openButton = document.getElementById("openLetter");
  const letter = document.getElementById("letterText");

  if (openButton && letter) {
    openButton.addEventListener("click", () => {
      const isOpen = letter.classList.toggle("open");

      openButton.setAttribute("aria-expanded", String(isOpen));

      const smallText = openButton.querySelector("small");

      if (smallText) {
        smallText.textContent = isOpen
          ? "Tap to close · Keep the magic"
          : "Tap to open · From Kokky";
      }

      if (isOpen) {
        letter.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }
    });
  }

  // Confetti effect
  function sprinkle() {
    const layer = document.getElementById("confetti");

    if (!layer) return;

    const symbols = ["✿", "♡", "✧", "❀", "⋆"];
    const colors = [
      "#e6a7bd",
      "#d9bd88",
      "#f5e5ee",
      "#c5b7e7"
    ];

    for (let i = 0; i < 36; i++) {
      const petal = document.createElement("span");

      petal.className = "petal";
      petal.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDelay = `${Math.random() * 1.3}s`;
      petal.style.animationDuration = `${2.5 + Math.random() * 2}s`;
      petal.style.color =
        colors[Math.floor(Math.random() * colors.length)];
      petal.style.fontSize = `${12 + Math.random() * 15}px`;

      layer.appendChild(petal);

      petal.addEventListener("animationend", () => {
        petal.remove();
      });
    }
  }

  const smileButton = document.getElementById("smileButton");

  if (smileButton) {
    smileButton.addEventListener("click", () => {
      sprinkle();

      smileButton.textContent = "That smile looks good on you ♡";

      window.setTimeout(() => {
        smileButton.innerHTML =
          'A little extra magic <span>✧</span>';
      }, 3500);
    });
  }
});
