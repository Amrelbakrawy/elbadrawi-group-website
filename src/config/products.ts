import bathmatImage from '../assets/products/Bathmat.png';
import bathrobesImage from '../assets/products/Bathrobes.png';
import blanketsImage from '../assets/products/Blankets-Photoroom.webp';
import bedSkirtsImage from '../assets/products/Bed-Skirts.png';
import bedspreadsImage from '../assets/products/Bedspreads.png';
import comfortersImage from '../assets/products/Comforters-Photoroom.webp';
import duvetCoversImage from '../assets/products/Duvet Covers-Photoroom.webp';
import duvetsImage from '../assets/products/Duvets-Photoroom.webp';
import fittedSheetsImage from '../assets/products/Fitted Sheets-Photoroom.webp';
import flatSheetsImage from '../assets/products/Flat Sheets-Photoroom.webp';
import mattressProtectorImage from '../assets/products/Mattress Protector-Photoroom.webp';
import mattressTopperImage from '../assets/products/Mattress Topper-Photoroom.webp';
import mattressesImage from '../assets/products/Mattresses-Photoroom.webp';
import pillowProtectorsImage from '../assets/products/Pillow Protectors-Photoroom.webp';
import pillowcasesImage from '../assets/products/Pillowcases-Photoroom.webp';
import pillowsCushionsImage from '../assets/products/Pillows&Cushions-Photoroom.webp';
import quiltsImage from '../assets/products/Quilts-Photoroom.webp';
import throwsImage from '../assets/products/Throws-Photoroom.webp';
import towelsImage from '../assets/products/Towels-Photoroom.webp';

export type ProductItem = {
  name: string;
  description: string;
  arName: string;
  arDescription: string;
  image: string;
};

