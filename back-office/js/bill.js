jQuery(function () {
  getBills();
});
const getDateTime = (dateString) => {
  const formattedDate = dateString.slice(0, 10);
  const formattedTime = dateString.slice(11, 16);
  return `${formattedDate} ${formattedTime}`;
};

const getBills = async (query) => {
  const response = await fetch("http://localhost:8000/api/v1/bill?" + new URLSearchParams(query));
  if (!response.ok) {
    const error = await response.json();
    const errorTemplate = Handlebars.compile($("#errorTemplate").html());
    const filled = errorTemplate({ error: error.msg });
    $("#error").html(filled);
  }
  const bills = await response.json();
  if (bills.length > 0) {
    const billsTemplate = Handlebars.compile($("#billsTemplate").html());
    for (const bill of bills) {
      bill.paidAt = getDateTime(bill.paidAt);
      bill.total = bill.total.toFixed(2);
    }
    const filled = billsTemplate({ bills: bills });
    $("#tableRows").html(filled);
  } else {
    $("#tableRows").html("");
  }
};

const getBill = async (id) => {
  if (id) {
    const response = await fetch(`http://localhost:8000/api/v1/bill/${id}`);
    if (!response.ok) {
      const error = await response.json();
      const errorTemplate = Handlebars.compile($("#errorTemplate").html());
      const filled = errorTemplate({ error: error.msg });
      $("#error").html(filled);
      return;
    }
    const bill = await response.json();
    return bill;
  }
};

const populateViewBill = async (id) => {
  const bill = await getBill(id);
  console.log(bill);
  document.getElementById("viewBillUser").textContent = bill.user.email;
  const container = document.getElementById("content");
  container.innerHTML = "";
  if (bill.type == "service") {
    const content = document.createElement("span");
    content.classList.add("p-2", "w-full");
    content.textContent = `${bill.service.serviceName} ${bill.service.price.toFixed(2)}€`;
    container.appendChild(content);
  } else {
    for (let i = 0; i < bill.products.length; i += 1) {
      const content = document.createElement("p");
      content.classList.add("p-2", "w-full");
      content.textContent = `${bill.products[i].product.name} x${bill.products[i].quantity} ${bill.products[i].product.price.toFixed(2)}€`;
      container.appendChild(content);
    }
  }
  const iva = Number(bill.total) * 0.22;
  document.getElementById("viewBillTotal").textContent = `${bill.total.toFixed(2)}€ (di cui IVA ${iva.toFixed(2)}€)`;
  document.getElementById("viewBillPaymantMethod").textContent = bill.paymentMethod;
  document.getElementById("viewBillPaidAt").textContent = getDateTime(bill.paidAt);
};
