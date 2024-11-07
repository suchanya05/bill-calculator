var person = []

var orderList = []

var personListInOrder = [];

const colors = [
    "#D32F2F", "#C2185B", "#7B1FA2", "#512DA8", "#303F9F",
    "#1976D2", "#0288D1", "#0097A7", "#00796B", "#388E3C",
    "#689F38", "#AFB42B", "#F57C00", "#E64A19", "#5D4037",
    "#455A64", "#8E24AA", "#6A1B9A", "#283593", "#1E88E5"
];

let availableColors = [...colors];

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
        if (personInOrder.length > 0) {
            button.className = 'btn btn-sm text-light row';
            button.style.backgroundColor = item.color

        } else {
            button.className = 'btn btn-sm row';
            button.style.borderWidth = '1px';
            button.style.borderStyle = 'solid';
            button.style.color = item.color;
            button.style.borderColor = item.color;
        }



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
    // constisVat = document.getElementById('vatCheckbox').checked
    if (person.length > 0) {
        const header = document.createElement('span');
        header.className = 'mb-2 fs-3 fw-bold text-left text-rgb';
        header.textContent = `รายชื่อ`;
        personContainer.appendChild(header);
    }

    // วน loop เพื่อสร้างปุ่มสำหรับแต่ละ person
    person.forEach((item, index) => {
        // สร้าง div เพื่อเก็บปุ่มและข้อความ
        const textDiv = document.createElement('div');
        textDiv.className = 'col-6  mb-1';

        const payDiv = document.createElement('div');
        payDiv.className = 'col-6  mb-1 text-right';

        const btnDiv = document.createElement('div');
        btnDiv.className = 'col-12 mb-2 text-center';



        // สร้างปุ่ม
        const text = document.createElement('span');
        // text.type = 'button';
        text.className = 'text-right fs-5';
        text.textContent = `${item.name}`;
        text.style.color = item.color;


        const textPay = document.createElement('span');
        // text.type = 'button';
        textPay.className = 'text-right fs-5';
        textPay.style.color = "#7131b9"
        textPay.textContent = `จ่าย ${Math.round(item.pay)} บาท`;




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
        header.className = 'mb-2 fs-3 fw-bold text-left text-rgb';
        header.textContent = `รายการสินค้า`;
        orderContainer.appendChild(header);
    }
    // วน loop เพื่อสร้างปุ่มสำหรับแต่ละ person
    orderList.forEach((item, index) => {

        const textDiv = document.createElement('div');
        textDiv.className = 'col-6 mb-2';

        const payDiv = document.createElement('div');
        payDiv.className = 'col-6 mb-2 text-start ';

        const listDiv = document.createElement('div');
        listDiv.className = 'col-md-10 mb-2 text-end';

        const btnDiv = document.createElement('div');
        btnDiv.className = 'col-md-2 mb-2 text-center';

        if (item.persons.length > 0) {
            const persons = item.persons;
            const startBracket = document.createElement('span');
            startBracket.textContent = "(";
            listDiv.appendChild(startBracket);
            persons.forEach((personItem, index) => {
                const personText = document.createElement('span');
                personText.style.color = getPersonColor(personItem.name);
                personText.textContent = personItem.name;
                listDiv.appendChild(personText);
                if (index < persons.length - 1) {
                    const comma = document.createElement('span');
                    comma.textContent = ", ";
                    listDiv.appendChild(comma);
                }
            });
            const endBracket = document.createElement('span');
            endBracket.textContent = ")";
            listDiv.appendChild(endBracket);
        }
        const text = document.createElement('span');
        text.className = 'text-start random-color';
        text.textContent = `${index + 1}. ${item.orderName}`;



        const textPay = document.createElement('span');
        // text.type = 'button';
        textPay.className = 'text-start random-color';
        textPay.textContent = `${item.pay} บาท`;




        const icon = document.createElement('i');
        icon.className = "bi bi-trash3";
        icon.id = `icon${index + 1}`
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-danger btn-sm row ';
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
        orderContainer.appendChild(listDiv)
        orderContainer.appendChild(btnDiv);
    });
}

function updatePerson(input) {
    if (!input) {
        alert("กรุณากรอกชื่อ")
    } else if (checkPerson(input)) {
        alert("ชื่อนี้มีในรายการแล้ว")
    } else {
        person.push({ name: input, pay: 0, color: getRandomColor() });
        document.getElementById('personName').value = "";
        fetchDataHTML()
    }
}

function updateOrder(orderName, pay) {
    if (checkOrder(orderName)) {
        alert("ชื่อรายการซ้ำ")
    } else if (!orderName) {
        alert("กรุณากรอกชื่อรายการอาหาร")
    } else if (!pay) {
        alert("กรุณากรอกราคาอาหาร")
    } else if (personListInOrder.length == 0) {
        alert("กรุณาเลือกคนที่ต้องการหารในรายการ")
    } else {
        let persons = personListInOrder
        orderList.push({
            orderName: orderName,
            pay: 0,
            payWithVat: pay * 1.07,
            payNoVat: pay,
            persons: persons,
        });
        console.log(orderList);


        personListInOrder = []
        document.getElementById('orderPay').value = "";
        document.getElementById('orderName').value = "";
        fetchDataHTML()
    }

}

function deletePerson(item) {
    person = person.filter(p => p.name !== item.name);
    removePersonFromOrders(item.name)
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
    applyRandomColor();
}



function addPersonToOrder(personName) {
    personListInOrder.push({ name: personName })
    fetchDataHTML()
}

function addAllPersonToOrder() {
    personListInOrder = []
    person.forEach((item) => {
        personListInOrder.push({ name: item.name })
    })

    fetchDataHTML()
}

