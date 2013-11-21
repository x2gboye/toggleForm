;(function ($) {

    var defaults = {
		className: 'ui-toggleForm',
        edit: 'button.edit',
        cancel: 'button.cancel',
        data: '.data',
        form: '.form',
        close: 'close',
        hideOtherForms: true
    };

    var methods = {

        init: function (options) {

            return this.each(function (index) {
				
				var settings = $.extend({}, defaults);
				if (options) {
					settings = $.extend(settings, options);
				}
				
				var self = $(this);
								
				//so we can use settings in other methods
                self.data('toggleForm-settings', settings);
				
                var edit = self.find(settings.edit),
                    cancel = self.find(settings.cancel),
                    data = self.find(settings.data),
                    form = self.find(settings.form);
                
				if(!self.data('toggleForm-toggled')) {
					
					self.addClass(settings.className);
					
					var close = $('<button>', {
									type: 'button',
									'class': settings.close,
									html: '&times;'
								}).appendTo(self);
					
					edit.on('click', function (e) {
						e.preventDefault();
						var toggle = $(this).data('toggle');
						if (settings.hideOtherForms) {
							methods.showData.apply($('.' + settings.className));
						}
						showForm(toggle);
						//console.log('edit clicked');
					});
	
					close.on('click', function () {
						showData();
						//console.log('close clicked');
					});
	
					cancel.on('click', function (e) {
						e.preventDefault();
						showData();
						scrollToForm();
						//console.log('cancel clicked');
					});
					
					self.data('toggleForm-toggled', true);
					//console.log('toggleForm has been initialized on <' + self.prop('tagName') + ' id="' + self.attr('id') + '"> has been initialized');
				}
				else {
					var close = self.find('button.' + settings.close);
				}
				
				showData();

                function showData() {
                    close.add(form).hide();
                    data.add(edit).fadeIn('fast');
                }

                function showForm(toggle) {
                    data.add(edit).hide();
                    close.add($(toggle)).fadeIn('fast');
                    scrollToForm();
                }

                function scrollToForm() {
                    if ($(window).width() < 768) {
                        setTimeout(function () {
                            $(window).scrollTop(self.offset().top);
                        }, 250);
                    }
                }

            });
			
        },

        showForm: function () {
			
			return this.each(function () {
				var self = $(this),
					settings = self.data('toggleForm-settings');
				if (settings) {
					self.find(settings.data + ', ' + settings.edit).hide();
					self.find('button.' + settings.close + ', ' + settings.form).show();
				}
			});

        },

        showData: function () {
			
			return this.each(function () {
				var self = $(this),
					settings = self.data('toggleForm-settings');
				if (settings) {
					self.find('button.' + settings.close + ', ' + settings.form).hide();
					self.find(settings.data + ', ' + settings.edit).show();
				}
			});

        },

        destroy: function () {
			
			return this.each(function () {
				var self = $(this),
					settings = self.data('toggleForm-settings');
				if (settings) {
					self.find(settings.data + ', ' + settings.form + ', ' + settings.edit).show();
					self.find(settings.edit + ', ' + settings.cancel).off('click');
					self.find('button.' + settings.close).remove();
					self.data('toggleForm-toggled', false);
					self.removeClass(settings.className);
				}
			});

        }

    };

    $.fn.toggleForm = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on toggleForm");
        }

    };

})(jQuery);
