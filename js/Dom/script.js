// Example one
document.getElementById("changeTextButton").addEventListener("click", () => {
    document.getElementById("myParagraph").textContent = "Paragraph changed";
});

// Example two
document.getElementById("hightlightFirstButton").addEventListener("click", function() {
    let citiesList = document.getElementById("citiesList");
    citiesList.firstElementChild.classList.add("highlight");   
});

// Example three
document.getElementById("changeOrder").addEventListener("click", function() {
    let coffeeType = document.getElementById("coffeeType");
    coffeeType.textContent = "Espresso";
    coffeeType.style.backgroundColor = "brown";
});

// Example four
document.getElementById("addNewItem").addEventListener("click", () => {
    let newItem = document.createElement("li");
    newItem.textContent = "Eggs";

    document.getElementById("shoppingList").appendChild(newItem);
});

// Example fiive
document.getElementById("removeLastTask").addEventListener("click", () => {
    let removeItemList = document.getElementById("taskList");
    removeItemList.lastElementChild.remove();
});

// Example six
document.getElementById("clickMeButton").addEventListener("dblclick", function() {
    alert("You clicked me");
});

// Example seven
document.getElementById("teaList").addEventListener("click", function(event) {
    if(event.target && event.target.matches(".teaItem")) {
        alert("You clicked " + event.target.textContent);
    }
});

// Example eight
document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let feedback = document.getElementById("feedbackInput").value;

    document.getElementById("feedbackDisplay").textContent = `feedback is ${feedback}`;

});

// Example nine
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("domStatus").textContent = "DOM is loaded";
});

// Exple ten
document.getElementById("toggleHighlight").addEventListener("click", function() {
    document.getElementById("descriptionText").classList.toggle("highlight");
})





