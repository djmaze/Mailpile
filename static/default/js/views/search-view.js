/* search-view.js */

var SearchView = Backbone.View.extend(
{
  initialize: function() {
		this.render();
  },
  render: function(){},
  events: {
		"click #log_feeling_use_text"       : "viewFeelingText",
		"click a.log_save_feeling"          : "processFeeling",
		"click div.emoticon_item"           : "processFeelingEmoticons",
		"keyup #log_feeling_value"          : "checkProcessFeelingText"
	},
	displayRecordType: function(type) {

		// Update Type
		UserData.set({ default_feeling_type : type });

		// Do Control Buttons
		$('div.left_control_links').removeClass('icon_small_text_select icon_small_emoticons_select icon_small_audio_select');
  },
  viewMessageSelect: function() {

		// Update Model
		LogFeelingModel.startFeeling();

		// Load View
		this.$el.html(_.template($("#record_feeling").html()));

		this.viewFeelingText();
  },
  viewFeelingText: function() {

		// View
		this.displayRecordType('text');
		
		// Limit Keys
		$('#log_feeling_value').jkey('space, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0', function(key) {
			Lightbox.printUserMessage('Enter only a single word (no spaces or numbers)');
		});
    },
    viewFeelingEmoticons: function() {

		// View
		this.displayRecordType('emoticons');

	},
  viewFeelingAudio: function() { 
	
		this.displayRecordType('audio');
  },
	checkProcessFeelingText: function(e) {
	
	    if (e.keyCode != 13) return;
        this.processFeelingText();	
	},
  processFeelingText: function() {

		// Update Model
		LogFeelingModel.processFeeling($('#log_feeling_value').val());

		// Update URL & View
		Backbone.history.navigate('#record/experience', true);

  },
  processFeelingEmoticons: function(e) {
 
		// Update Model
		LogFeelingModel.processFeeling($(e.target).data('feeling'));

		// Update URL & View
		Backbone.history.navigate('#record/experience', true);
  },
  viewExperience: function() {
    
    this.$el.html(_.template($("#record_experience").html()));
  },
  processExperience: function() {

		// Update Model
		LogFeelingModel.processExperience();

		// Update URL & View
		Backbone.history.navigate('#record/describe', true);

		Lightbox.printUserMessage('Please enter one thing you did today');
  },
  viewDescribe: function() {

		var view_data = { describe_this: LogFeelingModel.get('experience') };
		this.$el.html(_.template($("#record_describe").html(), view_data)).hide().delay(250).fadeIn();

	},
	checkProcessDescribe: function(e) {
	   if (e.keyCode != 13) return;
      this.processDescribe();
	},
	processDescribe: function() {

		// Update Model
		LogFeelingModel.processDescribe();

    Lightbox.printUserMessage('Please enter three words to describe what you did today');

  },
  viewThanks: function() {

		this.clearInput();

    var view_data = { complete_message: _.shuffle(UIMessages.log_feeling_complete)[0] };

    this.$el.html(_.template($("#record_thanks").html(), view_data));
  }
});
