"use client";

import Image from "next/image";
import resumeText from "./resume-text.json";
import { useEffect, useRef, useState } from "react";

type FieldNote = {
  title: string;
  label: string;
  oneLiner: string;
  color: "blue" | "red" | "gold";
  folder: string;
  artifacts: {
    detail: string;
    label: string;
  }[];
  links: {
    label: string;
    href: string;
  }[];
};

type ResumeMode = "closed" | "opening" | "open" | "full" | "minimized" | "closing";

type WhyCard = {
  title: string;
  note?: string;
  secondLine?: string;
  tone?: "sincere" | "bridge";
};

type WhySlideDirection = "next" | "prev";

type CanArrowGeometry = {
  height: number;
  path: string;
  width: number;
};

type ArtifactMedia =
  | {
      alt: string;
      href?: string;
      objectPosition: string;
      src: string;
      type: "image";
    }
  | {
      ariaLabel: string;
      href?: string;
      src: string;
      poster: string;
      type: "video";
    };

const buoyBirdMedia: ArtifactMedia[] = [
  {
    alt: "Buoy Bird merch booth with an orange bus and shirts",
    objectPosition: "center 72%",
    src: "/portfolio/buoy-bird-photo-1-f2087122.webp",
    type: "image",
  },
  {
    alt: "Clear Lake and Mount Konocti from above at dusk",
    objectPosition: "center",
    src: "/portfolio/buoy-bird-photo-2-289f2e5a.webp",
    type: "image",
  },
  {
    ariaLabel: "Clear Lake community video",
    src: "/clear-lake-context.mp4",
    poster: "/portfolio/clear-lake-context-dae269b3.webp",
    type: "video",
  },
  {
    ariaLabel: "Buoy Bird Cinema by the Shore reel",
    href: "https://www.instagram.com/p/DNjMhHCSgwV/",
    src: "/buoy-bird-cbts-reel.mp4",
    poster: "/portfolio/buoy-bird-cbts-reel-8e75ed86.webp",
    type: "video",
  },
];

const konoctiClimbMedia: (ArtifactMedia | undefined)[] = [
  {
    ariaLabel: "Konocti Climb flyover video",
    src: "/konocti-climb-ai-ascent.mp4#t=2",
    poster: "/portfolio/konocti-climb-ai-ascent-762ca070.webp",
    type: "video",
  },
  {
    ariaLabel: "Konocti Climb race-day operations reel",
    href: "https://www.instagram.com/p/DP1VLnyDi2P/",
    src: "/konocti-climb-reel.mp4",
    poster: "/portfolio/konocti-climb-reel-ca0ca006.webp",
    type: "video",
  },
  {
    alt: "Konocti Climb horizontal logo from the website footer",
    objectPosition: "center",
    src: "/portfolio/konocti-climb-horizontal-card-5a3c288d.webp",
    type: "image",
  },
  {
    alt: "Konocti Climb homepage hero with Mount Konocti at sunset",
    objectPosition: "center",
    src: "/portfolio/konocti-climb-home-cover-22e465ed.webp",
    type: "image",
  },
];

const southOfSoberMedia: ArtifactMedia[] = [
  {
    alt: "South of Sober wordmark on a black background",
    objectPosition: "center",
    src: "/portfolio/south-of-sober-logo-9db5395f.webp",
    type: "image",
  },
  {
    alt: "South of Sober band members posing with guitars and amplifiers at UCLA",
    objectPosition: "center",
    src: "/portfolio/south-of-sober-band-f6567d32.webp",
    type: "image",
  },
  {
    ariaLabel: "South of Sober Battle of the Bands performance clip",
    src: "/south-of-sober-botb.mp4",
    poster: "/portfolio/south-of-sober-botb-f9ac86f7.webp",
    type: "video",
  },
  {
    ariaLabel: "South of Sober Hear You Out performance clip",
    src: "/south-of-sober-hear-you-out.mp4",
    poster: "/portfolio/south-of-sober-hear-you-out-5e4aca0a.webp",
    type: "video",
  },
];

const whyCards: WhyCard[] = [
  {
    title: "I BUILT YOU THIS WEBSITE.",
    note: "So that's gotta count for something.",
  },
  {
    title: "I LIKE A BRAND WITH NOTHING TO HIDE.",
    note: "So I brought the work. And the receipts.",
  },
  {
    title: "I PUT MY RESUME IN A CLAPPERBOARD.",
    note: "Apparently, I take brand consistency pretty seriously.",
  },
  {
    title: "YOU ASKED FOR A RESUME.",
    note: "I may have gotten a little carried away.",
  },
  {
    title: "I'VE SOLD T-SHIRTS OUT OF A VOLKSWAGEN BUS.",
    note: "There's probably a transferable skill in there somewhere.",
  },
  {
    title: "I MAKE THINGS PEOPLE ACTUALLY WANT TO LOOK AT.",
    note: "You're still clicking these.",
  },
  {
    title: "SERIOUSLY, THOUGH.",
    secondLine: "I THINK I'D BE REALLY GOOD AT THIS.",
    tone: "sincere",
  },
  {
    title: "DON'T BELIEVE ME?",
    tone: "bridge",
  },
];