export const productRange: ProductItem[] = [
  {
    name: 'Fitted Sheets',
    description:
      'We manufacture fitted sheets in a wide range of fabrics, sizes, depths, colors, and constructions to meet retail, hospitality, wholesale, and private label requirements.',
    arName: 'ملايات استك',
    arDescription:
      'نصنع ملايات استك بمجموعة واسعة من الخامات والمقاسات والأعماق والألوان والتصميمات لتناسب احتياجات التجزئة والفنادق والجملة والعلامات التجارية الخاصة.',
    image: fittedSheetsImage,
  },
  {
    name: 'Flat Sheets',
    description:
      'We produce flat sheets in different fabrics, finishes, sizes, thread counts, and packaging options for hotels, retailers, distributors, and custom bedding programs.',
    arName: 'ملايات فلات',
    arDescription:
      'ننتج ملايات فلات بخامات وتشطيبات ومقاسات وعدد خيوط وخيارات تغليف مختلفة للفنادق وتجار التجزئة والموزعين وبرامج المفروشات المخصصة.',
    image: flatSheetsImage,
  },
  {
    name: 'Duvet Covers',
    description:
      'We manufacture duvet covers in multiple sizes, fabrics, closures, colors, patterns, and finishes, with the flexibility to develop custom designs for private label and hospitality clients.',
    arName: 'أكياس لحاف',
    arDescription:
      'نصنع أكياس لحاف بمقاسات وخامات وأنواع غلق وألوان ونقشات وتشطيبات متعددة، مع إمكانية تطوير تصميمات خاصة لعملاء العلامات التجارية والفنادق.',
    image: duvetCoversImage,
  },
  {
    name: 'Pillowcases',
    description:
      'We produce pillowcases in standard, Oxford, envelope, flap, and custom styles, available in various fabrics, sizes, thread counts, colors, and finishes.',
    arName: 'أكياس مخدات',
    arDescription:
      'ننتج أكياس مخدات بأنماط ستاندرد وأوكسفورد وظرف وقلاب وتصميمات مخصصة، مع توفر خامات ومقاسات وعدد خيوط وألوان وتشطيبات متنوعة.',
    image: pillowcasesImage,
  },
  {
    name: 'Pillows & Cushions',
    description:
      'We manufacture pillows and cushions with different shell fabrics, filling types, weights, firmness levels, shapes, sizes, and finishing details according to client requirements.',
    arName: 'مخدات وخدديات',
    arDescription:
      'نصنع مخدات وخدديات بخامات خارجية وأنواع حشو وأوزان ودرجات صلابة وأشكال ومقاسات وتشطيبات مختلفة حسب متطلبات العميل.',
    image: pillowsCushionsImage,
  },
  {
    name: 'Duvets',
    description:
      'We produce duvets with various outer fabrics, filling materials, GSM levels, quilting patterns, warmth levels, sizes, and packaging options for retail and hotel use.',
    arName: 'ألحفة',
    arDescription:
      'ننتج ألحفة بخامات خارجية ومواد حشو ومستويات GSM ونقشات خياطة ودرجات دفء ومقاسات وخيارات تغليف متعددة للاستخدام في التجزئة والفنادق.',
    image: duvetsImage,
  },
  {
    name: 'Comforters',
    description:
      'We manufacture comforters in different fabrics, fillings, weights, quilting styles, patterns, colors, and set configurations for seasonal, retail, and hospitality collections.',
    arName: 'كومفورترات',
    arDescription:
      'نصنع كومفورترات بخامات وحشوات وأوزان وأنماط خياطة ونقشات وألوان وتكوينات أطقم مختلفة لمجموعات موسمية وتجارية وفندقية.',
    image: comfortersImage,
  },
  {
    name: 'Quilts',
    description:
      'We produce quilts in a variety of materials, fillings, stitching patterns, weights, sizes, colors, and designs, suitable for both decorative and functional bedding ranges.',
    arName: 'كويلتات',
    arDescription:
      'ننتج كويلتات بخامات وحشوات وأنماط خياطة وأوزان ومقاسات وألوان وتصميمات متنوعة، مناسبة للمجموعات الديكورية والعملية.',
    image: quiltsImage,
  },
  {
    name: 'Mattresses',
    description:
      'We manufacture mattresses in a range of sizes, heights, comfort levels, support systems, cover fabrics, quilting styles, and custom specifications for retail, hospitality, wholesale, and private label requirements.',
    arName: 'مراتب',
    arDescription:
      'نصنع مراتب بمقاسات وارتفاعات ودرجات راحة وأنظمة دعم وخامات أغطية وأنماط خياطة ومواصفات مخصصة لتناسب احتياجات التجزئة والفنادق والجملة والعلامات التجارية الخاصة.',
    image: mattressesImage,
  },
  {
    name: 'Mattress Toppers',
    description:
      'We manufacture mattress toppers with different filling types, thicknesses, GSM levels, cover fabrics, elastic systems, sizes, and comfort specifications.',
    arName: 'مراتب تطرية',
    arDescription:
      'نصنع مراتب تطرية بأنواع حشو وسماكات ومستويات GSM وخامات غطاء وأنظمة تثبيت ومقاسات ومواصفات راحة مختلفة.',
    image: mattressTopperImage,
  },
  {
    name: 'Mattress Protectors',
    description:
      'We produce mattress protectors in waterproof, water-resistant, quilted, terry, fitted, and custom constructions, available in various sizes, depths, fabrics, and finishes.',
    arName: 'واقيات مراتب',
    arDescription:
      'ننتج واقيات مراتب بتركيبات مقاومة للمياه أو عازلة للمياه أو مبطنة أو تيري أو استك، مع توفر مقاسات وأعماق وخامات وتشطيبات متعددة.',
    image: mattressProtectorImage,
  },
  {
    name: 'Pillow Protectors',
    description:
      'We manufacture pillow protectors in waterproof, quilted, cotton, terry, zippered, envelope, and custom styles for retail, hotel, and private label programs.',
    arName: 'واقيات مخدات',
    arDescription:
      'نصنع واقيات مخدات بأنماط عازلة للمياه ومبطنة وقطنية وتيري وبسوستة وظرف وتصميمات مخصصة لبرامج التجزئة والفنادق والعلامات التجارية الخاصة.',
    image: pillowProtectorsImage,
  },
  {
    name: 'Towels',
    description:
      'We produce towels in different sizes, GSM levels, yarn types, colors, weaving styles, borders, embroidery options, and private label packaging formats.',
    arName: 'مناشف',
    arDescription:
      'ننتج مناشف بمقاسات ومستويات GSM وأنواع غزل وألوان وأنماط نسيج وبوردرات وخيارات تطريز وتغليف بعلامة تجارية خاصة.',
    image: towelsImage,
  },
  {
    name: 'Bathmats',
    description:
      'We manufacture bathmats in various sizes, weights, textures, colors, weaving styles, backing options, and finishing details for retail and hospitality collections.',
    arName: 'دواسات حمام',
    arDescription:
      'نصنع دواسات حمام بمقاسات وأوزان وملمس وألوان وأنماط نسيج وخيارات ظهر وتشطيبات مختلفة لمجموعات التجزئة والضيافة.',
    image: bathmatImage,
  },
  {
    name: 'Bathrobes',
    description:
      'We produce bathrobes in multiple fabrics, weights, sizes, colors, collar styles, pocket placements, belt designs, and custom branding options.',
    arName: 'بشاكير',
    arDescription:
      'ننتج بشاكير بخامات وأوزان ومقاسات وألوان وأنماط ياقة ومواقع جيوب وتصميمات أحزمة وخيارات علامة تجارية مخصصة.',
    image: bathrobesImage,
  },
  {
    name: 'Throws',
    description:
      'We manufacture throws in different fabrics, textures, weights, sizes, colors, patterns, edge finishes, and packaging styles for home, retail, and seasonal collections.',
    arName: 'ثروهات',
    arDescription:
      'نصنع ثروهات بخامات وملمس وأوزان ومقاسات وألوان ونقشات وتشطيبات أطراف وخيارات تغليف مختلفة لمجموعات المنزل والتجزئة والمواسم.',
    image: throwsImage,
  },
  {
    name: 'Blankets',
    description:
      'We produce blankets in a wide range of materials, weights, sizes, warmth levels, textures, colors, patterns, and finishing options.',
    arName: 'بطاطين',
    arDescription:
      'ننتج بطاطين بمجموعة واسعة من الخامات والأوزان والمقاسات ودرجات الدفء والملمس والألوان والنقشات وخيارات التشطيب.',
    image: blanketsImage,
  },
  {
    name: 'Bedspreads',
    description:
      'We manufacture bedspreads in various fabrics, sizes, stitching styles, colors, patterns, finishes, and coordinated set options for retail and hospitality use.',
    arName: 'مفارش سرير',
    arDescription:
      'نصنع مفارش سرير بخامات ومقاسات وأنماط خياطة وألوان ونقشات وتشطيبات وخيارات أطقم متناسقة للاستخدام في التجزئة والفنادق.',
    image: bedspreadsImage,
  },
  {
    name: 'Bed Skirts',
    description:
      'We produce bed skirts in different drop lengths, fabrics, colors, pleat styles, sizes, and custom constructions to suit hotel, retail, and private label needs.',
    arName: 'كشكشة سرير',
    arDescription:
      'ننتج كشكشة سرير بأطوال وخامات وألوان وأنماط كسرات ومقاسات وتصميمات مخصصة لتناسب احتياجات الفنادق والتجزئة والعلامات التجارية الخاصة.',
    image: bedSkirtsImage,
  },
];

export const productNames = productRange.map((product) => product.name);
export const arProductNames = productRange.map((product) => product.arName);

export const fullProductSentence =
  'We manufacture fitted sheets, flat sheets, duvet covers, pillowcases, pillows, cushions, duvets, comforters, quilts, mattresses, mattress toppers, mattress protectors, pillow protectors, towels, bathmats, bathrobes, throws, blankets, bedspreads, and bed skirts.';

export const arFullProductSentence =
  'نصنع ملايات استك، ملايات فلات، أكياس لحاف، أكياس مخدات، مخدات وخدديات، ألحفة، كومفورترات، كويلتات، مراتب، مراتب تطرية، واقيات مراتب، واقيات مخدات، مناشف، دواسات حمام، بشاكير، ثروهات، بطاطين، مفارش سرير، وكشكشة سرير.';
