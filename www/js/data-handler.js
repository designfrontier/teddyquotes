var dataHandler = action.eventMe({
    //this will be our wrapper around data handling
    init: function(){
        //init function!
        var that = this;

        that.dbSetup();
        that.dataEventBindings();

        return that;
    }

    , dbSetup: function(){
        var that = this;
        
        that.pouch = new PouchDB('teddy-quotes');

        //check to see if we have an object for holding date/quote relationship
        //  if not create it
        that.pouch.get('quotedatemapping', function(err, doc){
            if(typeof doc === 'undefined'){
                //create it!
                that.pouch.put({
                    _id: 'quotedatemapping'
                    , quotes: []
                });
            }
        });

        //check for object for created unsynced quotes
        //  if not create it
        that.pouch.get('unsyncedquotes', function(err, doc){
            if(typeof doc === 'undefined'){
                //create it!
                that.pouch.put({
                    _id: 'unsyncedquotes'
                    , quotesToSync: []
                });
            }
        });
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
    //      used like this: that.emit('data:quote:get', 1234);
    , getQuote: function(quoteId){
        var that = window.dataHandler;

        if(typeof quoteId === 'undefined'){
            //fresh random quote!
            that.emit('data:quote:set', that.newQuote({
                text: 'The only man who makes no mistakes is the man who never does anything.'
            }));
        }else{
            //specific quote!
            alert('give me that quote!' + quoteId);

            // that.pouch.query({map:})
        }

    }

    , getQuoteByDate: function(quoteDate){
        console.warn('implement get by date');
    }

    , saveNew: function(dataIn){
        var data = dataIn
            that = this;

        that.pouch.put(that.newQuote(dataIn), function(err, response){
            if(err){
                that.emit('system:error:save');
            }else{
                that.emit('save:success');
            }
        });
    }

    , newQuote: function(dataIn){
        var quote = {
            text: dataIn.text || ''
            , source: dataIn.source || ''
            , image: dataIn.image || ''
            , dateCreated: dataIn.dateCreated || new Date()
            , synced: false
            , isQuote: true
        }

        return quote;
    }
}).init();