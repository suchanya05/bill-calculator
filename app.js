var person = []

var orderList = []

var personListInOrder = [];

function createButtons() {
    const buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.innerHTML = ''; // ล้างเนื้อหาก่อนเริ่มสร้างใหม่

    // วน loop เพื่อสร้างปุ่มสำหรับแต่ละ person
    person.forEach((item, index) => {
        // สร้าง div เพื่อเก็บปุ่มและข้อความ
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-2 mb-1 text-center';


        const personInOrder = personListInOrder.filter(p => p.name == item.name);

        // สร้างปุ่ม
        const button = document.createElement('button');
        button.type = 'button';
        button.className = personInOrder.length > 0 ? 'btn btn-info btn-sm text-light row' : 'btn btn-outline-success btn-sm row';
        button.textContent = `${item.name}`;
        button.id = `btn${item.name}`

        // จัดการเมื่อคลิกปุ่ม
        button.onclick = function () {
            const personInOrder = personListInOrder.filter(p => p.name == item.name);
            if (personInOrder.length > 0) {
                deletePersonToOrder(item.name);
            } else {
                addPersonToOrder(item.name);
            }


        };

        colDiv.appendChild(button);
        buttonContainer.appendChild(colDiv);
    });
}

function createPersonList() {
    const personContainer = document.getElementById('personContainer');
    personContainer.innerHTML = ''; // ล้างเนื้อหาก่อนเริ่มสร้างใหม่


    // วน loop เพื่อสร้างปุ่มสำหรับแต่ละ person
    person.forEach((item, index) => {
        // สร้าง div เพื่อเก็บปุ่มและข้อความ
        const textDiv = document.createElement('div');
        textDiv.className = 'col-6 col-md-6 mb-1';

        const payDiv = document.createElement('div');
        payDiv.className = 'col-6 col-md-3 mb-1 text-right';

        const btnDiv = document.createElement('div');
        btnDiv.className = 'col-md-3 mb-2 text-center';



        // สร้างปุ่ม
        const text = document.createElement('span');
        // text.type = 'button';
        text.className = 'text-right';
        text.textContent = `${item.name}`;



        const textPay = document.createElement('span');
        // text.type = 'button';
        textPay.className = 'text-right';
        textPay.textContent = `${Math.round(item.pay)} บาท`;




        const icon = document.createElement('i');
        icon.className = "bi bi-trash3";

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-danger btn-sm w-full';
        button.appendChild(icon);

        // จัดการเมื่อคลิกปุ่ม
        button.onclick = function () {
            deletePerson(item);
        };
        payDiv.appendChild(textPay);
        textDiv.appendChild(text);
        btnDiv.appendChild(button);

        personContainer.appendChild(textDiv);
        personContainer.appendChild(payDiv);
        personContainer.appendChild(btnDiv);
    });
}

function createOrderList() {
    const orderContainer = document.getElementById('orderContainer');
    orderContainer.innerHTML = ''; // ล้างเนื้อหาก่อนเริ่มสร้างใหม่
    if (orderList.length > 0) {
        const header = document.createElement('span');
        header.className = 'mb-2 fs-3 fw-bold text-left';
        header.textContent = `รายการสินค้า`;
        orderContainer.appendChild(header);
    }
    // วน loop เพื่อสร้างปุ่มสำหรับแต่ละ person
    orderList.forEach((item, index) => {
        // สร้าง div เพื่อเก็บปุ่มและข้อความ
        const textDiv = document.createElement('div');
        textDiv.className = 'col-6 col-md-6 mb-3';

        const payDiv = document.createElement('div');
        payDiv.className = 'col-6 col-md-4 mb-3 text-start';

        const btnDiv = document.createElement('div');
        btnDiv.className = 'col-md-2 mb-3 text-center';



        // สร้างปุ่ม
        const text = document.createElement('span');
        // text.type = 'button';
        text.className = 'text-start';
        text.textContent = `${item.orderName}`;



        const textPay = document.createElement('span');
        // text.type = 'button';
        textPay.className = 'text-start';
        textPay.textContent = `${item.pay} บาท`;




        const icon = document.createElement('i');
        icon.className = "bi bi-trash3";

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-danger btn-sm row';
        button.appendChild(icon);

        // จัดการเมื่อคลิกปุ่ม
        button.onclick = function () {
            deleteOrder(item);
        };
        payDiv.appendChild(textPay);
        textDiv.appendChild(text);
        btnDiv.appendChild(button);

        orderContainer.appendChild(textDiv);
        orderContainer.appendChild(payDiv);
        orderContainer.appendChild(btnDiv);
    });
}

function updatePerson(input) {
    if (!input) {
        console.log("ใส่ชื่อด้วยจั๊บ");

    } else {
        person.push({ name: input, pay: 0 });
        document.getElementById('personName').value = "";
        fetchDataHTML()
    }
}

function updateOrder(orderName, pay) {

    orderList.push({
        orderName: orderName,
        pay: pay,
        persons: personListInOrder
    });
    console.log(orderList);


    // personListInOrder = []

    document.getElementById('orderPay').value = "";
    document.getElementById('orderName').value = "";
    fetchDataHTML()
}

// ฟังก์ชันอัปเดตการแสดงค่า pay ของแต่ละคน
function updateDisplay() {
    console.clear(); // แสดงข้อมูลที่อัปเดตใน console
    console.table(person);
    fetchDataHTML()
}

function deletePerson(item) {
    person = person.filter(p => p.name !== item.name);
    fetchDataHTML()
}

function deleteOrder(item) {
    orderList = orderList.filter(p => p.orderName !== item.orderName);
    fetchDataHTML()
}

function fetchDataHTML() {
    calculatePayment()


    createButtons()
    createPersonList()
    createOrderList()
}



function addPersonToOrder(personName) {
    personListInOrder.push({ name: personName })
    fetchDataHTML()
}

function addAllPersonToOrder() {
    person.forEach((item) => {
        personListInOrder.push({ name: item.name })
    })

    fetchDataHTML()
}

function deletePersonToOrder(personName) {
    personListInOrder = personListInOrder.filter(p => p.name !== personName);
    fetchDataHTML()
    // personListInOrder.push({name:personName})
}

function calculatePayment() {
    for (let index = 0; index < person.length; index++) {
        person[index].pay = 0;
    }



    orderList.forEach((order) => {
        const payment = order.pay / order.persons.length;

        order.persons.forEach((personInOrder) => {

            for (let index = 0; index < person.length; index++) {
                if (person[index].name == personInOrder.name) {
                    person[index].pay += payment;
                    break;
                }
            }
        })
    })

    const totalAmount = person.reduce((sum, p) => sum + p.pay, 0);
    document.getElementById('headerList').textContent = `ทั้งหมด ${person.length} คน / รวม ${totalAmount} บาท`;
}

function exportImg() {
    const target = document.getElementById('personContent');
    html2canvas(target).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'screenshot.png';
        link.click();
    });
}

function genPP(){
    var mobile = '0861013817'
    const orderContainer = document.getElementById('qrPromptpay');
    orderContainer.innerHTML = ''; // ล้างเนื้อหาก่อนเริ่มสร้างใหม่
    if (mobile) {
        const img = document.createElement('img');
        img.className = 'col-12 my-2';
        img.src = `https://promptpay.io/${mobile}.png`;
        orderContainer.appendChild(img);
    }
}

// fetchDataHTML()
