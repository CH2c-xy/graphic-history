//main navigation menu

//select data and id in html
var openPopups = document.querySelectorAll('[data-modal-target]');
var overlay = document.querySelector('#overlay');

//forEach to add an event listener to each button. on click it will call a function and pass the argument with the target
openPopups.forEach(span => {
    span.addEventListener('click', () => {
        var popup = document.querySelector(span.dataset.modalTarget);
        openPopup(popup);
    });
});

//function that opens the popup. if the argument is null, nothing will happen. otherwise a class of active is added to the buttons and overlay
function openPopup(popup) {
    if (popup == null) return
    popup.classList.add('active');
    overlay.classList.add('active');
}

//event listener for on click is added to the overlay. if clicked, active popups will close
overlay.addEventListener('click', () => {
    var popups = document.querySelectorAll('.popuptext.active');
    popups.forEach(popup => {
        closePopup(popup);
    });
});

//closes popups using same method as before, now the active class is removed
function closePopup(popup) {
    if (popup == null) return
    popup.classList.remove('active');
    overlay.classList.remove('active');
}
