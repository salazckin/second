(function($){

    function Accordions(options) {
        this.options = options? options : {};
        this.animateTime = this.options.animateTime || 500;
        this.scrollToTime = this.options.scrollToTime || 2000;
        this.$priceContent = $('#price-content');

        this.$accordionsHeads = $('dt', this.$priceContent);
        this.$accordionsBodies = $('dd', this.$priceContent);

        this.openAccordion = this.openAccordion.bind(this);
    }

    Accordions.prototype.init = function () {
        this.$accordionsHeads.on('click', this.openAccordion);
        console.log(this);
    };

    Accordions.prototype.openAccordion = function (e) {
        e.preventDefault();

        var $clicked = $(e.currentTarget);
        var $clickedBody = $clicked.next();

        if($clickedBody.css('display') === 'block'){
            $clickedBody.slideUp(this.animateTime);
            return;
        }

        this.closeAll();

        $clickedBody.slideDown(this.animateTime);
        this.scrollToElem($clicked);
    };

    Accordions.prototype.closeAll = function () {
        this.$accordionsBodies.slideUp(this.animateTime);
    };

    Accordions.prototype.scrollToElem = function (elem) {
        if(! elem instanceof jQuery){
            throw new Error('element must be jquery elem');
            return;
        }

        // delay before animate
        setTimeout(function(){
            $('html, body').animate({
                scrollTop: elem.offset().top - 200
            }, this.scrollToTime);
        }, this.animateTime)
    };

    Accordions.prototype.constructor = Accordions;

    var accords = new Accordions();

    accords.init({
        animateTime: 500,
        scrollToTime: 20000
    });

})(window.jQuery);

