import ScrollReveal from './ScrollReveal';

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224543!2d-81.3792!3d28.5383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e773d8fecdbc77%3A0xac3b2dfab370bac4!2sOrlando%2C%20FL!5e0!3m2!1sen!2sus!4v1234567890';

const AREAS = [
  'Downtown Orlando',
  'Winter Park',
  'Lake Nona',
  'Dr. Phillips',
  'Altamonte Springs',
  'Kissimmee',
  'East Orlando',
  'Windermere',
  'College Park',
];

export default function ServiceArea() {
  return (
    <section className="bg-silver px-4 py-24 sm:px-6 sm:py-32" id="service-area">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <p className="section-eyebrow">Service area</p>
            <h2 className="section-heading mt-4">
              Serving Orlando and surrounding areas
            </h2>
            <p className="section-body mt-5">
              We are a local mobile detailing team covering Greater Orlando. Book online and we come to
              your driveway, office, or apartment complex.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {AREAS.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-[#d0d0d0] bg-white px-3 py-1.5 text-sm text-shine-text shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
                >
                  {area}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="overflow-hidden rounded-2xl border border-[#d0d0d0] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <iframe
                title="Shine Mobile Detailing service area — Orlando, FL"
                src={MAP_EMBED_URL}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
