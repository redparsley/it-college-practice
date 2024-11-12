// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

const selectItem = document.getElementById("yearSinceStudy");
const tableContainer = document.getElementById("tableContainer");
const clearTableBtn = document.getElementById("clearTableBtn");
const mainForm = document.getElementById("mainForm");

// 1.1 Отрисовка недостающих динамичных элементов на странице: выпадающий список в форме и таблица

// Массив с заголовками таблицы
const tableHeadingsArr = {
  fullName: "ФИО",
  faculty: "Факультет/ Специальность",
  dateOfBirthHeading: "Дата рождения",
  age: "Возраст",
  studyYears: "Год начала/ конца обучения",
  grade: "Курс",
};

// ! Создание таблицы на странице
function createTable(obj) {
  const mainTable = document.createElement("table");
  const mainTableHead = document.createElement("thead");
  const tableTr = document.createElement("tr");

  mainTable.classList.add("table", "table-hover", "mb-3");
  mainTableHead.classList.add("thead");

  for (elem in obj) {
    const tableTh = document.createElement("th");
    tableTh.textContent = obj[elem];
    if (tableTh.textContent === `${obj.fullName}`) {
      tableTh.colSpan = "3";
      tableTh.dataset.type = "fullName";
    } else if (tableTh.textContent === `${obj.faculty}`) {
      tableTh.dataset.type = "faculty";
    } else if (tableTh.textContent === `${obj.age}`) {
      tableTh.dataset.type = "age";
    } else if (tableTh.textContent === `${obj.studyYears}`) {
      tableTh.dataset.type = "studyYears";
    }
    tableTr.append(tableTh);
  }

  mainTableHead.append(tableTr);
  mainTable.append(mainTableHead);
  tableContainer.append(mainTable);

  return mainTable;
}

// Создание актуального для текущего года селекта для формы
function createSelectOptions() {
  for (i = 2000; i <= new Date().getFullYear(); i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectItem.append(option);
  }
}

// Максимально возможная дата рождения
const maxDate =
  new Date().getFullYear() +
  "-" +
  (new Date().getMonth() + 1) +
  "-" +
  new Date().getDate();
document.getElementById("dateOfBirth").max = maxDate;

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

let studentsList = [
  {
    lastName: "Дмитриева",
    firstName: "Ирина",
    middleName: "Денисовна",
    dateOfBirth: "20-09-2007",
    yearSinceStudy: "2022",
    faculty: "ИТ",
  },
  {
    lastName: "Шишкин",
    firstName: "Петр",
    middleName: "Олегович",
    dateOfBirth: "02-02-2002",
    yearSinceStudy: "2020",
    faculty: "Филология",
  },
  {
    lastName: "Абдубеков",
    firstName: "Константин",
    middleName: "Денисович",
    dateOfBirth: "30-09-2007",
    yearSinceStudy: "2024",
    faculty: "Физмат",
  },
  {
    lastName: "Рылкова",
    firstName: "Раиса",
    middleName: "Александровна",
    dateOfBirth: "23-03-2007",
    yearSinceStudy: "2023",
    faculty: "ИТ",
  },
  {
    lastName: "Миронов",
    firstName: "Максим",
    middleName: "Андреевич",
    dateOfBirth: "26-06-2007",
    yearSinceStudy: "2023",
    faculty: "ИТ",
  },
  {
    lastName: "Смирнова",
    firstName: "Екатерина",
    middleName: "Сергеевна",
    dateOfBirth: "25-12-2006",
    yearSinceStudy: "2022",
    faculty: "Педагогический",
  },
  {
    lastName: "Кузнецова",
    firstName: "Александра",
    middleName: "Владимировна",
    dateOfBirth: "01-03-2007",
    yearSinceStudy: "2023",
    faculty: "Медицинский",
  },
  {
    lastName: "Попова",
    firstName: "Виктория",
    middleName: "Николаевна",
    dateOfBirth: "10-09-2005",
    yearSinceStudy: "2021",
    faculty: "Экономический",
  },
  {
    lastName: "Михайлова",
    firstName: "Юлия",
    middleName: "Ивановна",
    dateOfBirth: "20-02-2006",
    yearSinceStudy: "2022",
    faculty: "Юридический",
  },
  {
    lastName: "Петрова",
    firstName: "Анна",
    middleName: "Викторовна",
    dateOfBirth: "05-05-2004",
    yearSinceStudy: "2020",
    faculty: "Инженерный",
  },
  {
    lastName: "Лебедева",
    firstName: "Елена",
    middleName: "Андреевна",
    dateOfBirth: "12-11-2003",
    yearSinceStudy: "2019",
    faculty: "Медицинский",
  },
  {
    lastName: "Сергеева",
    firstName: "Наталья",
    middleName: "Владимировна",
    dateOfBirth: "28-02-2002",
    yearSinceStudy: "2018",
    faculty: "Педагогический",
  },
];

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

