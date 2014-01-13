var configuration = action.eventMe({
    init: function(){
        var that = this;

        that.setupListeners();

        return that;
    }

    , setupListeners: function(){
        var that = this;

        //network change events
        document.addEventListener('offline', this.onOffline, false);
        document.addEventListener('online', this.onOnline, false);

        that.listen('network:getStatus', that.checkNetworkStatus);
    }

    , onOnline: function(){
        action.events.emit('network:online');
    }

    , onOffline: function(){
        action.events.emit('network:offline');
    }

    , checkNetworkStatus: function(){
        var that = window.configuration
            , networkState = navigator.connection.type;

        that.emit('network:setStatus', networkState);
    }
}).init();