
var SITE_SETTINGS = require('../settings/settings.global-settings');

var MixedMediaGallery = {

    options: {
        selectors: {
            mixedMediaGallery: '.js-mixed-media-gallery',
            mixedMediaGalleryItem: '.js-mixed-media-gallery-item',
            galleryThumb: '.js-mixed-media-gallery-thumb',
            galleryStage: '.js-mixed-media-gallery-stage',
            stageInstructions: '.js-mixed-media-stage-intructions'
        },

        classes: {
            isActive: 'is-active'
        }
    },

    state: {
        carousels: [] // store owl carousel references
    },

    addCarouselToState: function(itemToAdd) {
        this.state.carousels.push(itemToAdd);
    },

    refreshCurrentCarousels: function() {
        this.state.carousels.forEach(function(carousel, i) {
            // calling refresh callback to force Owl Carousel to recalc widths
            carousel.onResize();
        });
    },

    initCarousel: function($itemToShow) {

        var $carouselItems = $itemToShow.find('.js-mixed-media-img-carousel-item'),
            carouselAlreadyInitialised = $itemToShow.hasClass('owl-loaded');

        if ( this.state.carousels.length ) {
            this.refreshCurrentCarousels();
        }

        if ( $carouselItems.length < 2 ) {
            this.$stageInstructions.hide();
        } else {
            this.$stageInstructions.show();
        }

        if ( !carouselAlreadyInitialised && $itemToShow.length && $carouselItems.length > 1 ) {
            $itemToShow.owlCarousel({
                loop: true,
                dots: false,
                responsiveClass: true,
                navText: [
                    '<span>PREVIOUS</span><svg xmlns="http://www.w3.org/2000/svg" class="previous-icon" version="1.1"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chevron-left"></use></svg>',
                    '<span>NEXT</span><svg xmlns="http://www.w3.org/2000/svg" class="next-icon" version="1.1"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chevron-right"></use></svg>'
                ],
                items: 1,
                nav: true,
                lazyLoad: true
            });

            // add Owl Carousel object to state for reference
            this.addCarouselToState($itemToShow.data('owlCarousel'));
        }
    },

    updateStage: function(mediaToShowString) {
    	var $itemToShow = this.$mixedMediaGalleryItems.filter('[data-media="' + mediaToShowString + '"]');

        this.$mixedMediaGalleryItems.hide();
        $itemToShow.show();

        if ( $itemToShow.data('type') === 'carousel' ) {
            this.initCarousel($itemToShow);
        } else {
            // in case instructions were hidden previously
            this.$stageInstructions.show();
        }
    },

    updateStageInstructions: function(instructionsString) {
    	this.$stageInstructions.html(instructionsString);
    },

    handleThumbnailClick: function(e) {

    	e.preventDefault();

    	var $clickedThumb = $(e.currentTarget),
    		stageIntructions = $clickedThumb.data('instructions'),
    		mediaToShowString = $clickedThumb.data('show-media');

    	this.$galleryThumbs.removeClass(this.options.classes.isActive);
    	$clickedThumb.addClass(this.options.classes.isActive);

    	// this.updateStageInstructions(stageIntructions);
    	this.updateStage(mediaToShowString);
    },

    setUpClickEvents: function() {
    	this.$galleryThumbs.on('click', this.handleThumbnailClick.bind(this));
    },

    setUpInitialState: function() {

    	var $firstThumbnail = this.$galleryThumbs.eq(0);

    	// hide all gallery items
    	this.$mixedMediaGalleryItems.hide();

    	// show first gallery item
    	this.updateStage(this.$galleryThumbs.eq(0).data('show-media'));

    	// make first thumbnail active
    	$firstThumbnail.addClass(this.options.classes.isActive);

    	// this.updateStageInstructions($firstThumbnail.data('instructions'));
    },

    init: function() {

    	this.$mixedMediaGallery = $(this.options.selectors.mixedMediaGallery);
    	this.$mixedMediaGalleryItems = this.$mixedMediaGallery.find(this.options.selectors.mixedMediaGalleryItem);
        this.$galleryThumbs = this.$mixedMediaGallery.find(this.options.selectors.galleryThumb);
        this.$galleryStage = this.$mixedMediaGallery.find(this.options.selectors.galleryStage);
        this.$stageInstructions = this.$mixedMediaGallery.find(this.options.selectors.stageInstructions);


		if ( !this.$mixedMediaGallery.length ) {
			return false;
		}

		this.setUpInitialState();
		this.setUpClickEvents();

        return this;
    }
};

module.exports = MixedMediaGallery;