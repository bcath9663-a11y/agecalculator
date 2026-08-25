const dobText=document.getElementById("dobText");
const dobPicker=document.getElementById("dobPicker");
const calendarBtn=document.getElementById("calendarBtn");
const calculateBtn=document.getElementById("calculateBtn");
const resetBtn=document.getElementById("resetBtn");
const copyBtn=document.getElementById("copyBtn");
const shareBtn=document.getElementById("shareBtn");
const errorMsg=document.getElementById("errorMsg");
const result=document.getElementById("result");
let selectedDOB = null;
let liveTimer = null;
/* =========================================
   MAXIMUM DATE = TODAY
========================================= */

function getTodayString() {

  const today=new Date();
  const year=today.getFullYear();
  const month =
    String(
      today.getMonth() + 1
    ).padStart(2, "0");
    const day =
    String(
      today.getDate()
    ).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

dobPicker.max =
  getTodayString();
/* =========================================
   CALENDAR BUTTON
========================================= */
calendarBtn.addEventListener(
  "click",
  function () {

    if (
      dobPicker.showPicker
    ) {

      dobPicker.showPicker();

    }

    else {

      dobPicker.focus();

      dobPicker.click();

    }

  }
);
/* =========================================
   AUTO FORMAT DATE
========================================= */

dobText.addEventListener(
  "input",
  function () {

    let digits =
      dobText.value
        .replace(/\D/g, "")
        .slice(0, 8);


    let formatted =
      digits;


    if (
      digits.length > 4
    ) {

      formatted =
        digits.slice(0, 2) +
        "/" +
        digits.slice(2, 4) +
        "/" +
        digits.slice(4);

    }

    else if (
      digits.length > 2
    ) {

      formatted =
        digits.slice(0, 2) +
        "/" +
        digits.slice(2);

    }


    dobText.value =
      formatted;

  }
);
/* =========================================
   DATE PICKER
========================================= */

dobPicker.addEventListener(
  "change",
  function () {

    if (
      !dobPicker.value
    ) {

      return;

    }
    const [
      year,
      month,
      day
    ] =
      dobPicker.value.split("-");


    dobText.value =
      `${day}/${month}/${year}`;

  }
);
/* =========================================
   PARSE DATE
========================================= */

function parseTypedDate(str) {

  const match =
    str.match(
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
    );


  if (!match) {

    return null;

  }


  const day =
    parseInt(
      match[1]
    );


  const month =
    parseInt(
      match[2]
    );


  const year =
    parseInt(
      match[3]
    );


  const date =
    new Date(
      year,
      month - 1,
      day,
      0,
      0,
      0
    );


  if (

    date.getFullYear() !== year ||

    date.getMonth() !== month - 1 ||

    date.getDate() !== day

  ) {

    return null;

  }


  return date;

}
/* =========================================
   AGE CALCULATION
========================================= */

function getAge(
  dob,
  today = new Date()
) {

  let years =
    today.getFullYear() -
    dob.getFullYear();


  let months =
    today.getMonth() -
    dob.getMonth();


  let days =
    today.getDate() -
    dob.getDate();


  if (
    days < 0
  ) {

    months--;


    const previousMonth =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );


    days +=
      previousMonth.getDate();

  }


  if (
    months < 0
  ) {

    years--;

    months += 12;

  }


  return {
    years,
    months,
    days
  };

}
/* =========================================
   LIFE STATISTICS
========================================= */

function calculateStatistics(dob) {

  const now =
    new Date();


  const difference =
    now - dob;


  const totalDays =
    Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    );


  const totalHours =
    Math.floor(
      difference /
      (1000 * 60 * 60)
    );


  const totalWeeks =
    Math.floor(
      totalDays / 7
    );


  const totalMonths =
    Math.floor(

      (now.getFullYear() -
        dob.getFullYear()) * 12 +

      (now.getMonth() -
        dob.getMonth())

    );


  return {

    totalDays,

    totalHours,

    totalWeeks,

    totalMonths

  };

}
/* =========================================
   DAY OF BIRTH
========================================= */

function getBirthDay(dob) {

  return dob.toLocaleDateString(
    "en-US",
    {
      weekday: "long"
    }
  );

}
/* =========================================
   GENERATION
========================================= */

function getGeneration(year) {

  if (
    year >= 2013
  ) {
    return "Gen Alpha";

  }


  if (
    year >= 1997
  ) {

    return "Gen Z";

  }


  if (
    year >= 1981
  ) {

    return "Millennial";

  }


  if (
    year >= 1965
  ) {

    return "Gen X";

  }


  if (
    year >= 1946
  ) {

    return "Boomer";

  }


  return "Silent Gen";

}
/* =========================================
   NEXT BIRTHDAY
========================================= */

function getNextBirthday(dob) {

  const now =
    new Date();


  let nextBirthday =
    new Date(
      now.getFullYear(),
      dob.getMonth(),
      dob.getDate()
    );


  if (
    nextBirthday < now
  ) {

    nextBirthday =
      new Date(
        now.getFullYear() + 1,
        dob.getMonth(),
        dob.getDate()
      );

  }


  const difference =
    nextBirthday - now;


  const days =
    Math.ceil(
      difference /
      (1000 * 60 * 60 * 24)
    );


  return {

    nextBirthday,

    days

  };

}


/* =========================================
   LIVE AGE
========================================= */

