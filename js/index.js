var todo_list = [];
var myNodelist = document.getElementsByTagName("LI");
var inputValue = "";
var close = document.getElementsByClassName("close");
var edi = document.getElementsByClassName("edi");
var dat = document.getElementsByClassName("dat");
var chk = document.getElementsByClassName("chk");
var g_count = 0;
var flag = 0;
var edit_id = "";

function add_items(v) {
  inputValue = document.getElementById("myInput").value;
  var res = document.getElementById("result");
  res.innerHTML = `Your Up comming TASK`;
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  if (flag == 1) {
    todo_list[edit_id].data.content = inputValue;
    todo_list[edit_id].data.updated_date = datetime;
    set_items();
    console.log(todo_list[v]);
    flag = 0;
    document.getElementById("myInput").value = "";
    clear();
  } else {
    if (inputValue === "") {
      alert("You must write something!");
    } else {
      document.getElementById("myInput").value = "";

      var val = inputValue;
      const item_object = {
        id: Date.now(),
        data: {
          content: val,
          created_date: datetime,
          updated_date: datetime,
        },
      };
      todo_list.push(item_object);
      set_items();
      console.log(todo_list);
      clear();
    }
  }
}

function init() {
  console.log("hello");
  var res = document.getElementById("result");
  res.innerHTML = `Your Up comming TASK`;
  var items = JSON.parse(localStorage.getItem("task"));
  if (items != null) {
    todo_list = items;
    console.log(todo_list);
  }
  display();
}

function display() {
  count = 0;

  for (i = 0; i < todo_list.length; i++) {
    var li = document.createElement("li");
    var val = todo_list[i].data.content;
    var date = todo_list[i].data.created_date;
    var u_date = todo_list[i].data.updated_date;
    var di = document.createElement("div");
    li.append(val, `\n`);
    var ul = document.getElementById("myUL").appendChild(li);
    var span = document.createElement("SPAN");
    var span2 = document.createElement("SPAN");
    var span3 = document.createElement("SPAN");
    var ico = document.createElement("div");
    var ico2 = document.createElement("div");
    var ico3 = document.createElement("div");
    var ico4 = document.createElement("div");
    var chk1 = document.createElement("INPUT");
    chk1.setAttribute("type", "checkbox");
    var span4 = document.createElement("Span");

    ico.innerHTML = `<i class="fa fa-trash"></i>`;
    ico2.innerHTML = `<j class="fas fa-edit"></j> `;
    ico4.innerHTML = `updated date : ${u_date}`;
    ico3.innerHTML = `created date: ${date}`;

    span4.className = "chk";
    span3.className = "dat";
    span.className = "close";
    span2.className = "edi";
    span.appendChild(ico);
    span2.appendChild(ico2);
    span3.appendChild(ico4);
    span3.appendChild(ico3);
    span4.appendChild(chk1);

    li.appendChild(span);
    li.appendChild(span2);
    li.append(span3);
    li.appendChild(span4);
    li.setAttribute("id", count);
    count += 1;
    var ul = document.getElementById("myUL");

    for (const child of ul.children) {
      ico.onclick = function () {
        delete_items(child.id);
      };
    }

    for (const val of ul.children) {
      ico2.onclick = function () {
        edit_items(val.id);
      };
    }

    for (const v of ul.children) {
      span4.onclick = function() {
        var complete=todo_list[v.id].data.content;
        console.log(i);
        v.style.backgroundColor="lightgreen";
      };
    }
  }
}

function clear() {
  var cl = document.getElementById("myUL");
  while (cl.firstChild) {
    cl.removeChild(cl.firstChild);
  }
  display();
}

function get_items() {
  JSON.parse(localStorage.getItem("task"));
}

function set_items() {
  localStorage.setItem("task", JSON.stringify(todo_list));
}

function delete_items(id) {
  todo_list.splice(id, 1);
  set_items();
  console.log(todo_list);
  clear();
}

function edit_items(v) {
  document.getElementById("myInput").value = todo_list[v].data.content;
  flag = 1;
  edit_id = v;
  console.log(v);
}
