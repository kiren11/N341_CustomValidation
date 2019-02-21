// Filename: customvalidation.html
//  Written by: Kiren Kaur
//  Purpose: To create a working form with custom validation
//  Date: 4/24/18
//  Modification History:
// 04/13/18 - Original build, form Prototype
// 04/16/18	- Pulling through, added data scraping
// 04/20/18	- Simple form validation Added
// 04/23/18	- Custom validation added


	$(document).ready(function() {

		//submit and reset buttons
		$( "input[type='submit']" ).button();
		$( "input[type='reset']" ).button();

    //tabs - explanation of coffee types
		$( "#tabs" ).tabs();

    //slider - amount of espressoShots to add
		$( "#espressoShots" ).spinner({min: 0, max: 20});

		/********************
		NAME: datepicker function
		PURPOSE: allow user to choose delivery date
		PARAMETERS: none
		RETURN VALUE: none
		**********/
		$( function() {
    $( "#datepicker" ).datepicker();
  } );

    /********************
    NAME: slider function
    PURPOSE: allow user to choose store based on mileage
    PARAMETERS: none
    RETURN VALUE: none
    **********/
		$(function() {
			$( "#slider-range" ).slider({
				range: true,
				min: 0,
				max: 168,
				values: [ 5, 20 ],
				slide: function( event, ui ) {
					$( "#range" ).val( ui.values[ 0 ] + " - "+ ui.values[ 1 ] );
				}
			});
			$( "#range" ).val( $( "#slider-range" ).slider( "values", 0 ) +
				" - " + $( "#slider-range" ).slider( "values", 1 ) );
		});

    //autocomplete
		var availableTags = [
			"Espresso",
			"Americano",
			"Macchiato",
			"Cappuccino",
			"Frappaccino",
			"Latte",
			"Mocha",
		];
		$( "#coffeeOrder" ).autocomplete({
			source: availableTags
		});

    /********************
    NAME: validator function
    PURPOSE: to convert values to strings, to concatenate Strings,
            to tell user that validation was successful
    PARAMETERS: none
    RETURN VALUE: none
    **********/
		$.validator.setDefaults({
			submitHandler: function() {
				// Scrape Data
				var strusername = $('#username').val();					// Username
				var strpassword = $('#password').val();			// Password
				var strconfPassword = $('#confPassword').val();			// Confirm Password
				var strdeliveryDate = $('#deliveryDate').val();						// Delivery Day
				var strtelephone = $('#telephone').val();					// Phone
				var stremail = $('#email').val();			// Email
				var strsize = $('input[name="size"]:checked').val();  // coffee size
				var strToppings = "";											// Favorite Rocks
				var strespressoShots = $('#espressoShots').val();					// No. of espresso shots
				var strMiles = $( "#range" ).val();					// Distance to shop
				var strdetailsacter = $( "#details" ).val();		// Extra details

        //Checkboxes
				$('input[name="toppings"]:checked').each(function() {
					strToppings += $(this).val() + " ";
				});

				//dusplay output in outputBox
				$('#outputBox').append("<br><br> Username: " + strusername)
										.append("<br> Password: " + strpassword)
										.append("<br> Confirm: " + strconfPassword)
										.append("<br> Delivery Date: " + strdeliveryDate)
										.append("<br> Phone: " + strtelephone)
										.append("<br> Email: " + stremail)
										.append("<br> Size: " + strsize)
										.append("<br> Extra Toppings: " + strToppings)
										.append("<br> Number of Espresso Shots: " + strespressoShots)
										.append("<br> Find a store is about " + strMiles + " miles away from you")
										.append("<br> Extra details: " + strdetailsacter);

        //validation passes
				alert("Passed validation & submitted.");
			}
		});

    //custom validation tests are in comments
    $("#flintstoneForm").validate({
			rules: {

				//username field is required, must be at less than 10 characters
				userName: {
					required: true,
					maxlength: 10
				},

				//pass field required, error if less than 8 characters
				password: {
					required: true,
					minlength: 8
				},

				//pass must match above field, error if not the same
				//required field
				confirmPassword: {
					required: true,
					equalTo: "#password"
				},

				//delivery date is required, must be a valid date
				datepicker: {
					required: true,
					date: true
				},

				//phone field required, must be exactly 10 characters
				//must be numbers, no strings
				phone: {
					required: true,
					digits: true,
					maxlength: 10
				},

				//must be a valid email, must be a required field
				email: {
					required: true,
					email: true
				},

				//user must add details
				//no longer than 100 characters
				details: {
					required: true,
					maxlength: 100
				},

				//must enter a coffee type, no longer than 20 characters
        coffeeOrder: {
          required: true,
          maxlength: 20
        },

				//required field, must be a number
        espressoShots: {
          required: true,
					digits: true
        },

				//extraToppings field required
				extraToppings: {
					required: true
				}
      },

    //messages to show if error
    messages: {

        userName: {
					required: " Please enter a username",
					maxlength: $.validator.format(" Must not have more than {0} characters")
				},

				password: {
					required: " Please provide a password",
					minlength: $.validator.format(" Must have at least {0} characters")
				},

				confirmPassword: {
					required: " Please confirm the password",
					equalTo: " Passwords must match."
				},

				datepicker: {
					required: " Please enter a delivery date",
					date: " Please enter a valid delivery date"
				},

				phone: {
					required: " Please enter a phone number",
					digits: " Please enter digits only",
					maxlength: " Only 10 characters allowed"
				},

				email: {
					required: " Please enter an email address",
					email: " Please enter a valid email address"
				},

				details: {
					maxlength: " 100 character limit"
				},

        coffeeOrder: {
          required: " Please select a coffee type!"
        },

        espressoShots: {
          required: " Please select the number of espresso shots."
        },

				extraToppings: {
					required: "Please select an option"
				}


			}
	});
});
