var inputs;
var selectPayMethod;
var spans;
var checkLetters = /^\D+$/;
var checkNumbers = /^\d+$/;
var check3Numbers = /^\d{3}$/;
var articlesList;
var articlePriceToAdd;
var articlesTotalPrice;
var payMethodCard;
var payMethodCash;

window.addEventListener("load", init);

function init() {
  initVariables();
  initListeners();
  resetForm();
}

function initVariables() {
  inputs = document.getElementsByTagName("input");
  spans = document.getElementsByTagName("span");
  selectPayMethod = document.getElementById("selectPayMethod");
  articlesList = new Array();
  articlePriceToAdd = 0;
  articlesTotalPrice = 0;
  payMethodCard = document.getElementById("payMethodCard");
  payMethodCash = document.getElementById("payMethodCash");
}

function initListeners() {
  inputs[3].addEventListener("click", checkAddArticle);
  inputs[10].addEventListener("click", checkConditions);
  inputs[11].addEventListener("click", confirm);
  selectPayMethod.addEventListener("mouseout", checkPayMethod);
  inputs[12].addEventListener("click", resetForm);
}

function checkAddArticle() {
  checkInputsNewArticle();
  if (
    spans[0].textContent == "" &&
    spans[1].textContent == "" &&
    spans[2].textContent == ""
  ) {
    addArticle();
  }
}

function checkInputsNewArticle() {
  for (let i = 2; i > -1; i--) {
    if (inputs[i].value != "") {
      if (i == 0) {
        if (checkLetters.test(inputs[i].value)) {
          spans[i].textContent = "";
        } else {
          spans[i].textContent = "Debe contener solo letras.";
          inputs[i].focus();
        }
      }
      if (i > 0) {
        if (checkNumbers.test(inputs[i].value)) {
          spans[i].textContent = "";
        } else {
          spans[i].textContent = "Debe contener solo números.";
          inputs[i].focus();
        }
      }
    } else {
      spans[i].textContent = "No puede estar vacío.";
      inputs[i].focus();
    }
  }
}

function addArticle() {
  articlesList.push(" " + inputs[0].value);
  articlesTotalPrice += calculateArticlePriceToAdd();
  loadArticlesListAndTotalPrice();
  resetNewArticle();
}

function calculateArticlePriceToAdd() {
  articlePriceToAdd = parseFloat(inputs[1].value) * parseInt(inputs[2].value);
  return articlePriceToAdd;
}

function loadArticlesListAndTotalPrice() {
  inputs[4].value = articlesList;
  inputs[5].value = articlesTotalPrice + " €";
}

function resetNewArticle() {
  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = 1;
  inputs[0].focus();
}

function loadForm() {
  resetVars();
  resetNewArticle();
  resetSpans();
  resetCart();
  resetCard();
  resetCash();
  uncheckConditions();
  disableConfirmButton();
}

function resetSpans() {
  for (let i = 0; i < spans.length; i++) {
    spans[i].textContent = "";
  }
}

function checkConditions() {
  if (inputs[10].checked) {
    enableConfirmButton();
  } else {
    disableConfirmButton();
  }
}

function enableConfirmButton() {
  inputs[11].disabled = false;
}

function disableConfirmButton() {
  inputs[11].disabled = true;
}

function confirm() {
  if (articlesList.length != 0) {
    switch (selectPayMethod.value) {
      case "null":
        alert("Seleccione una forma de pago.");
        break;
      case "card":
        checkCardMethod();
        break;
      case "cash":
        checkCashMethod();
        break;
      default:
        alert("-1");
        break;
    }
  } else {
    alert("No ha comprado nada.");
  }
}

function resetForm() {
  loadForm();
  checkPayMethod();
}

function checkPayMethod() {
  switch (selectPayMethod.value) {
    case "card":
      hidePayMethods();
      payMethodCard.style.display = "block";
      break;
    case "cash":
      hidePayMethods();
      payMethodCash.style.display = "block";
      break;
    default:
      break;
  }
}

function hidePayMethods() {
  payMethodCard.style.display = "none";
  payMethodCash.style.display = "none";
}

function checkCardMethod() {
  checkInputsCard();
  if (
    spans[3].textContent == "" &&
    spans[4].textContent == "" &&
    spans[5].textContent == ""
  ) {
    alert(
      "A cargo de: " +
        inputs[6].value +
        "\nLos artículos de mi carrito son: " +
        articlesList +
        "\nY el precio total es: " +
        articlesTotalPrice +
        " € \nForma de pago: Tarjeta"
    );
  }
}

function checkCashMethod() {
  checkInputsCash();
  if (spans[6].textContent == "") {
    alert(
      "\nLos artículos de mi carrito son: " +
        articlesList +
        "\nY el precio total es: " +
        articlesTotalPrice +
        " €\nCambio: " +
        (inputs[9].value - articlesTotalPrice) +
        " € \nForma de pago: Efectivo"
    );
  }
}

function checkInputsCard() {
  for (let i = 8; i > 5; i--) {
    if (inputs[i].value != "") {
      if (i == 6) {
        if (checkLetters.test(inputs[i].value)) {
          spans[i - 3].textContent = "";
        } else {
          spans[i - 3].textContent = "Debe contener solo letras.";
          inputs[i].focus();
        }
      } else if (i == 7) {
        if (checkNumbers.test(inputs[i].value)) {
          spans[i - 3].textContent = "";
        } else {
          spans[i - 3].textContent = "Debe contener solo números.";
          inputs[i].focus();
        }
      } else {
        if (check3Numbers.test(inputs[i].value)) {
          spans[i - 3].textContent = "";
        } else {
          spans[i - 3].textContent = "Debe contener exactamente 3 números.";
          inputs[i].focus;
        }
      }
    } else {
      spans[i - 3].textContent = "No puede estar vacío.";
      inputs[i].focus();
    }
  }
}

function checkInputsCash() {
  if (inputs[9].value != "") {
    if (checkNumbers.test(inputs[9].value)) {
      if (inputs[9].value >= articlesTotalPrice) {
        spans[6].textContent = "";
      } else {
        spans[6].textContent = "Saldo insuficiente para comprar.";
      }
    } else {
      spans[6].textContent = "Debe contener solo números.";
    }
  } else {
    spans[6].textContent = "No puede estar vacío.";
  }
}

function resetForm(){
  loadForm();
}

function resetVars(){
  articlesList = new Array();
  articlePriceToAdd=0;
  articlesTotalPrice=0;
}

function resetCart() {
  inputs[4].value = "";
  inputs[5].value = 0;
  selectPayMethod.options[0].selected="selected";
  hidePayMethods();
}

function resetCard() {
  inputs[6].value="";
  inputs[7].value="";
  inputs[8].value="";
}

function resetCash(){
  inputs[9].value="";
}

function uncheckConditions(){
  inputs[10].checked=false;
}