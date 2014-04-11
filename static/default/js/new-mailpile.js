var MailpileRouter = Backbone.Router.extend(
{
	initialize: function(el) {

	  this.el = el;

	  // Generic Views
	  this.indexView				= new ContentView('#index');
	  this.logoutView				= new ContentView('#logout');

	  // Record Views
	  this.recordIndex			= new ContentView('#record');
	  this.recordFeeling		= new RecordFeelingView({ el: $('#content') });
  },
	routes: {
		""               : "index",
		"login"          : "login",
		"signup"         : "signup",
		"logout"			   : "logout",
		"security"			 : "securityViews",
		"security/:view" : "recordViews"
	},
	currentView: null,
	switchView: function(view) {

		if (this.currentView) {
			this.currentView.remove();	// Detach the old view
		}

		this.el.html(view.el);			  // Move the view element into the DOM (replacing the old content)
		view.render();					      // Render view after it is in the DOM (styles are applied)
		this.currentView = view;
	},
	index: function() {

		if (UserData.get('logged') === 'yes') {
			Backbone.history.navigate('#record/feeling', true);	
		}
		else {
			this.switchView(this.indexView);
		}
	},
	recordViews: function(view) {

		if (UserData.get('logged') !== 'yes') {
			Backbone.history.navigate('#login', true);
		}
		else if (view === 'feeling') {
			this.recordFeeling.viewFeeling();
		}
		else {
			this.switchView(this.notFoundView);
		}
	}
});