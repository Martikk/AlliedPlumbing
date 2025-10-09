import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

type Member = {
  name: string;
  role: string;
  image: string;
  href?: string;
  linkedin?: string;
  email?: string;
};

const team: Member[] = [
  {
    name: 'Ethan Miller',
    role: 'Chief Structural Engineer',
    image: 'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760038738/Allied/IMG_1095_ptva4x.jpg',
    linkedin: '#',
    email: '#',
  },
  {
    name: 'Isabell Garcia',
    role: 'Senior Project Manager',
    image: 'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760038738/Allied/IMG_1095_ptva4x.jpg',
    linkedin: '#',
    email: '#',
  },
  {
    name: 'Liam Chen',
    role: 'Lead Site Supervisor',
    image: 'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760038738/Allied/IMG_1095_ptva4x.jpg',
    linkedin: '#',
    email: '#',
  },
];

export default function TeamSection() {
  return (
    <section className="relative bg-[#f6fafd] rounded-3xl px-5 py-12 md:px-8 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="tracking-[0.2em] text-xs font-semibold text-slate-500 mb-2">
              OUR TEAM
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Meet Our Team
            </h2>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-100 px-4 py-2 font-semibold text-sm transition"
          >
            View all <span className="ml-2">↗</span>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          {team.map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="
                group relative w-[270px] aspect-[4/5]
                [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]
                overflow-hidden rounded-[1.25rem] shadow-md bg-white
                hover:shadow-xl transition-shadow duration-300
              "
            >
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

              {/* bottom content */}
              <div className="absolute bottom-0 left-0 w-full p-5 z-10 text-white">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm opacity-90">{member.role}</p>
                <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer">
                      <FaLinkedinIn className="text-white/90 hover:text-white text-lg" />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`}>
                      <FaEnvelope className="text-white/90 hover:text-white text-lg" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}