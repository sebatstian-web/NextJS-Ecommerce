import { parseISO, format } from 'date-fns';
import es from 'date-fns/locale/es';
import ReactPlayer from 'react-player/youtube';

import CarouselScreenshots from '../CarouselScreenshots';

export default function InfoGame({ game }) {
  const { video, title, screenshots, summary, releaseDate } = game;

  const releaseDateFormatted = parseISO(releaseDate);

  return (
    <div className="info-game">
      <ReactPlayer
        className="info-game__video"
        url={video}
        controls={true}
        config={{
          youtube: {
            playerVars: { origin: window.location.origin },
          },
        }}
      />

      <CarouselScreenshots title={title} screenshots={screenshots} />

      <div className="info-game__content">
        <div>{summary}</div>
        <div className="info-game__content-date">
          <h4>Fecha de lanzamiento:</h4>
          <p>{format(releaseDateFormatted, 'PPP', { locale: es })}</p>
        </div>
      </div>
    </div>
  );
}