const fieldNotes: FieldNote[] = [
  {
    title: "Buoy Bird",
    label: "local apparel brand / community pride / in-person sales",
    oneLiner:
      "I built Buoy Bird to make Lake County feel worth rallying around: products, Shopify, content, pop-up sales, and free lakeside movie nights under one local brand.",
    color: "blue",
    folder: "/work/buoy-bird/",
    artifacts: [
      {
        label: "Volkswagen bus booth",
        detail: "Sold merch in person at local events, including straight out of the bus.",
      },
      {
        label: "Cinema by the Shore",
        detail:
          "Turned Buoy Bird into five free community movie nights with 1,500+ total attendees.",
      },
      {
        label: "Clear Lake context",
        detail: "The brand was built around local pride, lake life, and giving the town something positive to point at.",
      },
      {
        label: "Shopify + social",
        detail: "Ran the store, products, fulfillment, customer issues, paid ads, and content that reached 350K+ views.",
      },
    ],
    links: [
      { label: "buoybird.shop", href: "https://buoybird.shop" },
      {
        label: "@buoybirdofficial",
        href: "https://www.instagram.com/buoybirdofficial/",
      },
    ],
  },
  {
    title: "Konocti Climb",
    label: "public race / mountain brand / full event system",
    oneLiner:
      "A 5K up Mount Konocti where I owned the visible stuff and the invisible stuff: identity, route flow, volunteers, sponsors, shirts, medals, trophies, promotion, and the website.",
    color: "red",
    folder: "/work/konocti-climb/",
    artifacts: [
      {
        label: "166 first-year racers",
        detail: "Built the participant experience for a new race up Lake County's volcanic landmark.",
      },
      {
        label: "Race-day operations",
        detail: "Mapped parking, shuttles, water stations, summit logistics, volunteers, staffing, and flow.",
      },
      {
        label: "Identity + gear",
        detail: "Designed the visual system, bibs, shirts, medals, trophies, flyers, videos, and social assets.",
      },
      {
        label: "Interactive website",
        detail: "Built a responsive event site with course info, mapping, flyover-style presentation, and custom branding.",
      },
    ],
    links: [
      { label: "konocticlimb.com", href: "https://konocticlimb.com" },
      {
        label: "@lakecountyparksandrec",
        href: "https://www.instagram.com/lakecountyparksandrec/",
      },
    ],
  },
  {
    title: "South of Sober",
    label: "band / original music / artist-manager mode",
    oneLiner:
      "The band is the cleanest version of how I work: write the songs, recruit the people, book the room, build the brand, run the logistics, and still get on stage.",
    color: "gold",
    folder: "/work/south-of-sober/",
    artifacts: [
      {
        label: "Original music",
        detail: "Lead singer, guitarist, songwriter, and creative lead for an active Los Angeles band.",
      },
      {
        label: "Crowds in the hundreds",
        detail: "Scaled from early UCLA shows into larger campus events and Los Angeles venues.",
      },
      {
        label: "Booking + operations",
        detail: "Coordinate members, rehearsals, venue relationships, gear, expenses, schedules, and show logistics.",
      },
      {
        label: "Brand + commitment",
        detail: "Named the band, built the website, shaped the visual identity, and bought a cargo van for gear.",
      },
    ],
    links: [{ label: "SouthofSober.com", href: "https://southofsober.com/" }],
  },
];

