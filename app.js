const btn = document.getElementById("btn");
const finalAvgDiv = document.getElementById("final-avg");
const rows = document.querySelectorAll("table tr");
const clearBtn = document.getElementById("clearBtn"); 

// TD
const tdOnlyModules = ["Reading & TA", "Digital Litracy", "French"];

// count average
btn.addEventListener("click", (e) => {
  e.preventDefault();

  let total = 0;
  let totalCoef = 0;
  let hasEmpty = false;

  rows.forEach((row, index) => {
    if (index === 0) return;

    const moduleName = row.children[0].textContent.trim();
    const coef = Number(row.querySelector(".coef").textContent);
    const tdInput = row.querySelector(".td-grade");
    const examInput = row.querySelector(".exam-grade");

    const td = tdInput.value;
    const exam = examInput ? examInput.value : "";

    if (td === "" || (!tdOnlyModules.includes(moduleName) && exam === "")) {
      hasEmpty = true;
    }

    let result = 0;

    if (tdOnlyModules.includes(moduleName)) {
      result = Number(td);
    } else {
      result =(Number(td) * 0.4)+ (Number(exam) * 0.6);
    }

    total += result * coef;
    totalCoef += coef;

    localStorage.setItem(`td_${index}`, td);
    if (examInput) {
      localStorage.setItem(`exam_${index}`, exam);
    }
  });

  if (hasEmpty) {
    alert("Please fill in all inputs");
    return;
  }

  const finalAvg = (total / totalCoef).toFixed(2);
  finalAvgDiv.textContent = `Final Average: ${finalAvg}`;

  finalAvgDiv.className =
    Number(finalAvg) < 10
      ? "text-red-600 font-bold text-xl"
      : "text-green-600 font-bold text-xl";
});

// locale storage
window.addEventListener("load", () => {
  rows.forEach((row, index) => {
    if (index === 0) return;

    const tdInput = row.querySelector(".td-grade");
    const examInput = row.querySelector(".exam-grade");

    const savedTD = localStorage.getItem(`td_${index}`);
    const savedExam = localStorage.getItem(`exam_${index}`);

    tdInput.value =
      savedTD !== null && savedTD !== "" && savedTD !== "0" ? savedTD : "";

    if (examInput) {
      examInput.value =
        savedExam !== null && savedExam !== "" && savedExam !== "0"
          ? savedExam
          : "";
    }
  });
});

// Clear form 
clearBtn.addEventListener("click", () => {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  finalAvgDiv.textContent = "";
});