// ! 3.1 Создание отдельной строки таблицы
createRow = (obj) => {
  yearsDiff = () => {
    // ? Логика: из 4х лет обучения (всего) вычитается остаток лет обучения. Дальше в коде в зависимости от даты настоящего времени округляется либо в большую сторону, либо в меньшую
    let diff =
      4 -
      (new Date(`09-01-${+obj.yearSinceStudy + 4}`) - new Date()) /
        (1000 * 60 * 60 * 24 * 30 * 12);

    return diff;
  };
  const tableTr = document.createElement("tr");

  let correctDate = obj.dateOfBirth.split("-").reverse();

  tableTr.insertAdjacentHTML(
    "afterbegin",
    `
    <td>${obj.lastName}</td>
    <td>${obj.firstName}</td>
    <td>${obj.middleName}</td>
    <td>${obj.faculty}</td>
    <td>${obj.dateOfBirth}</td>
    <td>${moment(new Date()).diff(new Date(correctDate.join("-")), "years")}</td>
    <td>${obj.yearSinceStudy} - ${+obj.yearSinceStudy + 4}</td>
    <td>${
      new Date(`09-01-${+obj.yearSinceStudy + 4}`) < new Date()
        ? "Окончил/а обучение"
        : `${
            new Date().getMonth() > 7
              ? `${Math.ceil(yearsDiff())} курс`
              : `${Math.floor(yearsDiff())} курс`
          }`
    }</td>
    `
  ); // Если 1-е сент года окончания обучения уже прошло, то студент закончил обучение. Если нет, проверка: если август нынешнего года уже прошел, то студент переходит на следующий курс
  return tableTr;
};

// ! 3.2 Создание функции вывода конкретного студента
function getStudent(obj) {
  mainTable = !document.querySelector(".table")
    ? createTable(tableHeadingsArr)
    : document.querySelector(".table");

  if (!document.querySelector(".tbody")) {
    const mainTableBody = document.createElement("tbody");
    mainTableBody.classList.add("tbody");
    mainTableBody.append(createRow(obj));
    mainTable.append(mainTableBody);
  } else {
    document.querySelector(".tbody").append(createRow(obj));
  }
}

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

function getFullTable(studArr) {
  for (i = 0; i < studArr.length; i++) {
    getStudent(studArr[i], i + 1);
  }
}

// Этап 5. Создайте функцию сортировки массива(1) студентов и добавьте события кликов(2) на соответствующие колонки.

// ! 5.1 Сортировка таблицы

function sortTable(arr, key, dir = false) {
  let sortedArr = arr.slice().sort((obj2, obj1) => {
    let dirAZ = !dir ? obj2[key] < obj1[key] : obj2[key] > obj1[key];

    if (key === "lastName") {
      if (obj2[key] === obj1[key]) {
        newKey = "firstName";
        dirAZ = !dir
          ? obj2[newKey] < obj1[newKey]
          : obj2[newKey] > obj1[newKey];
      }
    }

    if (key == "dateOfBirth") {
      const obj1Date = obj1[key].split("-").reverse().join("-");
      const obj2Date = obj2[key].split("-").reverse().join("-");

      dirAZ = !dir
        ? new Date(obj2Date) > new Date(obj1Date)
        : new Date(obj2Date) < new Date(obj1Date);
    }

    if (dirAZ) return -1;
    else return 1;
  });

  return sortedArr;
}

// функция нужна для того, чтобы определить по какому ключу необходимо сортировать массив студентов
getKey = (targetEl) => {
  dataTag = targetEl.dataset.type;
  let key;

  switch (dataTag) {
    case "fullName":
      key = "lastName";
      break;
    case "faculty":
      key = "faculty";
      break;
    case "dateOfBirthHeading":
      key = "dateOfBirth";
      break;
    case "age":
      key = "dateOfBirth";
      break;
    case "studyYears":
      key = "yearSinceStudy";
      break;
  }

  return key;
};

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.

