
function miscHelpers() {

    /**
     * Debounces events (basically waits a set time before calling the callback)
     * @param {Function}    callback    - the function to be called after the debounce time
     * @param {Array}       args        - the arguments to be passed to the callback function
     * @param {Number}      debounceTme - the amount of time to wait until the callback is called
     * @return {Nothing}
     */
    this.eventDebounce = function(callback, args, debounceTime = 250) {
        var resizeTimer;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            typeof args !== 'undefined' ? callback.apply(this, args) : callback();
        }, debounceTime);
    }

    return this;
}

module.exports = miscHelpers;