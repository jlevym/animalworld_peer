// put your javascript code here

// variables for all of the templates so we only have to compile
// them once on page load and can then use the same compiled 
// templates many times
var categories_template, category_template, image_template, slideshow_template;

// variables to store the current displayed album and photo
var current_category = animals_data.category[0];
var current_image = current_category.image1;

// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data){
	var html    = template(data);
	$('#content').html(html);
}

// document read gets called when the whole document
// is loaded, so we put most of the code that needs to run
// in here
$(document).ready(function(){

	//
	// compile all of our templates ready for use
	//
	var source   = $("#categories-template").html();
	categories_template = Handlebars.compile(source);
	
	source   = $("#category-template").html();
	category_template = Handlebars.compile(source);
	
	source   = $("#image-template").html();
	image_template = Handlebars.compile(source);
	
	source   = $("#slideshow-template").html();
	slideshow_template = Handlebars.compile(source);

	
	 //clicking on the albums tab shows the 
	 //thumbnails of all the albums
	//
	$("#categories-tab").click(function () {

		// displays the categories template
		showTemplate(categories_template, animals_data);

		// make the categories tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make albums tab active
		$("#categories-tab").addClass("active");

		// add a click callback to each album 
		// thumbnail which displays the photos
		// template on that album
		$(".album-thumbnail").click(function (){
			var index = $(this).data("id");
			current_category = animals_data.category[index];

			// displays the photos template
			showTemplate(category_template, current_category);

			// add an on click al all the photo thumbnails
			// which displays the photo in a modal popup
			$(".photo-thumbnail").click(function (){
				// get the index (position in the array)
				// of the photo we clicked on
				// "this" is the element that was clicked on
				// data("id") gets the attribute data-id
				// (which we set to the index of the photo in
				// the array - @index)
				var index = $(this).data("id");

				// set the current image to this image
				current_image = current_category.animals[index];
				
				// displays the single photo template
				showTemplate(image_template, current_image);
			});
		});
	});


	// 
	//  clicking on the photos tab shows all of the 
	//  photos in the current album
	//
	$("#category-tab").click(function () {
		// displays the photos template
		showTemplate(category_template, current_category);

		// make the photos tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make photos tab active
		$("#category-tab").addClass("active");

		// add an on click al all the photo thumbnails
		// which displays the photo in a modal popup
		$(".photo-thumbnail").click(function (){
			// get the index (position in the array)
			// of the photo we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the photo in
			// the array - @index)
			var index = $(this).data("id");

			// set the current photo to this photo
			current_image = current_category.animals[index];
			
			// displays the single photo template
			showTemplate(image_template, current_image);
		});
	});

	// 
	 // clicking on the slideshow tab displays the
	//  current album as a slide show
	//
	$("#slideshow-tab").click(function () {
		// display the slideshow template using the 
		// current album
		showTemplate(slideshow_template, current_category);
		
		// make the slideshow tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make slideshow tab active
		$("#slideshow-tab").addClass("active");
	});

	// start the page by showing the albums view
	// we do this by virtually clicking on the 
	// albums tab
	$("#categories-tab").click();

 });
