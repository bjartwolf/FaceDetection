// Refactor into own module
var events = require('events');
var rx = require('rx');
events.EventEmitter.prototype.toObservable = function (eventName) {
    var parent = this;
    return rx.Observable.create(function(observer) {
        var handler = function (o) {
            observer.onNext(o);
        };
        parent.addListener(eventName, handler);
        return function () {
            parent.removeListener(eventName, handler);
        };
    });
};


