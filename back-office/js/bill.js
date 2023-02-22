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
