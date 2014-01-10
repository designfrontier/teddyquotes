var app = action.eventMe({
    // Application Constructor
    initialize: function() {
        var that = this;

        that.bindEvents();
        that.setupRouting();

        that.emit('navigate:main');
    }
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    , bindEvents: function() {
        var that = this;

        document.addEventListener('deviceready', this.onDeviceReady, false);

        $(document).on('click', '.add', function(){
            that.emit('navigate:add');
        }).on('click', '.js-save', function(){
            that.emit('save:new', {
                text: $('.new-quote').val()
                , source: $('[name="quote-source"]').val()
            });
        }).on('click', '.nav-main', function(){
            that.emit('navigate:main');
        });

        that.listen('save:success', function(){
            $('textarea, input').val('');

            alert('saved successfully!');
        });
    }
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    , onDeviceReady: function() {

    }
    // Update DOM on a Received Event
    , receivedEvent: function(id) {
       
    }

    , setupRouting: function(){
        var that = this
            templateTarget = $('#template-target');

        that.listen('navigate:add', function(){
            templateTarget.html(Handlebars.templates.addTemplate());
        });

        that.listen('data:quote:set', function(quoteObj){
            templateTarget.html(Handlebars.templates.main(quoteObj));
        });

        that.listen('navigate:main', function(){
            that.emit('data:quote:get');
        });

    }
});
