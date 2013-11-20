;(function ($) {

    var defaults = {
        edit: 'button.edit',
        cancel: 'button.cancel',
        data: '.data',
        form: '.form',
        close: 'close',
        hideOtherForms: true
    };

    var methods = {

        init: function (options) {

            var settings = $.extend({}, defaults);
            if (options) {
                settings = $.extend(settings, options);
            }

            var _EDIT = this.find(settings.edit),
                _DATA = this.find(settings.data),
                _FORM = this.find(settings.form),
                _CLOSE = $('<button>', {
                    type: 'button',
                    'class': settings.close,
                    html: '&times;'
                }).appendTo(this);

            return this.each(function () {

                var self = $(this),
                    edit = self.find(settings.edit),
                    cancel = self.find(settings.cancel),
                    data = self.find(settings.data),
                    form = self.find(settings.form),
                    close = self.find('button.' + settings.close);

                if (close.length > 1) {
                    self.find('button.' + settings.close + ':gt(0)').remove();
                }

                //so we can use settings in other methods
                self.data('toggleForm-settings', settings);

                showData();

                edit.on('click', function () {
                    var toggle = $(this).data('toggle');
                    if (settings.hideOtherForms) {
                        reset();
                    }
                    showForm(toggle);
                });

                close.on('click', function () {
                    showData();
                });

                cancel.on('click', function () {
                    showData();
                    scrollToForm();
                });

                function showData() {
                    close.hide();
                    form.hide();
                    data.fadeIn('fast');
                    edit.fadeIn('fast');
                }

                function showForm(toggle) {
                    data.hide();
                    edit.hide();
                    close.fadeIn('fast');
                    $(toggle).fadeIn('fast');
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

            function reset() {
                _CLOSE.hide();
                _FORM.hide();
                _DATA.show();
                _EDIT.show();
            }
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
