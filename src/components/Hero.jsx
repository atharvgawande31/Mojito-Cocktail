import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useMediaQuery } from "react-responsive";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

// Register plugins
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const Hero = () => {
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    // SPLIT & ANIMATE HEADINGS
    const heroSplit = new SplitText(".title", { type: "chars,words" });
    const paraSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: 0.05,
    });

    gsap.from(paraSplit.lines, {
      opacity: 0,
      duration: 1.8,
      yPercent: 100,
      ease: "expo.out",
      stagger: 0.05,
      delay: 1,
    });

    // LEAF ANIMATION
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    // VIDEO SCROLLTRIGGER
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";
    // const smallVal = isMobile ? "150% top" : "bottom top";
    const video = videoRef.current;

    function createVideoScrollTimeline() {
      gsap.to(video, {
        currentTime: video.duration || 10,
        ease: "none",
        scrollTrigger: {
          trigger: video,
          start: startValue,
          end: endValue,
          scrub: true,
        },

       scale: isMobile ? 0.6 : 0.8
      });
    }

    if (video.readyState >= 1) {
      createVideoScrollTimeline();
    } else {
      video.addEventListener("loadedmetadata", createVideoScrollTimeline, {
        once: true,
      });
    }

    // CLEANUP
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (video)
        video.removeEventListener("loadedmetadata", createVideoScrollTimeline);
      // revert SplitText (optional, requires SplitText revert API)
      if (heroSplit && heroSplit.revert) heroSplit.revert();
      if (paraSplit && paraSplit.revert) paraSplit.revert();
    };
  }, [isMobile]);

  return (
    <>
      <section id="hero" className="noisy" style={{ position: "absolute" }}>
        <h1 className="title">MOJITO</h1>
        <img
          src="/images/hero-left-leaf.png"
          className="left-leaf"
          alt=""
          style={{ position: "absolute", left: 0, top: 0 }}
        />
        <img
          src="/images/hero-right-leaf.png"
          className="right-leaf"
          alt=""
          style={{ position: "absolute", right: 0, top: 0 }}
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool, Crisp, Classic</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
      {/* Video below the hero */}
      <div style={{ position: "fixed", width: "100%", height: "100vh" }}>
        <video
          className="video absolute inset-0 "
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          preload="auto"
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div style={{ height: "120vh" }} />{" "}
      {/* Extra space after video for scrolling */}
    </>
  );
};

export default Hero;
