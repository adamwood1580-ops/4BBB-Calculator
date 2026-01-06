function calculate() {
  const slope = parseFloat(document.getElementById("slope").value);
  const rating = 66.5;
  const par = 69;

  const rows = document.querySelectorAll("#players tbody tr");
  let playingHandicaps = [];

  // Reset row styling
  rows.forEach(row => row.style.background = "");

  rows.forEach(row => {
    const indexInput = row.cells[1].querySelector("input");
    const index = parseFloat(indexInput.value);

    if (isNaN(index)) {
      row.cells[2].textContent = "";
      row.cells[3].textContent = "";
      row.cells[4].textContent = "";
      return;
    }

    // Course Handicap (WHS)
    const course =
      (index * slope / 113) + (rating - par);

    // Playing Handicap (4BBB 90%)
    const playing = course * 0.9;

    const roundedCourse = Math.round(course);
    const roundedPlaying = Math.round(playing);

    row.cells[2].textContent = roundedCourse;
    row.cells[3].textContent = roundedPlaying;

    playingHandicaps.push(roundedPlaying);
  });

  if (playingHandicaps.length === 0) return;

  const lowest = Math.min(...playingHandicaps);

  rows.forEach(row => {
    const playing = parseInt(row.cells[3].textContent);
    if (!isNaN(playing)) {
      row.cells[4].textContent = playing - lowest;

      // Highlight lowest handicap player
      if (playing === lowest) {
        row.style.background = "#e8f5e9";
      }
    }
  });
}

// Auto-recalculate on input change
document.addEventListener("input", function (e) {
  if (e.target.tagName === "INPUT") {
    calculate();
  }
});
