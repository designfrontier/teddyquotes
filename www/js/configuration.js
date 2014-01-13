var configuration = action.eventMe({
    init: function(){
        var that = this;

        that.setupListeners();

        return that;
    }

    , setupListeners: function(){
        var that = this;
        that.listen('network:getStatus', that.checkNetworkStatus);
    }

    , checkNetworkStatus: function(){
        var that = window.configuration
            , networkState = navigator.connection.type;

        that.emit('network:setStatus', networkState);
    }
}).init();