const navItems = [
  ["Why", "#why-me"],
  ["Receipts", "#field-notes"],
  ["Resume", "#top"],
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function createCanArrowGeometry(
  sectionRect: DOMRectReadOnly,
  buttonRect: DOMRectReadOnly,
  canRect: DOMRectReadOnly,
): CanArrowGeometry {
  const localX = (value: number) => value - sectionRect.left;
  const localY = (value: number) => value - sectionRect.top;
  const canIsBelow = canRect.top > buttonRect.bottom + 36;
  const sectionWidth = Math.max(1, sectionRect.width);
  const sectionHeight = Math.max(1, sectionRect.height);
  let path: string;

  if (canIsBelow || sectionWidth < 820) {
    const startX = localX(buttonRect.right - 1);
    const startY = localY(buttonRect.bottom - 1);
    const endX = localX(canRect.left + canRect.width * 0.78);
    const endY = localY(canRect.top + canRect.height * 0.11);
    const distanceX = Math.max(120, endX - startX);
    const distanceY = Math.max(120, endY - startY);
    const pull = Math.min(96, Math.max(52, distanceY * 0.38));

    path = [
      `M ${startX.toFixed(1)} ${startY.toFixed(1)}`,
      `C ${(startX + distanceX * 0.16).toFixed(1)} ${(startY + pull).toFixed(1)},`,
      `${(endX - distanceX * 0.16).toFixed(1)} ${(endY - pull).toFixed(1)},`,
      `${endX.toFixed(1)} ${endY.toFixed(1)}`,
    ].join(" ");
  } else {
    const startX = localX(buttonRect.right - 1);
    const startY = localY(buttonRect.top + buttonRect.height * 0.5);
    const endX = localX(canRect.left + Math.min(22, canRect.width * 0.1));
    const endY = localY(
      clamp(
        Math.max(
          buttonRect.top + buttonRect.height * 0.34,
          canRect.top + canRect.height * 0.46,
        ),
        canRect.top + 24,
        canRect.bottom - 20,
      ),
    );
    const distance = Math.max(160, endX - startX);
    const laneY = Math.max(startY + 2, endY);
    const bow = Math.min(36, Math.max(14, distance * 0.045));

    path = [
      `M ${startX.toFixed(1)} ${startY.toFixed(1)}`,
      `C ${(startX + distance * 0.34).toFixed(1)} ${(laneY + bow).toFixed(1)},`,
      `${(endX - distance * 0.34).toFixed(1)} ${(endY + bow).toFixed(1)},`,
      `${endX.toFixed(1)} ${endY.toFixed(1)}`,
    ].join(" ");
  }

  return {
    height: sectionHeight,
    path,
    width: sectionWidth,
  };
}

function colorClasses(color: FieldNote["color"]) {
  if (color === "red") {
    return "bg-[var(--brand-surface)] text-[var(--brand-white)] shadow-[10px_10px_0_var(--brand-white)]";
  }

  if (color === "gold") {
    return "bg-[var(--brand-surface)] text-[var(--ink)] shadow-[10px_10px_0_var(--brand-red)]";
  }

  return "bg-[var(--brand-white)] text-white shadow-[10px_10px_0_var(--brand-red)]";
}

type ResumeSlateProps = {
  isResumeActive: boolean;
  isPrompting: boolean;
  openResume: () => void;
  resumeMode: ResumeMode;
  onSlateMotionEnd: () => void;
};

function ResumeSlate({
  isResumeActive,
  isPrompting,
  openResume,
  resumeMode,
  onSlateMotionEnd,
}: ResumeSlateProps) {
  return (
    <button
      aria-expanded={isResumeActive}
      aria-label="Open Miles Mattina resume clapperboard"
      disabled={resumeMode === "opening" || resumeMode === "closing"}
      className={`resume-slate ${
        resumeMode === "opening" ? "resume-slate--opening" : resumeMode === "closing" ? "resume-slate--closing" : ""
      } ${isPrompting && !isResumeActive ? "resume-slate--prompt" : ""} ${
        isResumeActive && resumeMode !== "opening" ? "resume-slate--open" : ""
      }`}
      onClick={openResume}
      type="button"
    >
      <svg className="resume-slate__art" viewBox="0 0 520 460" aria-hidden="true">
        <defs>
          <linearGradient id="slate-body" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#303033" /><stop offset=".45" stopColor="#171719" /><stop offset="1" stopColor="#080809" />
          </linearGradient>
          <linearGradient id="slate-edge" x1="0" x2="1">
            <stop stopColor="#929294" /><stop offset=".06" stopColor="#2d2d30" /><stop offset=".94" stopColor="#454548" /><stop offset="1" stopColor="#9e9e9f" />
          </linearGradient>
          <linearGradient id="slate-metal" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#eeeeef" /><stop offset=".4" stopColor="#85858c" /><stop offset=".7" stopColor="#c5c5ca" /><stop offset="1" stopColor="#55555c" />
          </linearGradient>
          <pattern id="slate-stripes" width="96" height="40" patternUnits="userSpaceOnUse" patternTransform="skewX(-30)">
            <rect width="96" height="40" fill="#101012" /><rect width="48" height="40" fill="#e9e8e4" />
          </pattern>
        </defs>
        <ellipse cx="270" cy="424" rx="204" ry="14" fill="#000" opacity=".55" />
        <rect x="44" y="151" width="436" height="248" rx="12" fill="#030303" />
        <rect x="36" y="143" width="436" height="248" rx="10" fill="url(#slate-edge)" />
        <rect x="41" y="147" width="425" height="237" rx="7" fill="url(#slate-body)" stroke="#ffffff22" />
        <path d="M55 207H451M55 299H451M55 350H451M187 299V350M319 299V350" fill="none" stroke="#b7b7b9" strokeWidth="1.2" />
        <g transform="translate(57 163) scale(.035)">
          <path d="M225 0v1000c60-8 138-14 198-17V0H225M579 0v983c71 3 131 9 198 17V0H579" fill="#b1060e" />
          <path d="M225 0l349 983c76 3 136 9 203 17L423 0H225" fill="#e50914" />
        </g>
        <g fill="#f5f5f1" fontFamily="Arial, Helvetica, sans-serif">
          <text x="100" y="185" fontSize="12" fontWeight="700" letterSpacing="3">AN APPLICATION FOR NETFLIX</text>
          <text x="58" y="230" fontSize="9" letterSpacing="2" fill="#b3b3b3">TITLE</text>
          <text x="57" y="268" fontSize="37" fontWeight="800" letterSpacing="-1.4">Miles Mattina</text>
          <text x="58" y="289" fontSize="13" letterSpacing="5">RESUME</text>
          <text x="58" y="317" fontSize="8" letterSpacing="2" fill="#b3b3b3">SCENE</text>
          <text x="202" y="317" fontSize="8" letterSpacing="2" fill="#b3b3b3">TAKE</text>
          <text x="334" y="317" fontSize="8" letterSpacing="2" fill="#b3b3b3">ROLL</text>
          <text x="58" y="340" fontSize="22" fontWeight="700">01</text>
          <text x="202" y="340" fontSize="22" fontWeight="700">01</text>
          <text x="334" y="340" fontSize="22" fontWeight="700">MILES</text>
          <text x="58" y="372" fontSize="9" letterSpacing="2">CREATIVE • STRATEGY • FOLLOW-THROUGH</text>
        </g>
        <rect x="35" y="123" width="438" height="27" rx="3" fill="url(#slate-stripes)" stroke="#777" />
        <path d="M36 147H473" stroke="#030303" strokeWidth="4" />
        <g className="resume-slate__arm" onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) onSlateMotionEnd();
        }}>
          <rect x="35" y="85" width="438" height="36" rx="4" fill="url(#slate-stripes)" stroke="#999" strokeWidth="1.5" />
          <path d="M40 88H468" stroke="#fff" strokeOpacity=".5" />
          <path d="M40 118H468" stroke="#000" strokeWidth="3" />
          <rect x="36" y="86" width="37" height="34" rx="4" fill="url(#slate-metal)" />
          <circle cx="53" cy="104" r="9" fill="#242427" stroke="#d6d6db" strokeWidth="2" />
          <path d="M49 100L57 108M57 100L49 108" stroke="#909097" strokeWidth="1.5" />
        </g>
        <path d="M38 107V159Q38 166 46 166H59Q67 166 67 158V117" fill="url(#slate-metal)" stroke="#6d6d76" />
        <circle cx="53" cy="112" r="7" fill="#55555b" stroke="#d7d7dc" />
        <circle cx="53" cy="154" r="4" fill="#44444a" stroke="#c3c3ca" />
      </svg>
      <span className="resume-slate__cta">{isResumeActive ? "Resume, rolling" : "Open my resume ↗"}</span>
    </button>
  );
}

