// NOTE: The bootstrap file has been hackily modified to be wrapped in a "tw-bs" class.

(function($) {
	require("./bootstrap.css2.js");
	require("./bootstrap/dist/js/bootstrap.min.js")

	// Add a parent <div> with the main bootstrap class. All BS elements should go inside.
	var addControlPanel = module.exports.addControlPanel = function(parent_object, id) {
		if (!id) {
			id = "control_panel";
		}
		// create it if it doesn't already exist
		if (!$(parent_object).find("#" + id).length) {
			$("<div />", {
				id: id
			})
			.addClass("tw-bs control_panel")
			.appendTo(parent_object);		
		}
		return $(parent_object).find("#" + id);
	}

	// opts.buttons = array of info for each button (id + html)
	module.exports.addButtonGroup = function(parent_object, opts) {
		if (!opts || !opts.buttons) {
			console.log("Must at least provide buttons to button group.");
			return;
		}

		// get or create control panel element
		var cp = addControlPanel(parent_object, opts.id);

		var group = $("<div />").addClass("btn-group").appendTo(cp);

		$.each(opts.buttons, function(i, v) {
			var button = $("<button />", {
				type: "button",
				id: v[0],
				html: v[1]
			}).addClass("btn").addClass("btn-default").appendTo(group);

			if (v[2]) {
				button.addClass("active");
			}
		});

		// click behavior
		group.find("button").click(function(e, v) {
			group.find("button").removeClass("active");
			$(e.target).addClass("active");
		    var key = $(e.target).attr("id"),
		    	val = $(e.target).html();
		    if (opts.callback) {
		    	opts.callback(key, val);
		    }
		});

		return group;
	}
}(window.jQuery));