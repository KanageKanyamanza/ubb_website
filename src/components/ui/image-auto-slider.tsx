import React from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
import type { Resource } from "../../context/ResourcesContext";

interface ImageAutoSliderProps {
  items: Resource[];
}

export const ImageAutoSlider = ({ items }: ImageAutoSliderProps) => {
  // Duplicate for seamless infinite loop
  const duplicated = [...items, ...items];

  return (
    <>
      <style>{`
        @keyframes ubb-scroll-right {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ubb-infinite-scroll {
          animation: ubb-scroll-right ${Math.max(items.length * 5, 20)}s linear infinite;
        }
        .ubb-scroll-mask {
          mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .ubb-resource-card:hover .ubb-infinite-scroll {
          animation-play-state: paused;
        }
        .ubb-resource-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ubb-resource-card:hover {
          transform: translateY(-4px);
        }
      `}</style>

      <div className="w-full overflow-hidden">
        <div className="ubb-scroll-mask w-full">
          <div className="ubb-infinite-scroll flex gap-6 w-max py-4">
            {duplicated.map((item, index) => (
              <a
                key={`${item.id}-${index}`}
                href={item.link || undefined}
                target={item.link ? "_blank" : undefined}
                rel={item.link ? "noreferrer" : undefined}
                className={`ubb-resource-card flex-shrink-0 w-72 rounded-xl overflow-hidden border border-border-subtle bg-bg-card shadow-lg relative group ${item.link ? "cursor-pointer" : "cursor-default"}`}
              >
                {/* Image */}
                <div className="relative w-full h-44 overflow-hidden bg-bg-secondary">
                  {item.type === "Formation vidéo" ? (
                    <div className="w-full h-full bg-gradient-to-br from-bg-primary to-bg-secondary flex items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-gold opacity-80" />
                    </div>
                  ) : item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gold/10 to-bg-secondary" />
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/20 to-transparent" />
                </div>

                {/* Card content */}
                <div className="p-5">
                  <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                    {item.type}
                  </span>
                  <h3 className="text-base font-serif text-text-primary mb-2 leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  {item.link && (
                    <span className="inline-flex items-center gap-1 mt-3 text-gold text-[10px] font-bold uppercase tracking-widest">
                      Voir <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Gold bottom border on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
