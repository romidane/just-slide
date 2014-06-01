var smartSlider = (function(slider) {
    'use strict';


    function Slider(options) {
        this.options = options;
    }

    Object.defineProperties(Slider.prototype, {
        currentPos: {
            value: 0,
            enumerable: true,
            writable: true
        },

        whichDirection: {
            value: function(pos) {
                return (pos == "left") ? 1 : -1;
            },
            enumerable: true
        },

        updateCurrPos: {
            value: function(pos, collection) {

                var newValue = this.currentPos + pos;

                if (newValue > collection.length - 1)
                    return this.currentPos = 0;

                if (newValue < 0)
                    return this.currentPos = collection.length - 1;

                return this.currentPos = newValue;
            },
            enumerable: true
        },

        updateMainImg: {
            value: function() {
                this.options.mainImg.src = this.options.collection[this.currentPos];
            },
            enumerable: true
        },

        transition: {
            value: function(data) {
                var position = this.whichDirection(data.direction);
                this.updateCurrPos(position, this.options.collection);
                this.updateMainImg();
            },
            enumerable: true
        },

        animate: {
            value: function() {
                var that = this;
                this.interval = setInterval(function() {
                    that.transition({
                        direction: "left"
                    });

                }, 10000);
            }
        },

        start: {
            value: function() {
                var that = this;
                that.animate();
                [].forEach.call(this.options.buttons, function(elem) {
                    elem.addEventListener('click', function(e) {
                        var data = e.target.getAttribute('data-direction');
                        that.transition({
                            direction: data
                        });
                    });
                });
            }
        },

    });

    slider.create = function(options) {
        if (!options.elem) throw new Error("You must supply slider elem");
        options.width = options.width || options.elem.offsetWith;
        options.animate = options.animate || true;
        options.buttons = options.buttons || null;

        new Slider(options).start();
    };


    return slider;



})(smartSlider || {});



var gistmeeSlider = smartSlider.create({
    elem: document.querySelector('.slider'),
    mainImg: document.querySelector('#main-img'),
    collection: ["images/1.jpg", "images/2.jpg", "images/3.jpg"],
    buttons: document.querySelectorAll('.button')
});