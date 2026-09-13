import { Botanical } from './Botanical';
import { ParallaxLayer } from './ParallaxLayer';
import { Reveal } from './Reveal';
import { TravelIcon } from './TravelIcon';

type Tag = 'beach' | 'nature' | 'adventure' | 'wildlife' | 'water' | 'culture' | 'food' | 'road';

const TAG_LABEL: Record<Tag, string> = {
  beach: 'Beaches',
  nature: 'Nature',
  adventure: 'Adventure',
  wildlife: 'Wildlife',
  water: 'Snorkelling & Diving',
  culture: 'Culture',
  food: 'Food',
  road: 'Road Trip',
};

function TagPill({ tag }: { tag: Tag }) {
  return (
    <span className="holiday-tag">
      <TravelIcon variant={tag} className="holiday-tag__icon" />
      {TAG_LABEL[tag]}
    </span>
  );
}

type Highlight = {
  name: string;
  body: string;
  tags: Tag[];
};

const BOHOL_HIGHLIGHTS: Highlight[] = [
  {
    name: 'Panglao Island & Alona Beach',
    body:
      'Powder-soft sand and clear turquoise water, right next door to the wedding. Alona Beach is the liveliest stretch, lined with restaurants for lazy dinners before or after the big day.',
    tags: ['beach', 'water'],
  },
  {
    name: 'Chocolate Hills',
    body:
      "One of the Philippines' most famous sights: over a thousand grass-covered hills rolling to the horizon. An easy, unforgettable day trip from Panglao.",
    tags: ['nature'],
  },
  {
    name: 'Philippine Tarsier Sanctuary',
    body:
      "Meet one of the world's smallest primates in a protected patch of forest. Gentle, quiet, and a favourite with everyone who visits.",
    tags: ['wildlife'],
  },
  {
    name: 'Loboc River',
    body:
      'A slow river cruise through jungle-green countryside, with lunch on the water and stops for local music along the banks.',
    tags: ['nature', 'food'],
  },
  {
    name: 'Balicasag Island',
    body:
      'A short boat ride out for some of the best snorkelling and diving in the region, with sea turtles a regular sight just off the reef.',
    tags: ['water', 'adventure'],
  },
  {
    name: 'Anda',
    body:
      "Bohol's quieter side. Fewer crowds, wilder beaches, and a slower pace if you'd rather unwind than sightsee.",
    tags: ['beach'],
  },
];

type Destination = {
  name: string;
  tagline: string;
  days: string;
  optional?: boolean;
  highlights: Highlight[];
};

const DESTINATIONS: Destination[] = [
  {
    name: 'Cebu',
    tagline: 'If you have a few extra days',
    days: '2–4 days',
    highlights: [
      {
        name: 'Cebu City',
        body:
          "History, food, and city energy. See Magellan's Cross and the Basilica Minore del Santo Niño, then spend the evening on the restaurants and nightlife the city is known for.",
        tags: ['culture', 'food'],
      },
      {
        name: 'Moalboal',
        body:
          "Home to the incredible sardine run, a shimmering wall of fish you can snorkel right alongside. A favourite for anyone chasing marine life and adventure.",
        tags: ['water', 'adventure'],
      },
      {
        name: 'Kawasan Falls, Badian',
        body:
          'Turquoise waterfalls tucked into tropical jungle, with canyoneering on offer for the more adventurous among you.',
        tags: ['nature', 'adventure'],
      },
      {
        name: 'Oslob',
        body:
          "A popular coastal stop and easy day trip. If wildlife encounters are on your list here, we'd just say: do a little research on current tour practices before booking.",
        tags: ['culture'],
      },
    ],
  },
  {
    name: 'Siquijor',
    tagline: 'For something slower and quieter',
    days: '2–3 days',
    highlights: [
      {
        name: 'Cambugahay Falls',
        body: 'Tiered turquoise pools made for swinging off a rope swing into the water below.',
        tags: ['water', 'nature'],
      },
      {
        name: 'Paliton Beach',
        body: 'White sand, impossibly clear water, and some of the best sunsets on the island.',
        tags: ['beach'],
      },
      {
        name: 'Salagdoong Beach',
        body: "A scenic coastal spot with clear water and cliffside jumping points if you're feeling brave.",
        tags: ['beach', 'adventure'],
      },
      {
        name: 'An island road trip',
        body:
          'Rent a scooter or hire a local driver and circle the island at your own pace. Siquijor rewards guests who want to slow all the way down.',
        tags: ['road'],
      },
    ],
  },
];