function deletePersonToOrder(personName) {
    personListInOrder = personListInOrder.filter(p => p.name !== personName);
    fetchDataHTML()
}

function calculatePayment() {

    orderList = orderList.filter((item) => item.persons.length >= 1);

    for (let index = 0; index < person.length; index++) {
        person[index].pay = 0;
    }

    // ตรวจสอบการคำนวณ VAT
    const vatChecked = document.getElementById('vatCheckbox').checked;
    let totalAmountWithoutVAT = 0;

    orderList.forEach((order) => {
        if (vatChecked) {
            order.pay = order.payWithVat
        } else {
            order.pay = order.payNoVat
        }
        order.pay = Math.round(order.pay)
        const payment = order.pay / order.persons.length;

        order.persons.forEach((personInOrder) => {

            for (let index = 0; index < person.length; index++) {
                if (person[index].name == personInOrder.name) {
                    person[index].pay += payment;
                    break;
                }
            }
        })
        totalAmountWithoutVAT += order.pay;
    })

    let totalAmount = person.reduce((sum, p) => sum + p.pay, 0);
    if (vatChecked) {
        const vatAmount = totalAmountWithoutVAT * 0.07;
        totalAmount += vatAmount;
        // แสดง VAT
        document.getElementById('vatAmount').textContent = `VAT 7%: ${Math.round(vatAmount)} บาท`;
    } else {
        document.getElementById('vatAmount').textContent = '';
    }

    // แสดงยอดรวม
    document.getElementById('headerList').textContent = `ทั้งหมด ${person.length} คน / รวม ${Math.round(totalAmount)} บาท`;
}

// ฟังก์ชันคำนวณเมื่อมีการเปลี่ยนแปลงสถานะของเช็คบ็อกซ์



function exportImg() {
    const orderChecked = document.getElementById('orderCheckbox').checked;

    // ซ่อนทุกปุ่มในหน้า
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.display = 'none';
    });

    const credit = document.getElementById('credit');
    credit.style.display = 'inline-block';

    const orderOnBill = document.getElementById("orderOnBill");
    const orderContainer = document.getElementById("orderContainer");

    // แปลง div ที่ต้องการเป็นรูป
    const target = document.getElementById('personContent');

    // เก็บตำแหน่งเดิมของ orderContainer
    const originalParent = orderContainer.parentElement;

    if (orderChecked && orderContainer) {
        // ย้าย orderContainer ไปยัง orderOnBill ชั่วคราว
        orderOnBill.appendChild(orderContainer);
    }

    html2canvas(target, { useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'Bill_Shared.png';
        link.click();

        // แสดงปุ่มกลับหลังจากแปลงเสร็จ
        buttons.forEach(button => {
            button.style.display = 'inline-block';
        });

        // ซ่อน credit
        credit.style.display = 'none';

        if (orderChecked && orderContainer) {
            // นำ orderContainer กลับไปที่ตำแหน่งเดิม
            originalParent.appendChild(orderContainer);
        }

        // เรียกใช้ fetchDataHTML
        fetchDataHTML();
    });
}



function addPP() {
    // สร้างช่องสำหรับอัปโหลดไฟล์
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';  // รับเฉพาะไฟล์รูปภาพ

    // เมื่อเลือกไฟล์แล้ว
    inputFile.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // สร้างแสดงผลรูปภาพใน <div id="qrPromptpay">
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;  // กำหนด source ของรูป
                imgElement.style.maxWidth = '100%';  // ปรับขนาดรูปภาพให้พอดีกับ div
                imgElement.style.height = 'auto';
                imgElement.alt = 'PromptPay QR';  // ข้อความแทนหากรูปไม่สามารถแสดงได้

                // เพิ่มรูปภาพที่อัปโหลดเข้าไปใน div
                const qrDiv = document.getElementById('qrPromptpay');
                qrDiv.innerHTML = '';  // ลบข้อมูลเก่าออกก่อนแสดงข้อมูลใหม่
                qrDiv.appendChild(imgElement);  // เพิ่มรูปภาพเข้าไป
            };

            reader.readAsDataURL(file);  // อ่านไฟล์เป็น base64
        }
    });

    // คลิกเพื่อเลือกไฟล์
    inputFile.click();
}

// fetchDataHTML()




function getRandomColor() {
    // ถ้าใช้ครบทุกสีแล้วให้รีเซ็ต
    if (availableColors.length === 0) {
        availableColors = [...colors];
    }

    // สุ่มดัชนีในลิสต์สีที่เหลืออยู่
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const selectedColor = availableColors[randomIndex];

    // นำสีที่เลือกออกจากลิสต์
    availableColors.splice(randomIndex, 1);

    return selectedColor;
}

function getPersonColor(name) {
    const personFound = person.find((item) => item.name === name);
    console.log(personFound ? personFound.color : "#000");

    return personFound ? personFound.color : "#000"; // ถ้าไม่พบให้คืนสีดำเป็นค่าเริ่มต้น
}

function checkPerson(name) {
    const personFound = person.find((item) => item.name === name);
    return personFound ? true : false;
}

function checkOrder(orderName) {
    const orderFound = orderList.find((item) => item.orderName === orderName);
    return orderFound ? true : false;
}

function applyRandomColor() {
    const elements = document.querySelectorAll('.random-color');
    elements.forEach(element => {
        element.style.color = getRandomColor();
    });
}

function removePersonFromOrders(personName) {
    for (let index = 0; index < orderList.length; index++) {
        orderList[index].persons = orderList[index].persons.filter(person => person.name !== personName);
    }
}

// เรียกใช้ฟังก์ชันทุกครั้งที่ต้องการเปลี่ยนสี
applyRandomColor();