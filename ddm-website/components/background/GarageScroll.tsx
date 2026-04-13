"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsTouchDevice } from "@/lib/hooks/useIsTouchDevice";

const GARAGE_IMAGES = [
  { src: "/images/garage/ferrari-f8.jpg", alt: "Ferrari F8 Tributo" },
  { src: "/images/garage/porsche-911-rear.jpg", alt: "Porsche 911" },
  { src: "/images/garage/bmw-ix3.jpg", alt: "BMW iX3" },
  { src: "/images/garage/lambo-aventador.jpg", alt: "Lamborghini Aventador" },
  { src: "/images/garage/mclaren-wheel.jpg", alt: "McLaren detail" },
  { src: "/images/garage/gt3rs-showroom.jpg", alt: "Porsche GT3 RS" },
  { src: "/images/garage/dodge-challenger.jpg", alt: "Dodge Challenger" },
  { src: "/images/garage/supercar-showroom.jpg", alt: "Supercar showroom" },
  { src: "/images/garage/porsche-gt2.jpg", alt: "Porsche GT2" },
  { src: "/images/garage/mclaren-artura.jpg", alt: "McLaren Artura" },
  { src: "/images/garage/ferrari-classic.jpg", alt: "Ferrari classic" },
  { src: "/images/garage/mercedes-rear.jpg", alt: "Mercedes rear" },
  { src: "/images/garage/porsche-headlights.jpg", alt: "Porsche headlights" },
  { src: "/images/garage/bmw-angeleyes.png", alt: "BMW angel eyes" },
];

// On mobile, show fewer images for performance
const MOBILE_COUNT = 6;

export default function GarageScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const images = isTouch ? GARAGE_IMAGES.slice(0, MOBILE_COUNT) : GARAGE_IMAGES;

  useEffect(() => {
    if (reducedMotion || !containerRef.current || !stripRef.current) return;

    const strip = stripRef.current;
    const imageEls = strip.querySelectorAll<HTMLElement>("[data-garage-img]");

    // Parallax: scroll the strip at ~15% of page speed
    const parallaxTween = gsap.to(strip, {
      yPercent: isTouch ? 0 : -15,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    // Set initial opacity to 0, then fade each image as page scrolls
    // We use the document scroll position mapped to each image's index
    const imgTweens: gsap.core.Tween[] = [];
    const totalImages = imageEls.length;
    imageEls.forEach((el, i) => {
      // Each image fades in during its portion of the total scroll
      const startPct = Math.max(0, (i - 0.5) / totalImages);
      const endPct = Math.min(1, (i + 1) / totalImages);
      const tween = gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 0.15,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: document.documentElement,
            start: `${startPct * 100}% top`,
            end: `${endPct * 100}% top`,
            scrub: true,
          },
        }
      );
      imgTweens.push(tween);
    });

    return () => {
      parallaxTween.kill();
      imgTweens.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((st) => {
        const trigger = st.vars?.trigger;
        if (trigger === document.documentElement) {
          st.kill();
        }
      });
    };
  }, [reducedMotion, isTouch]);

  // Reduced motion: show a single static faded image
  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: 0.03,
            filter: "brightness(0.4)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={GARAGE_IMAGES[0].src}
            alt=""
            className="w-1/2 h-auto object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <div
        ref={stripRef}
        className="will-change-transform"
        style={{
          // Make the strip tall enough so parallax has room
          height: `${images.length * 45}vh`,
          position: "relative",
        }}
      >
        {images.map((img, i) => {
          const isLeft = i % 2 === 0;

          return (
            <div
              key={img.src}
              data-garage-img
              className="absolute"
              style={{
                // Stagger vertically
                top: `${i * (100 / images.length)}%`,
                // Zigzag: left or right
                left: isLeft ? "3%" : undefined,
                right: isLeft ? undefined : "3%",
                width: "40vw",
                maxWidth: "600px",
                opacity: 0,
                filter: "brightness(0.6)",
                // Radial fade mask — soft edges, no hard borders
                maskImage:
                  "radial-gradient(ellipse 80% 80% at center, black 40%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 80% at center, black 40%, transparent 100%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