const DUMAGUETE: Destination = {
  name: 'Dumaguete',
  tagline: 'Optional — for the extra curious',
  days: '1–2 days',
  optional: true,
  highlights: [
    {
      name: 'Rizal Boulevard & the city',
      body:
        'A relaxed university-city atmosphere, a lovely seafront boulevard for evening walks, and an easy gateway to nearby Apo Island.',
      tags: ['culture'],
    },
  ],
};

type Itinerary = {
  length: string;
  route: string;
};

const ITINERARIES: Itinerary[] = [
  { length: '3–4 days', route: 'Bohol only — Panglao, Chocolate Hills, Loboc, island hopping' },
  { length: '5–7 days', route: 'Bohol + Cebu — Cebu, Moalboal, then Panglao and Chocolate Hills' },
  { length: '7–10 days', route: 'Bohol + Siquijor — Panglao, Chocolate Hills, then Cambugahay Falls' },
  { length: '10+ days', route: 'The full loop — Cebu, Bohol, Siquijor, and Dumaguete' },
];

function HighlightCard({ highlight, delay }: { highlight: Highlight; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="holiday-highlight">
        <h4 className="holiday-highlight__name">{highlight.name}</h4>
        <p className="holiday-highlight__body">{highlight.body}</p>
        <div className="holiday-highlight__tags">
          {highlight.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function DestinationCard({ destination, delay }: { destination: Destination; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className={`holiday-dest ${destination.optional ? 'holiday-dest--optional' : ''}`}>
        <div className="holiday-dest__head">
          <div>
            <h3 className="holiday-dest__name">{destination.name}</h3>
            <p className="holiday-dest__tagline">{destination.tagline}</p>
          </div>
          <span className="holiday-dest__days">{destination.days}</span>
        </div>

        <div className="holiday-dest__highlights">
          {destination.highlights.map((h) => (
            <div className="holiday-dest__highlight" key={h.name}>
              <h4>{h.name}</h4>
              <p>{h.body}</p>
              <div className="holiday-highlight__tags">
                {h.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function HolidaySection() {
  return (
    <section className="holiday" id="holiday">
      <ParallaxLayer speed={0.1} className="holiday__bloom">
        <Botanical variant="bloom" className="botanical" />
      </ParallaxLayer>

      <div className="holiday__inner">
        <Reveal>
          <p className="eyebrow eyebrow--center">Make a holiday of it</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="holiday__heading">
            Since you're travelling all this way for us, why not turn it into a holiday?
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="holiday__lede">
            The Philippines has some of the most beautiful islands in the world, and Bohol is
            just the beginning. Here are a few of our favourite places nearby, worth exploring
            before or after the wedding.
          </p>
        </Reveal>

        {/* Bohol: the featured destination, visually larger than the rest */}
        <Reveal delay={0.25}>
          <div className="holiday-bohol">
            <div className="holiday-bohol__head">
              <span className="holiday-bohol__eyebrow">Where we're getting married</span>
              <h3 className="holiday-bohol__name">Bohol</h3>
              <p className="holiday-bohol__body">
                Our island, and the natural place to start. Beaches, hills, rivers, and reefs,
                all within an easy drive of each other.
              </p>
            </div>

            <div className="holiday-bohol__grid">
              {BOHOL_HIGHLIGHTS.map((h, i) => (
                <HighlightCard key={h.name} highlight={h} delay={0.05 * i} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Cebu and Siquijor */}
        <div className="holiday-dest-grid">
          {DESTINATIONS.map((d, i) => (
            <DestinationCard key={d.name} destination={d} delay={0.1 * i} />
          ))}
        </div>

        {/* Dumaguete, smaller and optional */}
        <div className="holiday-dest-grid holiday-dest-grid--single">
          <DestinationCard destination={DUMAGUETE} delay={0} />
        </div>

        {/* Suggested itineraries */}
        <Reveal delay={0.1}>
          <div className="holiday-itineraries">
            <h3 className="holiday-itineraries__heading">A few ways to combine it all</h3>
            <div className="holiday-itineraries__list">
              {ITINERARIES.map((it) => (
                <div className="holiday-itinerary" key={it.length}>
                  <span className="holiday-itinerary__length">{it.length}</span>
                  <span className="holiday-itinerary__route">{it.route}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="holiday__note">
            Travel times and ferry schedules can change, so please check the latest schedules
            before booking.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
