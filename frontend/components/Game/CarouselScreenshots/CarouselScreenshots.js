import { useState } from 'react';

import { Image, Modal } from 'semantic-ui-react';
import Slider from 'react-slick';

const settings = {
  className: 'carousel-screenshots',
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  swipeToSlider: true,
};

export default function CarouselScreenshots({ title, screenshots }) {
  const [showModal, setShowModal] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  const openImage = (url) => {
    setUrlImage(url);
    setShowModal(true);
  };

  return (
    <>
      <Slider {...settings}>
        {screenshots.map((screenshot) => (
          <Image
            key={screenshot.id}
            src={screenshot.url}
            alt={screenshot.name}
            onClick={() => openImage(screenshot.url)}
          />
        ))}
      </Slider>

      <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={urlImage} alt={title} />
      </Modal>
    </>
  );
}