// 6.1 кнопка выбора фильтра

// 6.2 Фильтрация массива

function filterTable(arr, inpId) {
  let filteredArr;

  document.getElementById(`${inpId}`).addEventListener("input", (e) => {
    value = e.target.value.toLowerCase();

    if (inpId === "fullNameFilter") {
      filteredArr = arr.filter((student) => {
        student.firstName.toLowerCase().includes(value);
        student.lastName.toLowerCase().includes(value);
        student.middleName.toLowerCase().includes(value);
      });
    }
  });

  return filteredArr;
}

// 6.3 Применение фильтров

// ! Отрисовка страницы
document.addEventListener("DOMContentLoaded", () => {
  createSelectOptions();
  createTable(tableHeadingsArr);
  getFullTable(studentsList);

  document.querySelector("thead").addEventListener("click", (e) => {
    if (!e.target.hasAttribute("data-type")) return;
    e.target.classList.toggle("dirAZ");

    document.querySelector("tbody").innerHTML = "";

    // передаем отсортированный массив, не изменяя исходный
    getFullTable(
      sortTable(
        studentsList,
        getKey(e.target),
        e.target.classList.contains("dirAZ") ? false : true
      )
    );
  });
});

// bootstrap dropdowns
const dropdownElementList = document.querySelectorAll(".dropdown-toggle");
const dropdownList = [...dropdownElementList].map(
  (dropdownToggleEl) => new bootstrap.Dropdown(dropdownToggleEl)
);

// кнопка "удалить таблицу"
clearTableBtn.addEventListener("click", () => {
  if (
    confirm(
      "Вы уверены, что хотите удалить всю информацию о студентах? Восстановить ее будет невозможно"
    )
  ) {
    studentsList = [];

    if (studentsList.length === 0) {
      tableContainer.removeChild(document.querySelector(".table"));
      clearTableBtn.style.display = "none";
      document.querySelector(".wrapper-filters").style.display = "none";
      document.querySelector(".wrapper-filters").insertAdjacentHTML(
        "afterend",
        `
      <p class="message">Не удалось найти информацию. Добавьте нового студента</p>
      `
      );
    }

    getFullTable(studentsList);
  }
});

// функция обработки объекта из формы, возвращает объект нужного формата, типа объекта studendsList
function serializeForm(formNode) {
  const { elements } = formNode;

  // отсев из функции ненужного пустого поля
  // data вернет массив объектов
  // data:
  // [ {name[0]: ["значение[0]"]}, ... ]

  const data = Array.from(elements)
    .filter((item) => item.name)
    .map((element) => {
      
      const { name, value } = element;

      let isFieldEmpty = element.value.trim() == "" ? true : false;
      
      const error = document.createElement("p");
      error.textContent = "Заполните поле!";
      error.classList.add("error");

      // сработает к пустым элементам формы
      if (isFieldEmpty) {
        // console.log(element.value.trim())
        if (!element.parentNode.querySelector("p")) {
          element.parentNode.append(error)
        }
        return 0;
      }

      return { [name]: value };
    });

  // объединение объектов в один, типа элемента studendsList
  [obj1, obj2, obj3, obj4, obj5, obj6] = data;
  const mergedData = { ...obj1, ...obj2, ...obj3, ...obj4, ...obj5, ...obj6 };
  console.log(mergedData)
  // проверка полей на пустоту
  for (field of data) {
    if (field === 0) {
      console.log("wrong data: there are empty fields in the form");
      return;
    }
  }

  mainForm.querySelectorAll(".error").forEach((e) => e.remove()); // если значение корректно, убирается ошибка
  Array.from(elements).forEach((el) => (el.value = "")); // очистка формы
  alert(`Студент добавлен в таблицу!`);

  studentsList.push(mergedData);

  return mergedData;
}

// ! слушатель формы
mainForm.addEventListener("submit", (e) => {
  e.preventDefault();

  getStudent(serializeForm(mainForm));
  if (tableContainer.querySelector("p")) {
    tableContainer.querySelector("p").remove();
  }

  clearTableBtn.style.display = "block";
  document.querySelector(".wrapper-filters").style.display = "flex";
});
