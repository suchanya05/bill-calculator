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
        textDiv.className = 'col-6 col-md-5 mb-1';

        const payDiv = document.createElement('div');
        payDiv.className = 'col-6 col-md-4 mb-1 text-right';

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
        text.textContent = `${index + 1}. ${item.orderName}`;



        const textPay = document.createElement('span');
        // text.type = 'button';
        textPay.className = 'text-start';
        textPay.textContent = `${item.pay} บาท`;




        const icon = document.createElement('i');
        icon.className = "bi bi-trash3";
        icon.id = `icon${index + 1}`
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
        alert("กรุณากรอกชื่อ")
    } else {
        person.push({ name: input, pay: 0 });
        document.getElementById('personName').value = "";
        fetchDataHTML()
    }
}

function updateOrder(orderName, pay) {
    if (!orderName) {
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
    const target = document.getElementById('personContent');
    const images = target.getElementsByTagName('img');
    let loaded = 0;

    // โหลดภาพให้เสร็จ
    Array.from(images).forEach(image => {
        if (image.complete) {
            loaded++;
        } else {
            image.onload = () => {
                loaded++;
                if (loaded === images.length) {
                    generateCanvas();
                }
            };
        }
    });

    // ถ้าทุกภาพโหลดเสร็จแล้ว
    if (loaded === images.length) {
        generateCanvas();
    }

    function generateCanvas() {
        html2canvas(target, { useCORS: true }).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'screenshot.png';
            link.click();
        });
    }
}

function addPP() {
    // สร้างช่องสำหรับอัปโหลดไฟล์
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';  // รับเฉพาะไฟล์รูปภาพ

    // เมื่อเลือกไฟล์แล้ว
    inputFile.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
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
