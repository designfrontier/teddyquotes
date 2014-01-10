var dataHandler = action.eventMe({
    //this will be our wrapper around data handling
    init: function(){
        //init function!
        var that = this;

        that.pouch = new PouchDB('teddy-quotes');

        that.dataEventBindings();

        return that;
    }

    , dataEventBindings: function(){
        var that = this;

        that.listen('save:new', that.saveNew);
        that.listen('data:quote:get', that.getQuote);
    }

    //two variations here. If the event has an ID
    //  then return the quote with that ID. 
    //  otherwise give up a random quote
    //      the ID should be a string/int not
    //      and object
    //      used like this: that.emit('data:quote', 1234);
    , getQuote: function(quoteId){
        var that = window.dataHandler;

        if(typeof quoteId === 'undefined'){
            //fresh random quote!
            that.emit('data:quote:set', {
                text: 'The only man who makes no mistakes is the man who never does anything.'
            });
        }else{
            //specific quote!
            alert('give me that quote!' + quoteId);
        }

    }

    , saveNew: function(dataIn){
        var data = dataIn
            that = this;

        that.pouch.put(that.newQuote(dataIn));
    }

    , newQuote: function(dataIn){
        var quote = {
            text: dataIn.text || ''
            , source: dataIn.source || ''
            , image: dataIn.image || ''
            , dateCreated: dataIn.dateCreated || new Date()
            , synced: false
        }

        return quote;
    }
}).init();