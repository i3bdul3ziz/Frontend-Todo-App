let data = [
  {
    title: "التصميم :",
    tasks: [
      {
        taskTitle: "تصميم الشكل العام وتجهيز المهام وتسليمه",
        tag: "",
      },
      {
        taskTitle: "اختبار تحويل التصميم إلى HTML + CSS ",
        tag: "CSS",
      },
      {
        taskTitle: "جعل التصميم متجاوب مع المتصفحات الصغيرة (Responsive)",
        tag: "CSS",
      },
      {
        taskTitle: "جعل التصميم متوافق كحد أدنى مع IE9",
        tag: "Browser",
      },
      {
        taskTitle:
          "استخدام SASS لجعل ألوان التصميم سهلة التغيير (Skin-able/Theme-able)",

        tag: "SASS",
      },
    ],
  },
  {
    title: "تحسينات :",
    tasks: [
      {
        taskTitle: "إمكانية إخفاء القائمة الجانبية",

        tag: "",
      },
      {
        taskTitle: "إمكانية تعليم المهام كمنتهية",

        tag: "",
      },
      {
        taskTitle: "إمكانية إعادة ترتيب المهام والمجموعات",

        tag: "",
      },
      {
        taskTitle: "التوافقية مع أجهزة اللمس",

        tag: "",
      },
    ],
  },
  {
    title: "أخرى :",
    tasks: [
      {
        taskTitle:
          "تسليم المشروع النهائي في git repository مع ملاحظة استخدام git-flow",

        tag: "",
      },
      {
        taskTitle:
          "إضافة لمساتك الخاصة في الأماكن التي تراها مناسبة مع ذكر سبب إضافتها.",

        tag: "",
      },
    ],
  },
];
let filteredTags = [];
let draggedItem = null;

// Handle filling the data in HTML elements using append function
data.forEach((list, index) => {
  $("#list-container").append(`<h1 class='list-title'>${list.title}</h1>`);
  $("#list-container").append(
    `<div id='task-container${index}' class='task-container'></div>`
  );
  list.tasks.forEach((task, task_i) => {
    $(`#task-container${index}`).append(
      `<div class="task" id="task-holder${index}${task_i}" draggable="true">
        <input
          class="checkbox-round"
          type="checkbox"
          name="task${index}${task_i}"
          id="task${index}${task_i}"
        />
        <label class="task-label" for="task${index}${task_i}"
          ><img class="check-icon" src="../images/icon-uncheck.svg"/>
          ${task.taskTitle}
          </label>
          ${task.tag ? `<span class="tag">${task.tag}</span>` : ""}
          <img class="delete-icon" src="../images/icons8-trash.svg"/>
      </div>`
    );
    $(`#task${index}${task_i}`).change(function () {
      if ($(this).is(":checked"))
        $(this).next().find("img").attr("src", "../images/icon-check.svg");
      else $(this).next().find("img").attr("src", "../images/icon-uncheck.svg");
    });
    if (task.tag) filteredTags.push(task.tag); // push the tag to filteredTags

    // make the first task in first list checked
    $(`#task00`).prop("checked", true);
    $(`#task00`)
      .next()
      .find(".check-icon")
      .attr("src", "../images/icon-check.svg");

    //drag and drop functionality
    const taskItem = $(`#task-holder${index}${task_i}`);
    const listItem = $(`#task-container${index}`);
    $(taskItem).on("dragstart", (e) => {
      draggedItem = taskItem;
      setTimeout(() => {
        $(taskItem).css("display", "none");
      }, 0);
    });

    $(taskItem).on("dragend", (e) => {
      setTimeout(() => {
        draggedItem.css("display", "block");
        draggedItem = null;
      }, 0);
    });

    $(listItem).on("dragover", (e) => {
      e.preventDefault();
    });

    $(listItem).on("dragenter", (e) => {
      e.preventDefault();
      $(listItem).css("background-color", "#fbfbfb");
    });

    $(listItem).on("dragleave", (e) => {
      $(listItem).css("background-color", "#fff");
    });

    $(listItem).on("drop", (e) => {
      $(listItem).append(draggedItem);
      $(listItem).css("background-color", "#fff");
    });

    //delete task
    $(`#task-holder${index}${task_i}`).on("mouseover", (e) => {
      $(`#task-holder${index}${task_i}`)
        .find(".delete-icon")
        .css("display", "block");

      // delete the task when the mouse enter the task and the user click on the delete icon
      $(`#task-holder${index}${task_i}`)
        .find(".delete-icon")
        .on("click", (e) => {
          $(`#task-holder${index}${task_i}`).css("display", "none");
        });
    });

    $(`#task-holder${index}${task_i}`).on("mouseleave", (e) => {
      $(`#task-holder${index}${task_i}`)
        .find(".delete-icon")
        .css("display", "none");
    });
  });
});

// filtering the Tag from dulicate
let uniqueTag = filteredTags.filter((filteredTag, filteredTag_i) => {
  return filteredTags.indexOf(filteredTag) === filteredTag_i;
});
uniqueTag.forEach((tag, tag_i) => {
  $("#filter-by-tag").append(`<option value="${tag}">${tag}</option>`);
});

// Search for tasks
$("#search").keyup(function () {
  // Declare variables
  let search, filter, taskContainer, listContainer, label, i, txtValue;
  search = $("#search");
  filter = search.val().toUpperCase();
  listContainer = $("#list-container");
  taskContainer = listContainer.find("div.task");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < taskContainer.length; i++) {
    label = listContainer.find(`div.task:eq(${i})`).find("label");
    txtValue = label.text();
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      listContainer.find(`div.task:eq(${i})`).css("display", "block");
    } else {
      listContainer.find(`div.task:eq(${i})`).css("display", "none");
    }
  }
});

//filter the tasks by the tag name
$("#filter-by-tag").change(function () {
  // Declare variables
  let tag, filter, taskContainer, listContainer, i, txtValue;
  tag = $("#filter-by-tag");
  filter = tag.val().toUpperCase();

  listContainer = $("#list-container");
  taskContainer = listContainer.find("div.task");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < taskContainer.length; i++) {
    span = listContainer.find(`div.task:eq(${i})`).find("span");
    txtValue = span.text();
    if (filter === "ALL") {
      listContainer.find(`div.task`).css("display", "block");
    } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
      listContainer.find(`div.task:eq(${i})`).css("display", "block");
    } else {
      listContainer.find(`div.task:eq(${i})`).css("display", "none");
    }
  }
});

// Handle selected element style in the menu
$("a")
  .find("button")
  .on("click", function () {
    if (!$(this).hasClass("selected")) {
      $(this).addClass("selected");
      $(this).find("img:eq(1)").removeClass("hide");
      $("a").find("button").not($(this)).removeClass("selected");
      $("a").find("button").not($(this)).find("img:eq(1)").addClass("hide");
    } else {
      $(this).removeClass("selected");
      $(this).find("img:eq(1)").addClass("hide");
    }
  });

// Handle closing the side bar
$("#close").on("click", function () {
  $("#side-bar").addClass("hide");
  $("#show-menu-container").removeClass("hide");
  $("#pages").css("width", "100%");
});

// Handle showing the side bar
$("#show-menu-container").on("click", function () {
  if ($("#side-bar").hasClass("hide")) {
    $("#side-bar").removeClass("hide");
    $("#show-menu-container").addClass("hide");
    $("#pages").css("width", "80%");
  }
});
