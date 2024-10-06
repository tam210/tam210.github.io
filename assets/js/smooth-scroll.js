  document.addEventListener("wheel", function(event) {
    const delta = event.deltaY;
    const smoothScrollSpeed = 2;
    window.scrollBy({
      top: delta * smoothScrollSpeed,
      behavior: "smooth",
    });
    event.preventDefault();
  });
