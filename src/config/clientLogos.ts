import azzaroLogo from '../assets/client-logos/Azzaro_logo-700x127.png';
import carrefourLogo from '../assets/client-logos/carrefour.png';
import danubeLogo from '../assets/client-logos/danube.jpg';
import decathlonLogo from '../assets/client-logos/decathlon.jpeg';
import eleclercLogo from '../assets/client-logos/E-Leclerc_logo-.png';
import guyLarocheLogo from '../assets/client-logos/guy laroche.png';
import homeCentreLogo from '../assets/client-logos/HC-Brand-Jewel-English.jpg';
import hyperOneLogo from '../assets/client-logos/hyper one.jpeg';
import kentiaLogo from '../assets/client-logos/kentia_logo_0-600x315w.png';

export type ClientLogo = {
  name: string;
  image?: string;
};

export const clientLogos: ClientLogo[] = [
  { name: 'Azzaro', image: azzaroLogo },
  { name: 'E.Leclerc', image: eleclercLogo },
  { name: 'Guy Laroche Paris', image: guyLarocheLogo },
  { name: 'Kentia Home Linen', image: kentiaLogo },
  { name: 'Home Centre', image: homeCentreLogo },
  { name: 'Omazone Group' },
  { name: 'Decathlon', image: decathlonLogo },
  { name: 'Danube Home', image: danubeLogo },
  { name: 'Hyper One', image: hyperOneLogo },
  { name: 'SH' },
  { name: 'Carrefour', image: carrefourLogo },
];
