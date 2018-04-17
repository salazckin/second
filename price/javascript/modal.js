(function ($) {


    function MenuModal(options) {
        this.$menu = $('#header');
        this.$modalOpeners = $('[data-modal]');
        this.timeout = 1300;
        this.$clonedMenu = null;
        this.$menuParent = null;
        this.$menuCard = null;
        this.$content = null;

        this.formHtml =
            '<form class="contactForm contact-form">' +
                '<label class="contact-form__label" for="phone-input">Введите телефон</label>' +
                '<div class="contact-form__input-wrapper"><input class="contact-form__input" ' +
                    'type="text" name="phone" required ' +
                    'placeholder="89532240512" /> <div class="contact-form__input-deco"></div> </div> ' +

                '<label class="contact-form__label" for="name-input">Введите имя</label>' +
                '<div class="contact-form__input-wrapper"><input class="contact-form__input" type="text" name="name" ' +
                    'required ' +
                    'placeholder="Иван" /> <div class="contact-form__input-deco"></div> </div> ' +

                '<button class="contact-form__back" type="button">Назад</button>'+
                '<button class="contact-form__submit" type="submit">Отправить</button>'+
            '</form>';

        this.thanksHtml = '<h1 class="contact-form__thanks-header">Данные отправлены, мы свяжемся с вами в ближайшее время</h1>';
        this.errorHtml = '<span>упс, произошла ошибка</span>';
    }

    MenuModal.prototype.init = function () {
        this.$modalOpeners.on('click', this.showModal.bind(this));
    };

    MenuModal.prototype.showModal = function (e) {
        e.preventDefault();

        this.getParent(e.currentTarget);
        this.cloneMenu();

        this.renderContent(this.formHtml);
    };

    MenuModal.prototype.listenFormEvents = function(){
        this.$form = $('.contact-form');
        this.$form.on('submit', this.handleSubmit.bind(this));
        $('.contact-form__back', this.$form).on('click', this.handleBackClick.bind(this));
    };

    MenuModal.prototype.handleBackClick = function(e){
        e.preventDefault();

        this.renderContent(this.$clonedMenu.children());
        this.init();
    };

    MenuModal.prototype.handleSubmit = function(e){
        e.preventDefault();

        var nameInput = $('[name="name"]', this.$form);
        var phoneInput = $('[name="phone"]', this.$form);

        console.log(nameInput.val(), phoneInput.val());

        this.renderContent(this.thanksHtml);

        setTimeout(function () {
            this.renderContent(this.$clonedMenu.children());
            this.init();
        }.bind(this), 4000);
    };

    MenuModal.prototype.toggle = function(){
        this.$menuCard.toggleClass('loaded');
    };

    MenuModal.prototype.renderContent = function (content) {
        this.toggle();

        setTimeout(function () {
            this.$content.html(content);
            this.listenFormEvents();
            this.toggle();
        }.bind(this), this.timeout);
    };

    MenuModal.prototype.getParent = function (elem) {

        var $target = $(elem);
        var $parent = $target.parents('#block1');

        if($parent.length === 0){
            $parent = $target.parents('#header');
        }

        this.$menuParent = $parent;
        this.$menuCard = this.$menuParent.children();
        this.$content = $('.content', this.$menuCard);
    };

    MenuModal.prototype.cloneMenu = function () {
        this.$clonedMenu = this.$content.clone(true, true);
    };

    var menuModal = new MenuModal({});
    menuModal.init();


})(window.jQuery);