function updateLiveAge() {

  if (
    !selectedDOB
  ) {

    return;

  }


  const now =
    new Date();


  const age =
    getAge(
      selectedDOB,
      now
    );


  const difference =
    now - selectedDOB;


  const hours =
    Math.floor(
      difference /
      (1000 * 60 * 60)
    ) % 24;


  const minutes =
    Math.floor(
      difference /
      (1000 * 60)
    ) % 60;


  const seconds =
    Math.floor(
      difference /
      1000
    ) % 60;


  document.getElementById(
    "liveAge"
  ).textContent =

    `${age.years} years ` +
    `${age.months} months ` +
    `${age.days} days ` +
    `${hours}h ` +
    `${minutes}m ` +
    `${seconds}s`;

}


/* =========================================
   ERROR
========================================= */

function showError(message) {

  errorMsg.textContent =
    message;

  errorMsg.classList.add(
    "show"
  );

  result.classList.remove(
    "show"
  );

}


function hideError() {

  errorMsg.classList.remove(
    "show"
  );

}


/* =========================================
   MAIN CALCULATE FUNCTION
========================================= */

function calculateAge() {

  const typedValue =
    dobText.value.trim();


  if (
    !typedValue
  ) {

    showError(
      "Please enter or select your date of birth."
    );

    return;

  }


  const dob =
    parseTypedDate(
      typedValue
    );


  if (!dob) {

    showError(
      "Please enter a valid date as DD/MM/YYYY."
    );

    return;

  }


  const today =
    new Date();


  if (
    dob > today
  ) {

    showError(
      "Date of birth cannot be in the future."
    );

    return;

  }


  hideError();


  selectedDOB =
    dob;


  const age =
    getAge(
      dob,
      today
    );


  const statistics =
    calculateStatistics(
      dob
    );


  /* AGE */

  document.getElementById(
    "ageYears"
  ).textContent =
    age.years;


  document.getElementById(
    "ageMonths"
  ).textContent =
    age.months;


  document.getElementById(
    "ageDays"
  ).textContent =
    age.days;


  document.getElementById(
    "totalDays"
  ).textContent =
    statistics.totalDays
      .toLocaleString();


  /* STATISTICS */

  document.getElementById(
    "totalMonths"
  ).textContent =
    statistics.totalMonths
      .toLocaleString();


  document.getElementById(
    "totalWeeks"
  ).textContent =
    statistics.totalWeeks
      .toLocaleString();


  document.getElementById(
    "totalHours"
  ).textContent =
    statistics.totalHours
      .toLocaleString();


  /* BIRTH DATE */

  document.getElementById(
    "birthDate"
  ).textContent =
    dob.toLocaleDateString(
      "en-GB"
    );


  /* BIRTH DAY */

  document.getElementById(
    "birthDay"
  ).textContent =
    getBirthDay(
      dob
    );


  /* GENERATION */

  document.getElementById(
    "generation"
  ).textContent =
    getGeneration(
      dob.getFullYear()
    );


  /* BIRTHDAY */

  const birthday =
    getNextBirthday(
      dob
    );


  document.getElementById(
    "nextBirthday"
  ).textContent =
    birthday.days;


  /* SHOW RESULT */

  result.classList.add(
    "show"
  );


  /* START LIVE AGE */

  clearInterval(
    liveTimer
  );


  updateLiveAge();


  liveTimer =
    setInterval(
      updateLiveAge,
      1000
    );

}


/* =========================================
   COPY
========================================= */

copyBtn.addEventListener(
  "click",
  async function () {

    if (
      !selectedDOB
    ) {

      return;

    }


    const age =
      getAge(
        selectedDOB,
        new Date()
      );


    const statistics =
      calculateStatistics(
        selectedDOB
      );


    const text =

      `🎂 MY AGE REPORT

Age:
${age.years} years,
${age.months} months,
${age.days} days

Born On:
${getBirthDay(selectedDOB)}

Birth Date:
${selectedDOB.toLocaleDateString("en-GB")}

Generation:
${getGeneration(selectedDOB.getFullYear())}

Total Days Lived:
${statistics.totalDays.toLocaleString()}

✨ Smart Age Detection`;


    try {

      await navigator.clipboard
        .writeText(text);


      copyBtn.textContent =
        "✅ Copied!";


      setTimeout(
        function () {

          copyBtn.textContent =
            "📋 Copy";

        },
        1500
      );

    }

    catch {

      alert(
        "Unable to copy the result."
      );

    }

  }
);


/* =========================================
   SHARE
========================================= */

shareBtn.addEventListener(
  "click",
  async function () {

    if (
      !selectedDOB
    ) {

      return;

    }


    const age =
      getAge(
        selectedDOB,
        new Date()
      );


    const text =

      `I am ${age.years} years old! 🎂

Calculated using Smart Age Detection ✨`;


    if (
      navigator.share
    ) {

      try {

        await navigator.share({

          title:
            "My Age",

          text:
            text

        });

      }

      catch {

        console.log(
          "Share cancelled."
        );

      }

    }

    else {

      try {

        await navigator.clipboard
          .writeText(text);


        alert(
          "Sharing is not supported. The result has been copied instead!"
        );

      }

      catch {

        alert(text);

      }

    }

  }
);


/* =========================================
   RESET
========================================= */

resetBtn.addEventListener(
  "click",
  function () {

    dobText.value =
      "";

    dobPicker.value =
      "";

    selectedDOB =
      null;


    clearInterval(
      liveTimer
    );


    result.classList.remove(
      "show"
    );


    hideError();


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }
);


/* =========================================
   ENTER KEY
========================================= */

dobText.addEventListener(
  "keyup",
  function (event) {

    if (
      event.key === "Enter"
    ) {

      calculateAge();

    }

  }
);


/* =========================================
   CALCULATE BUTTON
========================================= */

calculateBtn.addEventListener(
  "click",
  calculateAge
);
