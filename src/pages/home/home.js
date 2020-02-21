import vueSwiper from 'vue-awesome-swiper'
import Vue from 'vue'
import 'swiper/dist/css/swiper.min.css'
Vue.use(vueSwiper);

export default {
    data() {
        return {
            swiperproduct:{
                slidesPerView: 'auto',

            },
            swiperOption: {
                watchSlidesProgress: true,
                loop: true,
                speed:500,
                autoplay:{
                    delay: 3000,
                disableOnInteraction: false,
            },
                slidesPerView: 'auto',
                centerSlides:true,
                on:{
                    progress(progress){
                        var ss = document.documentElement.style.fontSize.replace('px','')
                        for ( var i = 0; i < this.slides.length; i++) {
                            var slide = this.slides.eq(i);
                            var slideProgress = this.slides[i].progress;
                            var  modify = 1;
                            if (Math.abs(slideProgress) > 1) {
                                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                            }
                            var  translate = slideProgress * modify * ss*23.5 + 'px';
                            var  scale = 1 - Math.abs(slideProgress) / 3;
                            var  zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                            slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                            slide.css('zIndex', zIndex);
                        }
                    },
                    setTransition: function (transition) {
                        for (var i = 0; i < this.slides.length; i++) {
                            var slide = this.slides.eq(i)
                            slide.transition(transition);
                        }
    
                    }
                }
            },
        }
    },
}


