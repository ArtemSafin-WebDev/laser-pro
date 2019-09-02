import header from './header';
import heroSlider from './heroSlider';
import reviewsSlider from './reviewsSlider';
import popup from './popup';
import indicators from './indicators';
import geographyMap from './geographyMap';
import subscribeForm from './subscribeForm';
import aboutCounter from './aboutCounter';
import callback from './callback';

export default [
  header,
  heroSlider,
  reviewsSlider,
  popup,
  indicators,
  () => setTimeout(geographyMap, 2000), // delay loading maps for the best page speed
  subscribeForm,
  aboutCounter,
  callback
];
