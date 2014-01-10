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
                }, function(){
                    that.pouch.get('qoutedatemapping', function(err, doc){
                        that.qouteDateMapping = doc;
                    });
                });
            }else{
                that.qouteDateMapping = doc;
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
                }, function(){
                    that.pouch.get('unsyncedquotes', function(err, doc){
                        that.unsyncedQuotes = doc;
                    });
                });
            }else{
                that.unsyncedQuotes = doc;
            }
        });      
    }

    , dataEventBindings: function(){
        var that = this;

        that.listen('save:new', that.saveNew);
        that.listen('data:quote:get', that.getQuote);
        that.listen('data:quote', that.getQuoteByDate);
    }

    //two variations here. If the event has an ID
    //  then return the quote with that ID. 
    //  otherwise give up a random quote
    //      the ID should be a string/int not
    //      and object
    //      used like this: that.emit('data:quote:get', 1234);
    , getQuote: function(quoteId){
        var that = window.dataHandler
            , map = function(doc){
                        if(doc.isQuote && !doc.used){
                            emit(doc);
                        } 
                    }
            , i;

        if(typeof quoteId === 'undefined'){
            //fresh random quote!
            that.pouch.query({map:map}, function(err, response){
                var quote = response.rows[that.randomInt(response.rows.length)].key;
                console.log(quote);
                quote.used = that.formatDate();

                that.pouch.put(quote, function(e,r){
                    console.log(e,r);
                });

                that.emit('data:quote:set', response.rows[that.randomInt(response.rows.length)].key);
            });

            // that.emit('data:quote:set', that.newQuote({
            //     text: 'The only man who makes no mistakes is the man who never does anything.'
            // }));
        }else{
            //specific quote!
            alert('give me that quote!' + quoteId);

            // that.pouch.query({map:})
        }

    }

    , getQuoteByDate: function(quoteDateIn){
        var that = window.dataHandler
            , date = new Date()
            , map = function(){
                var quoteDate = that.formatDate(quoteDateIn);

                return function(doc){
                    if(doc.used === '1-10-2014'){
                        emit(doc);
                    }
                };
            }(that);

        that.pouch.query({map:map}, function(err, response){
            if(response.total_rows > 0){
                that.emit('data:quote:set', response.rows[0].key);
            }else{
                that.emit('data:quote:get');
            }
        });

    }

    , formatDate: function(dateIn){
        var d = (typeof dateIn === 'undefined') ? new Date() : new Date(dateIn);

        return d.getUTCMonth() + 1 + '-' + d.getDate() + '-' + d.getFullYear();
    }

    , saveNew: function(dataIn){
        var data = dataIn
            that = window.dataHandler;

        that.pouch.post(that.newQuote(dataIn), function(err, response){
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
            , used: false
        }

        return quote;
    }

    , randomInt: function(maxIn, minIn){
        var max = maxIn || 10
            , min = minIn || 1;

        return Math.floor(Math.random() * (max - min + 1) + min) - 1;
    }
}).init();