type ArtifactMediaFrameProps = {
  artifactLabel: string;
  media: ArtifactMedia;
};

function ArtifactMediaFrame({ artifactLabel, media }: ArtifactMediaFrameProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.15 });
    observer.observe(video);
    return () => { observer.disconnect(); video.pause(); };
  }, []);
  const frameClassName =
    "relative block h-40 overflow-hidden border-2 border-[var(--brand-red)] bg-white";
  const content =
    media.type === "image" ? (
      <Image
        alt={media.alt}
        className="object-cover"
        fill
        loading="eager"
        fetchPriority="high"
        unoptimized
        sizes="(max-width: 640px) calc(100vw - 4rem), 25vw"
        src={media.src}
        style={{
          objectPosition: media.objectPosition,
        }}
      />
    ) : (
      <>
        <link rel="preload" as="image" href={media.poster} fetchPriority="high" />
        <video
        aria-label={media.ariaLabel}
        ref={videoRef}
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        className="pointer-events-none h-full w-full object-cover"
        loop
        muted
        playsInline
        preload="none"
        poster={media.poster}
      >
        <source src={media.src} type="video/mp4" />
      </video>
      </>
    );

  if (media.href) {
    return (
      <a
        aria-label={`Open ${artifactLabel} on Instagram`}
        className={`${frameClassName} transition hover:-translate-y-0.5`}
        href={media.href}
        rel="noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return <div className={frameClassName}>{content}</div>;
}

export default function Home() {
  const [cardIndex, setCardIndex] = useState(0);
  const [canPromptLevel, setCanPromptLevel] = useState<0 | 1 | 2>(0);
  const [isCanPrompting, setIsCanPrompting] = useState(false);
  const [cardSlideDirection, setCardSlideDirection] =
    useState<WhySlideDirection | null>(null);
  const [isWhyStackComplete, setIsWhyStackComplete] = useState(false);
  const [resumeMode, setResumeMode] = useState<ResumeMode>("closed");
  const [isResumeZoomed, setIsResumeZoomed] = useState(false);
  const [canArrowGeometry, setCanArrowGeometry] =
    useState<CanArrowGeometry | null>(null);
  const canPromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardSlideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topSectionRef = useRef<HTMLElement | null>(null);
  const canPromptButtonRef = useRef<HTMLButtonElement | null>(null);
  const resumeViewerRef = useRef<HTMLElement | null>(null);
  const currentCard = whyCards[cardIndex];
  const isFinalCard = cardIndex === whyCards.length - 1;
  const isSincereCard = currentCard.tone === "sincere";
  const isBridgeCard = currentCard.tone === "bridge";
  const isCardSliding = cardSlideDirection !== null;
  const isResumeVisible = resumeMode === "open" || resumeMode === "full";
  const isResumeActive =
    resumeMode !== "closed" && resumeMode !== "closing";

  useEffect(() => () => {
    if (cardSlideTimerRef.current) clearTimeout(cardSlideTimerRef.current);
    if (canPromptTimerRef.current) clearTimeout(canPromptTimerRef.current);
  }, []);

  useEffect(() => {
    if (!isResumeVisible) return;
    resumeViewerRef.current?.focus({ preventScroll: true });
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setResumeMode("closing");
        document.querySelector<HTMLButtonElement>(".resume-slate")?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [isResumeVisible]);


  useEffect(() => {
    if (canPromptLevel !== 2) {
      return;
    }

    const topSection = topSectionRef.current;
    const promptButton = canPromptButtonRef.current;
    const can = topSection?.querySelector(".resume-slate");

    if (!topSection || !promptButton || !(can instanceof HTMLElement)) {
      return;
    }

    let animationFrame = 0;
    const measureArrow = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        setCanArrowGeometry(
          createCanArrowGeometry(
            topSection.getBoundingClientRect(),
            promptButton.getBoundingClientRect(),
            can.getBoundingClientRect(),
          ),
        );
      });
    };

    measureArrow();
    const settleTimer = window.setTimeout(measureArrow, 560);
    const lateSettleTimer = window.setTimeout(measureArrow, 920);
    window.addEventListener("resize", measureArrow);
    window.addEventListener("orientationchange", measureArrow);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measureArrow);

    resizeObserver?.observe(topSection);
    resizeObserver?.observe(promptButton);
    resizeObserver?.observe(can);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(settleTimer);
      window.clearTimeout(lateSettleTimer);
      window.removeEventListener("resize", measureArrow);
      window.removeEventListener("orientationchange", measureArrow);
      resizeObserver?.disconnect();
    };
  }, [canPromptLevel]);

  function moveCard(direction: WhySlideDirection) {
    if (isCardSliding) {
      return;
    }

    if (direction === "prev" && cardIndex === 0) {
      return;
    }

    setCardSlideDirection(direction);

    if (cardSlideTimerRef.current) {
      clearTimeout(cardSlideTimerRef.current);
    }

    cardSlideTimerRef.current = setTimeout(() => {
      if (direction === "next" && isFinalCard) {
        setIsWhyStackComplete(true);
      } else {
        setCardIndex((index) =>
          direction === "next"
            ? Math.min(index + 1, whyCards.length - 1)
            : Math.max(index - 1, 0),
        );
      }

      setCardSlideDirection(null);
      cardSlideTimerRef.current = null;
    }, 240);
  }

  function advanceCard() {
    moveCard("next");
  }

  function resetCards() {
    if (cardSlideTimerRef.current) {
      clearTimeout(cardSlideTimerRef.current);
      cardSlideTimerRef.current = null;
    }

    setCardSlideDirection(null);
    setCardIndex(0);
    setIsWhyStackComplete(false);
  }

  function promptCanClick() {
    if (canPromptTimerRef.current) {
      clearTimeout(canPromptTimerRef.current);
    }

    setCanPromptLevel((level) => (level === 0 ? 1 : 2));
    setIsCanPrompting(false);
    requestAnimationFrame(() => {
      setIsCanPrompting(true);
      canPromptTimerRef.current = setTimeout(() => {
        setIsCanPrompting(false);
        canPromptTimerRef.current = null;
      }, 520);
    });
  }

  function openResume() {
    if (isResumeVisible || resumeMode === "opening" || resumeMode === "closing") return;
    setCanPromptLevel(0);
    setResumeMode(resumeMode === "minimized" ? "open" : "opening");
  }

  useEffect(() => {
    if (resumeMode !== "opening" && resumeMode !== "closing") return;
    const timer = setTimeout(() => {
      setResumeMode((mode) => mode === "opening" ? "open" : mode === "closing" ? "closed" : mode);
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 20 : 1000);
    return () => clearTimeout(timer);
  }, [resumeMode]);

  function closeResume() {
    setResumeMode("closing");
    document.querySelector<HTMLButtonElement>(".resume-slate")?.focus({ preventScroll: true });
  }

  function finishSlateMotion() {
    setResumeMode((mode) => mode === "opening" ? "open" : mode === "closing" ? "closed" : mode);
  }

  function scrollToWork() {
    const workSection = document.getElementById("field-notes");

    if (!workSection) {
      return;
    }

    window.scrollTo({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      top: workSection.getBoundingClientRect().top + window.scrollY - 88,
    });
  }

  function scrollToCan() {
    const topSection = document.getElementById("top");

    if (!topSection) {
      return;
    }

    window.scrollTo({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      top: topSection.offsetTop,
    });

    window.setTimeout(promptCanClick, 650);
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--background)] text-[var(--ink)]">

      <nav
        aria-label="Main sections"
        className="site-nav sticky top-0 z-50 border-b-4 border-[var(--brand-white)] bg-white/90 px-4 py-3 shadow-[0_6px_0_var(--brand-red)] backdrop-blur sm:px-6"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a
            className="font-mono text-xs font-black uppercase tracking-[0.22em] text-[var(--brand-white)]"
            href="#top"
          >
            Miles Mattina <span className="nav-divider">/</span> <span className="netflix-wordmark">Netflix</span>
          </a>
          <div className="flex flex-wrap justify-end gap-2">
            {navItems.map(([label, href]) => (
              <a
                className="border-2 border-[var(--brand-white)] bg-white px-3 py-1.5 text-xs font-black uppercase text-[var(--brand-white)] shadow-[3px_3px_0_var(--brand-red)] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--brand-red)]"
                href={href}
                key={href}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section
        className="netflix-hero relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-16"
        id="top"
        ref={topSectionRef}
      >
        <div className="hero-copy relative z-10">
          <p className="mb-5 inline-flex -rotate-2 border-2 border-[var(--brand-white)] bg-[var(--brand-surface)] px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-[var(--brand-white)] shadow-[5px_5px_0_var(--brand-red)]">
            Manager, UCAN Marketing – Live Title Creative application
          </p>
          <h1 className="max-w-3xl text-6xl font-black uppercase leading-[0.84] text-[var(--brand-white)] sm:text-7xl lg:text-8xl">
            Who is this guy?
          </h1>
          <p className="mt-7 max-w-2xl text-xl font-semibold leading-8 sm:text-2xl">
            A custom hello from Miles Mattina, built for Netflix with
            a little brand-building experience, a lot of creative follow-through,
            and a very earnest interest in the job.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center gap-3">
            <button
              className={`can-prompt-button ${
                canPromptLevel === 2 ? "can-prompt-button--final" : ""
              }`}
              onClick={promptCanClick}
              ref={canPromptButtonRef}
              type="button"
            >
                {canPromptLevel === 0
                  ? "Click the clapperboard"
                  : canPromptLevel === 1
                    ? "no, click the clapperboard"
                    : "THE CLAPPERBOARD"}
            </button>
            {canPromptLevel === 1 ? (
              <span
                aria-hidden="true"
                className="pointer-events-none text-4xl font-black text-[var(--brand-red)] sm:text-5xl"
              >
                →
              </span>
            ) : null}
          </div>
        </div>

        {canPromptLevel === 2 && canArrowGeometry ? (
          <svg
            aria-hidden="true"
            className="can-target-arrow"
            viewBox={`0 0 ${canArrowGeometry.width} ${canArrowGeometry.height}`}
          >
            <defs>
              <marker
                id="can-target-arrow-head"
                markerHeight="28"
                markerUnits="userSpaceOnUse"
                markerWidth="34"
                orient="auto"
                refX="30"
                refY="14"
              >
                <path d="M 0 0 L 34 14 L 0 28 Z" fill="currentColor" />
              </marker>
            </defs>
            <g className="can-target-arrow__draw">
              <path
                className="can-target-arrow__path"
                d={canArrowGeometry.path}
                markerEnd="url(#can-target-arrow-head)"
              />
            </g>
          </svg>
        ) : null}

        <div
          aria-label="Interactive Miles Mattina resume clapperboard"
          className="slate-stage relative min-h-[560px]"
        >
          <ResumeSlate
            isResumeActive={isResumeActive}
            isPrompting={isCanPrompting}
            openResume={openResume}
            resumeMode={resumeMode}
            onSlateMotionEnd={finishSlateMotion}
          />
        </div>
      </section>

      <section
        className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-20"
        id="why-me"
      >
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.26em] text-[var(--brand-red)]">
            pull cards
          </p>
          <h2 className="mt-2 text-5xl font-black uppercase leading-none text-[var(--brand-white)] sm:text-6xl">
            Why me?
          </h2>
          {cardIndex > 0 || isWhyStackComplete ? (
            <button
              className="mt-6 border-2 border-[var(--brand-white)] bg-white px-4 py-2 text-xs font-black uppercase text-[var(--brand-white)] shadow-[4px_4px_0_var(--brand-red)]"
              onClick={resetCards}
              type="button"
            >
              Restack
            </button>
          ) : null}
        </div>

        <div
          className="relative min-h-[470px]"
        >
          {isWhyStackComplete ? (
            <div className="absolute inset-x-0 top-0 mx-auto flex h-80 w-[calc(100%-1.25rem)] max-w-xl flex-col justify-center gap-8 border-4 border-[var(--brand-white)] bg-[var(--brand-surface)] p-8 text-[var(--brand-white)] shadow-[10px_10px_0_var(--brand-red)] sm:w-full sm:shadow-[14px_14px_0_var(--brand-red)]">
              <h3 className="text-5xl font-black uppercase leading-[0.88] sm:text-6xl">
                THEN LET ME PROVE IT.
              </h3>
              <button
                className="self-start border-2 border-[var(--brand-white)] bg-white px-5 py-3 text-sm font-black uppercase text-[var(--brand-white)] shadow-[5px_5px_0_var(--brand-red)] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--brand-red)]"
                onClick={scrollToWork}
                type="button"
              >
                Start snooping
              </button>
            </div>
          ) : (
            <>
              {whyCards
                .slice(cardIndex + 1, cardIndex + 4)
                .map((card, offset) => (
                  <div
                    className={`pointer-events-none absolute inset-x-0 mx-auto w-[calc(100%-1.25rem)] max-w-xl border-4 border-[var(--brand-white)] bg-white shadow-[8px_8px_0_rgba(229,9,20,0.2)] sm:w-full sm:shadow-[10px_10px_0_rgba(229,9,20,0.2)] h-80`}
                    key={card.title}
                    style={{
                      top: `${24 + offset * 16}px`,
                      transform: `rotate(${
                        offset % 2 === 0 ? 2 : -2
                      }deg) scale(${0.96 - offset * 0.03})`,
                      zIndex: 3 - offset,
                    }}
                  />
                ))}
              <div
                aria-live="polite"
                className={`why-card ${isBridgeCard ? "why-card--bridge" : isSincereCard ? "why-card--sincere" : ""} absolute inset-x-0 top-0 z-10 mx-auto flex w-[calc(100%-1.25rem)] max-w-xl border-4 border-[var(--brand-white)] text-left shadow-[10px_10px_0_var(--brand-red)] transition hover:-translate-y-1 sm:w-full sm:shadow-[14px_14px_0_var(--brand-red)] h-80 ${
                  cardSlideDirection === "next" ? "why-card--exit-next" : ""
                } ${
                  cardSlideDirection === "prev" ? "why-card--exit-prev" : ""
                } ${
                  isSincereCard
                    ? "flex-col justify-center gap-7 bg-[var(--brand-white)] p-9 text-white sm:p-10"
                    : isBridgeCard
                      ? "items-center justify-center bg-[var(--brand-surface)] p-9 text-center text-[var(--brand-white)] sm:p-10"
                      : "flex-col justify-between bg-white p-6 text-[var(--ink)] sm:p-7"
                }`}
              >
                {isSincereCard || isBridgeCard ? null : (
                  <span className="font-mono text-xs font-black uppercase tracking-[0.24em] opacity-70">
                    card {cardIndex + 1} / {whyCards.length}
                  </span>
                )}
                  <>
                    <span
                      className={`[overflow-wrap:anywhere] font-black uppercase leading-[0.9] ${
                        isSincereCard
                          ? "text-4xl sm:text-5xl"
                          : isBridgeCard
                            ? "text-5xl sm:text-6xl"
                            : "text-[clamp(2.2rem,10vw,3rem)] sm:text-5xl"
                      }`}
                    >
                      {currentCard.title}
                    </span>
                    {currentCard.secondLine ? (
                      <span className="text-4xl font-black uppercase leading-[0.9] sm:text-5xl">
                        {currentCard.secondLine}
                      </span>
                    ) : null}
                    {currentCard.note ? (
                      <span className="max-w-md text-xl font-bold leading-7">
                        {currentCard.note}
                      </span>
                    ) : null}
                  </>
              </div>
              <div
                className={`absolute inset-x-0 z-20 mx-auto flex w-[calc(100%-1.25rem)] max-w-xl items-center justify-between gap-3 sm:w-full top-[348px]`}
              >
                <button
                  aria-label="Previous reason"
                  className="grid size-12 place-items-center border-2 border-[var(--brand-white)] bg-white text-3xl font-black leading-none text-[var(--brand-white)] shadow-[4px_4px_0_var(--brand-red)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
                  disabled={cardIndex === 0 || isCardSliding}
                  onClick={() => moveCard("prev")}
                  type="button"
                >
                  ←
                </button>
                <button
                  aria-label="Next reason"
                  className="grid size-12 place-items-center border-2 border-[var(--brand-white)] bg-[var(--brand-white)] text-3xl font-black leading-none text-white shadow-[4px_4px_0_var(--brand-red)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isCardSliding}
                  onClick={advanceCard}
                  type="button"
                >
                  →
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20"
        id="field-notes"
      >
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-black uppercase tracking-[0.26em] text-[var(--brand-red)]">
            The receipts
          </p>
          <h2 className="mt-2 text-5xl font-black uppercase leading-none text-[var(--brand-white)] sm:text-6xl">
            Here&apos;s what I&apos;ve been up to.
          </h2>
          <p className="mt-5 text-lg font-semibold leading-7">
            A few real things I&apos;ve built, sold, booked, branded, and dragged
            across the finish line. From a consumer brand to public-sector
            launches: the story, the rollout, and the follow-through.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {fieldNotes.map((note, index) => (
            <article
              className="relative grid gap-5 lg:grid-cols-[0.78fr_1.22fr]"
              key={note.title}
            >
              <div
                className={`project-intro relative border-4 border-white p-6 outline outline-4 outline-[var(--brand-white)] ${
                  note.title === "Buoy Bird" || note.title === "South of Sober"
                    ? "overflow-hidden pr-28 sm:pr-36"
                    : ""
                } ${colorClasses(note.color)}`}
              >
                <p className="font-mono text-xs font-black uppercase tracking-[0.24em] opacity-80">
                  {note.label}
                </p>
                <h3 className="mt-8 text-5xl font-black uppercase leading-none">
                  {note.title}
                </h3>
                <p className="mt-6 text-xl font-bold leading-7">
                  {note.oneLiner}
                </p>
                {note.title === "Buoy Bird" ? (
                  <a
                    className="mt-7 block border-4 border-white bg-[var(--brand-red)] p-5 text-white shadow-[8px_8px_0_rgba(0,0,0,0.36)] transition hover:-translate-y-0.5"
                    href="https://www.instagram.com/buoybirdofficial/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="block font-mono text-xs font-black uppercase tracking-[0.2em]">
                      Start here
                    </span>
                    <span className="mt-3 block text-3xl font-black uppercase leading-[0.9]">
                      Watch the pinned Cinema by the Shore preview videos.
                    </span>
                    <span className="mt-4 inline-block border-2 border-white bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--brand-white)] shadow-[4px_4px_0_rgba(0,0,0,0.28)]">
                      @buoybirdofficial on Instagram
                    </span>
                  </a>
                ) : null}
                <div className="mt-7 flex flex-wrap gap-3">
                  {note.links.map((link) => (
                    <a
                      className="border-2 border-white bg-white px-4 py-2 text-xs font-black uppercase text-[var(--brand-white)] shadow-[4px_4px_0_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5"
                      href={link.href}
                      key={link.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                {note.title === "Buoy Bird" ? (
                  <Image
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    unoptimized
                    className="buoy-sticker buoy-sticker--bird"
                    height={844}
                    src="/portfolio/buoy-bird-sticker-b4176e37.webp"
                    width={780}
                  />
                ) : null}
                {note.title === "Konocti Climb" ? (
                  <Image
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    unoptimized
                    className="buoy-sticker konocti-climb-sticker"
                    height={750}
                    src="/portfolio/konocti-climb-sticker-e69b00a8.webp"
                    width={750}
                  />
                ) : null}
                {note.title === "South of Sober" ? (
                  <Image
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    unoptimized
                    className="buoy-sticker south-of-sober-sticker"
                    height={2000}
                    src="/portfolio/south-of-sober-sticker-a017d3fe.webp"
                    width={2000}
                  />
                ) : null}
              </div>

              <div className="relative grid gap-4 sm:grid-cols-2">
                {note.artifacts.map((artifact, artifactIndex) => {
                  const media =
                    note.title === "Buoy Bird"
                      ? buoyBirdMedia[artifactIndex]
                      : note.title === "Konocti Climb"
                        ? konoctiClimbMedia[artifactIndex]
                        : note.title === "South of Sober"
                          ? southOfSoberMedia[artifactIndex]
                      : undefined;

                  return (
                    <div
                      className={`artifact-card min-h-56 border-4 border-[var(--brand-white)] bg-white p-3 shadow-[8px_8px_0_rgba(196,32,50,0.25)] ${
                        (artifactIndex + index) % 2 === 0
                          ? "-rotate-1"
                          : "rotate-1"
                      }`}
                      key={artifact.label}
                    >
                      {media ? (
                        <ArtifactMediaFrame
                          artifactLabel={artifact.label}
                          media={media}
                        />
                      ) : (
                        <div className="flex h-40 items-center justify-center border-2 border-dashed border-[var(--brand-red)] bg-[linear-gradient(135deg,#fff_0_32%,#222_32%_50%,#fff_50%_70%,#3a1015_70%)] text-center">
                          <p className="max-w-32 font-mono text-xs font-black uppercase tracking-[0.16em] text-[var(--brand-white)]">
                            {artifact.label}
                          </p>
                        </div>
                      )}
                      <p className="mt-3 text-sm font-black uppercase text-[var(--brand-red)]">
                        {artifact.label}
                      </p>
                      <p className="mt-2 text-sm font-bold leading-5 text-[var(--ink)]">
                        {artifact.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-24"
        id="talk"
      >
        <div className="talk-card max-w-4xl border-4 border-[var(--brand-white)] bg-white p-7 shadow-[14px_14px_0_var(--brand-red)] sm:p-10">
          <p className="font-mono text-xs font-black uppercase tracking-[0.26em] text-[var(--brand-red)]">
            closing tab
          </p>
          <h2 className="mt-6 text-6xl font-black uppercase leading-[0.86] text-[var(--brand-white)] sm:text-7xl">
            We should probably talk.
          </h2>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-8">
            If you want the official version, it&apos;s still hiding up top in
            the clapperboard.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              className="border-2 border-[var(--brand-white)] bg-[var(--brand-surface)] px-5 py-3 text-sm font-black uppercase text-[var(--brand-white)] shadow-[5px_5px_0_var(--brand-red)] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--brand-red)]"
              onClick={scrollToCan}
              type="button"
            >
              Back to the clapperboard
            </button>
            <a className="contact-link" href="mailto:milesmattina@gmail.com">Email Miles ↗</a>
            <a className="contact-link" href="https://www.linkedin.com/in/milesmattina" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
      </section>

      <footer className="portfolio-footer">Miles Mattina · An independent application for Netflix.</footer>

      {resumeMode === "minimized" ? (
        <button
          className="fixed bottom-4 right-4 z-[70] border-4 border-[var(--brand-white)] bg-[var(--brand-surface)] px-5 py-4 text-left text-sm font-black uppercase text-[var(--brand-white)] shadow-[8px_8px_0_var(--brand-red)] transition hover:-translate-y-1"
          onClick={openResume}
          type="button"
        >
          Resume tucked away
          <span className="block text-xs">open again</span>
        </button>
      ) : null}

      {isResumeVisible ? (
        <aside
          aria-label="Miles Mattina resume viewer"
          role="dialog"
          tabIndex={-1}
          ref={resumeViewerRef}
          className={`resume-viewer fixed z-[80] flex flex-col border-4 border-[var(--brand-white)] bg-white shadow-[18px_18px_0_var(--brand-red)] transition-all duration-500 ${
            resumeMode === "full"
              ? "inset-3 sm:inset-5"
              : "bottom-4 right-4 top-20 w-[calc(100vw-2rem)] lg:w-[52vw]"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-[var(--brand-white)] bg-[var(--brand-white)] px-4 py-3 text-white">
            <div>
              <p className="font-mono text-[11px] font-black uppercase tracking-[0.22em] text-[var(--brand-surface)]">
                resume clapperboard contents
              </p>
              <h3 className="text-2xl font-black uppercase leading-none">
                Miles Mattina Resume
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <a className="resume-download" href="/Miles_Mattina_Resume.pdf" download>Download PDF</a>
              <button type="button" className="resume-zoom" onClick={() => setIsResumeZoomed((zoomed) => !zoomed)}>{isResumeZoomed ? "Fit page" : "Zoom in"}</button>
              <button
                className="border-2 border-white bg-white px-3 py-2 text-xs font-black uppercase text-[var(--brand-white)] shadow-[3px_3px_0_var(--brand-red)]"
                onClick={() =>
                  setResumeMode((mode) => (mode === "full" ? "open" : "full"))
                }
                type="button"
              >
                {resumeMode === "full" ? "Half screen" : "Full screen"}
              </button>
              <button
                className="border-2 border-white bg-[var(--brand-surface)] px-3 py-2 text-xs font-black uppercase text-[var(--brand-white)] shadow-[3px_3px_0_var(--brand-red)]"
                onClick={() => setResumeMode("minimized")}
                type="button"
              >
                Minimize
              </button>
              <button
                className="border-2 border-white bg-[var(--brand-red)] px-3 py-2 text-xs font-black uppercase text-white shadow-[3px_3px_0_var(--brand-surface)]"
                onClick={closeResume}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
          <div className="resume-page min-h-0 flex-1 overflow-auto bg-white" tabIndex={0} aria-label="Resume document">
            <Image src="/resume-preview.png" alt="Miles Mattina resume, original document" width={1469} height={1901} unoptimized className={`h-auto w-full ${isResumeZoomed ? "min-w-[850px]" : ""}`} />
            <p className="sr-only">{resumeText}</p>
          </div>
        </aside>
      ) : null}
    </main>
  );
}
