import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env FIRST
config({ path: resolve(process.cwd(), '.env') });

const sampleGifts = [
  {
    title: 'Une tasse de café thermos',
    image_link: 'https://i.ibb.co/nN6VJXkJ/391a1883-1bf5-4c05-9470-4eafd17ab9a9.png',
    image_alt: 'Tasse de café',
    thumb_url: 'https://i.ibb.co/TxkrwBgz/tasse.png',
    message: "Pour que tu ne manques jamais de ta source principale d'énergie",
    love_surname: 'mon drogué à la caféine',
    opened: false,
    order: 1,
    slug: 'tasse-de-cafe',
  },
  {
    title: 'Une paire de palmes',
    image_link: 'https://i.ibb.co/QvMsrM6B/8c122c79-fcc6-47fd-ac66-3b473c361991.png',
    image_alt: 'Paire de palmes',
    thumb_url: 'https://i.ibb.co/0kKDzz8/palmes.png',
    message: "Parce qu'il te manque que les nageoires pour tout plaquer et partir vivre sous l'eau",
    love_surname: 'mon triton',
    opened: false,
    order: 2,
    slug: 'paire-de-palmes',
  },
  {
    title: 'Un masque de plongée',
    image_link: 'https://i.ibb.co/DgfWxy4N/f6196785-6487-4ffb-a7aa-495696752c7e.png',
    image_alt: 'Masque de plongée',
    thumb_url: 'https://i.ibb.co/rGqGD4gT/masque.png',
    message: 'Pour que tu fasses les yeux doux aux poissons',
    love_surname: 'mon congre de méditerranée',
    opened: false,
    order: 3,
    slug: 'masque-de-plongee',
  },
  {
    title: 'Un tuba de plongée',
    image_link: 'https://i.ibb.co/ZpKBfYtR/7b39fed8-a153-47ca-a640-2a8744502f64.png',
    image_alt: 'Tuba de plongée',
    thumb_url:
      'https://contents.mediadecathlon.com/p1315201/k$1881ab248af810f440ebd23e33cb04da/sq/tuba-chasse-sous-marine-en-apnee-souple-spf-500.jpg?format=auto&f=1200x1200',
    message: "Parce que respirer c'est pratique, et je te préfère vivant",
    love_surname: 'mon amphibien préféré',
    opened: false,
    order: 4,
    slug: 'tuba-de-plongee',
  },
  {
    title: 'Un livre sur les poissons de méditerrannée',
    image_link: 'https://i.ibb.co/Lhndntgw/24fe4a12-48a8-4dab-9bb7-4010863ac1d0.png',
    image_alt: 'Livre sur les poissons de méditerrannée',
    thumb_url: 'https://i.ibb.co/Vct1X3Lm/livre.png',
    message: "Pour reconnaître toutes les dingueries que tu me montres sous l'eau",
    love_surname: 'mon naturaliste passionné',
    opened: false,
    order: 5,
    slug: 'livre-sur-poissons',
  },
  {
    title: 'Une casquette',
    image_link: 'https://i.ibb.co/dymb2tL/6b07dbbf-83f2-4a25-8050-bad0d8a7b0c4.png',
    image_alt: 'Casquette',
    thumb_url:
      'https://contents.mediadecathlon.com/p2675174/k$30fd335dc34b5fcf9b96ede22f7f4f10/sq/casquette-de-trekking-voyage-travel-100-bleu-marine.jpg?format=auto&f=1200x1200',
    message: 'Pour conserver au frais toutes les futurs articles banger du CT',
    love_surname: 'mon génie',
    opened: false,
    order: 6,
    slug: 'casquette',
  },
  {
    title: 'Une paire de tongs',
    image_link: 'https://i.ibb.co/vFdCMxs/0d3c8d7c-152f-4ec1-845e-822200289e9a.png',
    image_alt: 'Tongs',
    thumb_url:
      'https://contents.mediadecathlon.com/p2829935/k$90ef58511b1a4ee5861edce6760b90b6/sq/tongs-homme-500-camel.jpg?format=auto&f=1200x1200',
    message: 'Parce que je veux récupérer les miennes... Et oui, ChatGPT a fait son max',
    love_surname: 'mon indien dans la ville',
    opened: false,
    order: 7,
    slug: 'paire-de-tongs',
  },
  {
    title: 'Un couteau suisse',
    image_link: 'https://i.ibb.co/PvvGcT3s/001daf35-c646-44bb-9349-de3ce2072b19.png',
    image_alt: 'Couteau suisse',
    thumb_url: 'https://i.ibb.co/TQ9xQL7/victorinox.png',
    message: "Pour l'amour d'une bouteille de vin ou d'un saucisson aux tranches fines",
    love_surname: 'mon fin gourmet',
    opened: false,
    order: 8,
    slug: 'couteau-suisse',
  },
  {
    title: 'Une bouteille de Malbec',
    image_link: 'https://i.ibb.co/7xh6KN9K/vin.png',
    image_alt: 'Bouteille de Malbec',
    thumb_url: 'https://i.ibb.co/m5Rf65dF/vin.png',
    message: 'Parce que les plaisirs les plus simples sont les meilleurs',
    love_surname: 'mon épicurien',
    opened: false,
    order: 9,
    slug: 'bouteille-de-malbec',
  },
  {
    title: 'Un débardeur',
    image_link: 'https://i.ibb.co/HLqts2Pv/478bae96-2ba0-489c-b65b-62e937c102b0.png',
    image_alt: 'Débardeur',
    thumb_url: 'https://i.ibb.co/BHskxqm8/tshirt.png',
    message: "Parce qu'il faut tenir la réputation sur le CT",
    love_surname: 'mon steve jobs',
    opened: false,
    order: 10,
    slug: 'debardeur',
  },
  {
    title: 'Un masque de nuit',
    image_link: 'https://i.ibb.co/k2hWzNkC/b63029e6-ccbd-4475-850a-fe55e1d7ae43.png',
    image_alt: 'Masque de nuit',
    thumb_url: 'https://i.ibb.co/pBzpZWPT/masque.png',
    message: "Pour les grasses mat' en plein bivouac",
    love_surname: 'mon marmotton',
    opened: false,
    order: 11,
    slug: 'masque-de-nuit',
  },
  {
    title: 'Une boule de pof',
    image_link: 'https://i.ibb.co/Kcc9f8cZ/0cafab4f-b482-4b0a-bd34-41e00ebf7d38.png',
    image_alt: 'Boule de pof',
    thumb_url: 'https://i.ibb.co/mrBbXXD8/pf.png',
    message: 'Pour que tu ne lâches jamais prise',
    love_surname: 'mon roi du mur',
    opened: false,
    order: 12,
    slug: 'boule-de-pof',
  },
  {
    title: 'Deux supports de téléphone pour ta moto',
    image_link: 'https://i.ibb.co/Rk6FHzn3/537146b6-db6a-4029-86cb-9e2194940e00.png',
    image_alt: 'Support de téléphone pour moto',
    thumb_url: 'https://i.ibb.co/4ZjpLTyw/telsup.png',
    message: 'Un pour maintenant. Un pour plus tard. (Et oui, je fais de la moto en short)',
    love_surname: 'mon motard connecté',
    opened: false,
    order: 13,
    slug: 'support-telephone-moto',
  },
  {
    title: 'Un couteau suisse pour tortue géniale',
    image_link: 'https://i.ibb.co/zTFpSpSD/3864462a-5898-438a-ab12-29776c929467.png',
    image_alt: 'Couteau suisse pour moto',
    thumb_url: 'https://i.ibb.co/SXzK4460/couteaumoto.png',
    message: 'Pour partir en weekend avec notre mojo de fous',
    love_surname: 'mon mécano de fortune',
    opened: false,
    order: 14,
    slug: 'couteau-suisse-moto',
  },
  {
    title: 'Des autocollants pour casque de moto',
    image_link: 'https://i.ibb.co/0VXPj1qR/54c3d3f0-ff7b-4a94-a1e3-f65acd72a9e7.png',
    image_alt: 'Autocollants pour casque de moto',
    thumb_url: 'https://i.ibb.co/95dtgG2/casque.png',
    message: "Parce que c'est 135 euros d'amende et trois points",
    love_surname: 'mon fan de tuning légal',
    opened: false,
    order: 15,
    slug: 'autocollants-casque-moto',
  },
  {
    title: 'Un petit jeu de carte spicy',
    image_link: 'https://i.ibb.co/8Dx58HSj/a74f84ea-8e71-43ac-adeb-d5eccc222df4.png',
    image_alt: 'Un petit jeu de carte spicy',
    thumb_url: 'https://i.ibb.co/d4bdd0YM/cartes.png',
    message: 'En espérant que tu ne sois pas trop mauvais perdant',
    love_surname: 'my loverboy',
    opened: false,
    order: 16,
    slug: 'jeu-de-carte-spicy',
  },
  {
    title: 'Un portefeuille en cuir',
    image_link: 'https://i.ibb.co/M5Rt8rry/90ebb389-e0fe-42ab-acad-782dff2b8a56.png',
    image_alt: 'Un portefeuille en cuir',
    thumb_url: 'https://i.ibb.co/Gvkgjy98/portefeuille.png',
    message: "Parce qu'on va pas attendre d'être blindés pour avoir la classe",
    love_surname: 'mon self-made man',
    opened: false,
    order: 17,
    slug: 'portefeuille-en-cuir',
  },
  {
    title: 'Une paire de jumelles de voyage',
    image_link: 'https://i.ibb.co/4ZBBStS1/41d73102-fbca-46e2-a096-33f740ed0b02.png',
    image_alt: 'Une paire de jumelles de voyage',
    thumb_url: 'https://i.ibb.co/DgLvTFS3/jumelles.png',
    message:
      "La légende dit que si tu regardes dedans en haut d'un relais, tu peux apercevoir une Léa sauvage",
    love_surname: 'ma sentinelle',
    opened: false,
    order: 18,
    slug: 'jumelles-de-voyage',
  },
  {
    title: 'Un bloque disque pour ta moto',
    image_link: 'https://i.ibb.co/JWz3wfVW/antivol.png',
    image_alt: 'Un bloque disque pour ta moto',
    thumb_url: 'https://i.ibb.co/N2CpgcL5/bloque.png',
    message: "Parce qu'une moto c'est bien, deux motos c'est mieux.",
    love_surname: 'mon insouciant',
    opened: false,
    order: 19,
    slug: 'bloque-disque-moto',
  },
  {
    title: 'Une lampe torche de plongée',
    image_link: 'https://i.ibb.co/CFxH7Dw/lampe.png',
    image_alt: 'Lampe torche de plongée',
    thumb_url: 'https://i.ibb.co/5gWRHMpZ/lampe.png',
    message: 'Gui, il va faire tout noir',
    love_surname: 'mon explorateur sous-marin',
    opened: false,
    order: 20,
    slug: 'lampe-torche-plongee',
  },
  {
    title: 'Une manette de jeu xbox',
    image_link: 'https://i.ibb.co/RGt5Q69c/manette.png',
    image_alt: 'Une manette de jeu xbox',
    thumb_url: 'https://i.ibb.co/WpWkq3vZ/manette.png',
    message: 'Parce que les squelettes squattent',
    love_surname: 'mon gamer',
    opened: false,
    order: 21,
    slug: 'manette-de-jeu-xbox',
  },
  {
    title: 'Une base de béquille',
    image_link: 'https://i.ibb.co/672gVnsj/b-quille.png',
    image_alt: 'Une base de béquille',
    thumb_url: 'https://i.ibb.co/nNDqNtFw/bequille.png',
    message: 'On est sur une base de trail/ultra-trail avec ça',
    love_surname: 'mon équilibriste',
    opened: false,
    order: 22,
    slug: 'base-de-bequille',
  },
  {
    title: 'Un petit sac à savon',
    image_link: 'https://i.ibb.co/dwkgcQtb/ed210b3d-3309-4805-87bf-88b57bd2a547.png',
    image_alt: 'Un petit sac à savon',
    thumb_url: 'https://i.ibb.co/KjwnH8h1/savon.png',
    message: "Parce que même si j'adore ton odeur, parfois ça fait du bien une douche",
    love_surname: 'mon raton laveur',
    opened: false,
    order: 23,
    slug: 'sac-a-savon',
  },
  {
    title: 'Un porte-clés bluetooth',
    image_link: 'https://i.ibb.co/CKKd5Lvn/porte-cl-s.png',
    image_alt: 'Un porte-clés bluetooth',
    thumb_url: 'https://i.ibb.co/ZRcVcy3z/bluetooth.png',
    message: "Parce que chercher des clés à 6h30 du mat' n'a jamais fait partie de mes passions",
    love_surname: 'mon organisé',
    opened: false,
    order: 24,
    slug: 'porte-cles-bluetooth',
  },
  {
    title: 'Un petit antivol pour tes accessoires de moto',
    image_link: 'https://i.ibb.co/Vcr4gxKT/antivolcasque-1.png',
    image_alt: 'Un petit antivol',
    thumb_url: 'https://i.ibb.co/rKBwhk8v/antivol.png',
    message: 'Pour ton casque, ta veste, ta chasteté',
    love_surname: 'mon équipé',
    opened: false,
    order: 25,
    slug: 'petit-antivol',
  },
  {
    title: 'Des vêtements de pluie moto',
    image_link: 'https://i.ibb.co/RGrGwrk5/pluiejojo.png',
    image_alt: 'Des vêtements de pluie moto',
    thumb_url: 'https://i.ibb.co/gMyYNwPW/pluie.png',
    message: "Parce qu'il n'y a que moi qui ai le droit de mouiller",
    love_surname: "mon motard d'eau douce",
    opened: false,
    order: 26,
    slug: 'vêtements-de-pluie-moto',
  },
  {
    title: 'Un fufu',
    image_link: 'https://i.ibb.co/23dtkkmY/fufu.png',
    image_alt: 'Un fufu',
    thumb_url: 'https://i.ibb.co/VcBBptqw/fufu.png',
    message: "Depuis le temps que tu m'en parles, il est temps d'aller le goûter",
    love_surname: 'mon ghanéen',
    opened: false,
    order: 27,
    slug: 'fufu',
  },
  {
    title: 'Un massage',
    image_link: 'https://i.ibb.co/Lz2mm3wZ/massage.png',
    image_alt: 'Un massage',
    thumb_url: 'https://i.ibb.co/XfpfYxkY/massage.png',
    message: "Parce que j'ai envie de chérir toutes les parties de toi",
    love_surname: 'mon dieu grec',
    opened: false,
    order: 28,
    slug: 'massage',
  },
  {
    title: "30 raisons pour lesquelles je t'aime",
    image_link: 'https://i.ibb.co/WNMGpbJs/amoureux.png',
    image_alt: "30 raisons pour lesquelles je t'aime",
    thumb_url: 'https://i.ibb.co/V04mYDHc/coeur.png',
    message: '<3',
    love_surname: 'mon amoureux',
    opened: false,
    order: 29,
    slug: 'raisons-pour-lesquelles-je-t-aime',
  },
  {
    title: 'Un petit jeu à gratter',
    image_link: 'https://i.ibb.co/4wWStx9x/ticket.png',
    image_alt: 'Un petit jeu à gratter',
    thumb_url: 'https://i.ibb.co/39hRtrZ0/mission.png',
    message: "Parce que vu la chance qu'on a eu de se rencontrer, je pense qu'on peut tout tenter",
    love_surname: 'mon porte-bonheur',
    opened: false,
    order: 30,
    slug: 'un-petit-jeu-a-gratter',
  },
];

// --- shuffle util ---
interface ArrayElement {
  [key: string]: string | number | boolean;
}

function shuffle<T extends ArrayElement>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function seedDatabase() {
  try {
    const { default: dbConnect } = await import('@/lib/mongodb');
    const { default: Gift } = await import('@/models/Gift');

    await dbConnect();

    // Clear existing gifts
    await Gift.deleteMany({});

    // Shuffle based on --shuffle flag
    const shouldShuffle = process.argv.includes('--shuffle');
    let giftsToInsert = [...sampleGifts];

    if (shouldShuffle) {
      giftsToInsert = shuffle(giftsToInsert).map((gift, index) => ({
        ...gift,
        order: index + 1,
      }));
      console.log('⚡ Gifts shuffled!');
    } else {
      giftsToInsert = giftsToInsert.map((gift, index) => ({
        ...gift,
        order: index + 1,
      }));
      console.log('📋 Gifts kept in original order.');
    }

    // Insert sample gifts
    await Gift.insertMany(giftsToInsert);

    console.log('✅ Database seeded successfully!');
    console.log(`Inserted ${giftsToInsert.length} gifts`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };
