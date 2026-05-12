import { motion } from "motion/react";
import AnimatedSection from "../components/ui/AnimatedSection";
import GoldDivider from "../components/ui/GoldDivider";
import { team } from "../data/team";

export default function Team() {
  return (
    <div className="pt-32 flex flex-col w-full">
      {/* Hero Section */}
      <section className="pb-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary mb-6 italic">Notre Équipe</h1>
            <p className="text-gold text-lg md:text-xl font-serif italic mb-8">
              Des experts engagés au service des PME africaines
            </p>
            <GoldDivider className="mx-auto" />
          </AnimatedSection>
        </div>
      </section>

      {/* Team Members List */}
      <section className="flex flex-col border-t border-border-subtle">
        {team.map((member, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={member.id}
              className={`min-h-[600px] flex items-center border-b border-border-subtle overflow-hidden relative ${
                isEven ? "bg-bg-secondary" : "bg-bg-primary"
              }`}
            >
              <div className="max-w-7xl mx-auto w-full px-6 py-20">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isEven ? "lg:flex-row-reverse" : ""}`}>
                  {/* Photo Side */}
                  <AnimatedSection 
                    className={`relative aspect-square md:aspect-auto md:h-[600px] group ${isEven ? "lg:order-2" : "lg:order-1"}`}
                    delay={0.1}
                  >
                    <div className="absolute inset-0 border border-gold/20 -m-4 group-hover:-m-6 transition-all duration-500" />
                    <div className="relative h-full overflow-hidden border border-border-subtle flex items-center justify-center bg-bg-card">
                       <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </AnimatedSection>

                  {/* Info Side */}
                  <AnimatedSection 
                    className={`${isEven ? "lg:order-1" : "lg:order-2"}`}
                    delay={0.3}
                  >
                    <div className="flex flex-col gap-6">
                      {member.badge && (
                        <span className="inline-block px-4 py-1 bg-gold-dim text-gold border border-gold/30 text-xs font-bold uppercase tracking-widest self-start">
                          {member.badge}
                        </span>
                      )}
                      <div>
                        <h2 className="text-4xl md:text-5xl font-serif text-text-primary italic mb-2 tracking-wide">
                          {member.name}
                        </h2>
                        <h3 className="text-gold-light font-sans font-medium uppercase tracking-[0.2em] text-sm">
                          {member.role}
                        </h3>
                      </div>
                      
                      <div className="h-px w-20 bg-gold/50 my-2" />

                      <p className="text-text-secondary text-lg leading-relaxed font-light italic">
                        {member.bio}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {member.chips.map((chip) => (
                          <span
                            key={chip}
                            className="px-3 py-1 bg-bg-card border border-border-subtle text-text-muted text-[10px] uppercase tracking-wider rounded-sm hover:border-gold/50 hover:text-gold transition-all"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Join the team CTA if applicable */}
      <section className="py-24 bg-gold-dim text-center">
        <div className="max-w-4xl mx-auto px-6">
           <AnimatedSection>
              <h2 className="text-4xl font-serif italic text-text-primary mb-6">Rejoignez l'Aventure</h2>
              <p className="text-text-secondary italic mb-10">
                Vous partagez nos valeurs et souhaitez contribuer à l'essor des PME africaines ? 
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gold text-bg-primary font-bold uppercase tracking-widest hover:bg-gold-light transition-all"
              >
                Voir nos opportunités
              </motion.button>
           </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
