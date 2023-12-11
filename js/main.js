(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
    });
    
})(jQuery);




function sendMail() {
    // Retrieve form field values
    var nameValue = document.getElementById("name").value;
    var emailValue = document.getElementById("email").value;
    var sendingDateValue = document.getElementById("sendingDate").value;
    var sendingTimeValue = document.getElementById("sendingTime").value;
    var messageValue = document.getElementById("Message").value;

    if (!nameValue || !emailValue || !sendingDateValue || !sendingTimeValue || !messageValue) {
        alert("Please fill in all fields before submitting.");
        return false; // Prevent form submission
    }

    var Params = {
        from_name: nameValue,
        email_id: emailValue,
        sending_date: sendingDateValue,
        sending_time: sendingTimeValue,
        message: messageValue,
    };

    emailjs.send("service_76ws5tl", "template_9udtz05", Params).then(function(res) {
        alert("Successful! " + res.status);

        // Reset form fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("sendingDate").value = "";
        document.getElementById("sendingTime").value = "";
        document.getElementById("Message").value = "";
    });

    // Prevent form submission
    return false;
}

let isButtonDisabled = false; // Flag to track button disable status

// Add an oninput event to each input field to check whether to enable the submit button
document.getElementById("name").oninput = checkFormFields;
document.getElementById("email").oninput = checkFormFields;
document.getElementById("sendingDate").oninput = checkFormFields;
document.getElementById("sendingTime").oninput = checkFormFields;
document.getElementById("Message").oninput = checkFormFields;

// Function to check if all fields are filled and enable/disable the submit button accordingly
function checkFormFields() {
    var nameValue = document.getElementById("name").value;
    var emailValue = document.getElementById("email").value;
    var sendingDateValue = document.getElementById("sendingDate").value;
    var sendingTimeValue = document.getElementById("sendingTime").value;
    var messageValue = document.getElementById("Message").value;

    // Enable the submit button only if all fields are filled
    var submitButton = document.querySelector('#submitButton');
    submitButton.disabled = !(nameValue && emailValue && sendingDateValue && sendingTimeValue && messageValue && isValidEmail(emailValue));
}

// Function to validate email format
function isValidEmail(email) {
    // Use a regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendMail() {
    // Check if the button is already disabled
    if (isButtonDisabled) {
        alert("You have already submitted a request. Please wait for a response.");
        return false; // Prevent form submission
    }

    // Retrieve form field values
    var nameValue = document.getElementById("name").value;
    var emailValue = document.getElementById("email").value;
    var sendingDateValue = document.getElementById("sendingDate").value;
    var sendingTimeValue = document.getElementById("sendingTime").value;
    var messageValue = document.getElementById("Message").value;

    // Validate email format
    if (!isValidEmail(emailValue)) {
        alert("Please enter a valid Gmail address.");
        return false; // Prevent form submission
    }

    // Disable the button to prevent multiple submissions
    document.getElementById("submitButton").disabled = true;
    isButtonDisabled = true;

    // Prepare parameters for emailjs.send
    var Params = {
        from_name: nameValue,
        email_id: emailValue,
        sending_date: sendingDateValue,
        sending_time: sendingTimeValue,
        message: messageValue,
    };

    // Send email using emailjs
    emailjs.send("service_qplb1pm", "template_60ymout", Params).then(function(res) {
        alert("Successful! " + res.status);

        // Reset form fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("sendingDate").value = "";
        document.getElementById("sendingTime").value = "";
        document.getElementById("Message").value = "";
    });

    // Prevent form submission
    return false;
}





// function sendMail() {
//     var Params = {
//         from_name: document.getElementById("name").value,
//         email_id: document.getElementById("email").value,
//         sending_date: document.getElementById("sendingDate").value,
//         sending_time: document.getElementById("sendingTime").value,
//         message: document.getElementById("Message").value,
//     };

//     emailjs.send("service_76ws5tl", "template_9udtz05", Params).then(function(res){
//         alert("Successful! " + res.status);
//     })

//     return false;
// }

// .then(function(res) {
//     alert("Message sent successfully " + res.status);
// }, function(error) {
//     alert("Couldn't send your message at this hour. Try again later. " + error.status);
// }
// );
