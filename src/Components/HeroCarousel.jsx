import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const heroImages = [
  { imgUrl: '/images/hero-1.svg', alt: 'smartwatch'},
  { imgUrl: '/images/hero-2.svg', alt: 'bag'},
  { imgUrl: '/images/hero-3.svg', alt: 'lamp'},
  { imgUrl: '/images/hero-4.svg', alt: 'air fryer'},
  { imgUrl: '/images/hero-5.svg', alt: 'chair'},
]

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <img 
            src={image.imgUrl}
            alt={image.alt}
            width={350}
            height={350 }
            className="object-contain"
            key={image.alt}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default HeroCarousel