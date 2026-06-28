"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";

import { navItems, socialLinks } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { SocialPill } from "@/components/ui/SocialPill";

type NavigationPhase =
  | "closed"
  | "open"
  | "selecting"
  | "covering"
  | "covered"
  | "revealing";

type TransitionSource = "menu" | "direct" | null;

interface NavigationOrigin {
  x: number;
  y: number;
}

interface NavigationContextValue {
  navigate: (href: string, label?: string, origin?: NavigationOrigin) => void;
  transitioning: boolean;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function useNavigationTransition() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationTransition must be used inside NavigationProvider");
  }
  return context;
}

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = Boolean(useReducedMotion());
  const [phase, setPhase] = useState<NavigationPhase>("closed");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedOffset, setSelectedOffset] = useState(0);
  const [transitionSource, setTransitionSource] =
    useState<TransitionSource>(null);
  const [homeScrolled, setHomeScrolled] = useState(false);
  const [origin, setOrigin] = useState<NavigationOrigin>({ x: 0, y: 0 });
  const pendingHref = useRef<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasMenuOpen = useRef(false);

  const menuVisible = phase !== "closed";
  const showTrigger = pathname !== "/" || homeScrolled || menuVisible;

  useEffect(() => {
    if (pathname !== "/") return;

    let frame = 0;
    const update = () => {
      frame = window.requestAnimationFrame(() => {
        setHomeScrolled(window.scrollY >= window.innerHeight - 120);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const closeMenu = useCallback(() => {
    if (phase !== "open") return;
    setSelectedLabel(null);
    setSelectedOffset(0);
    setTransitionSource(null);
    setPhase("closed");
  }, [phase]);

  const navigate = useCallback(
    (href: string, label?: string, clickOrigin?: NavigationOrigin) => {
      if (phase === "selecting" || phase === "covering" || phase === "covered") {
        return;
      }

      if (href === pathname) {
        if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
        setSelectedLabel(null);
        setSelectedOffset(0);
        setTransitionSource(null);
        setPhase("closed");
        return;
      }

      pendingHref.current = href;
      setSelectedLabel(label ?? null);

      if (phase === "open") {
        setTransitionSource("menu");
        setPhase("selecting");
        window.setTimeout(
          () => {
            setPhase("covered");
            router.push(href, { scroll: false });
          },
          reduceMotion ? 30 : 620,
        );
        return;
      }

      setOrigin(
        clickOrigin ?? {
          x: window.innerWidth - 52,
          y: 52,
        },
      );
      setTransitionSource("direct");
      setPhase("covering");
      window.setTimeout(
        () => {
          setPhase("covered");
          router.push(href, { scroll: false });
        },
        reduceMotion ? 30 : 650,
      );
    },
    [pathname, phase, reduceMotion, router],
  );

  useEffect(() => {
    if (!pendingHref.current || pathname !== pendingHref.current) return;

    const revealTimer = window.setTimeout(
      () => {
        window.scrollTo({ top: 0, left: 0 });
        setPhase("revealing");
      },
      reduceMotion ? 20 : 100,
    );
    const resetTimer = window.setTimeout(
      () => {
        pendingHref.current = null;
        setSelectedLabel(null);
        setSelectedOffset(0);
        setTransitionSource(null);
        setPhase("closed");
      },
      reduceMotion ? 120 : 1120,
    );

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(resetTimer);
    };
  }, [pathname, reduceMotion]);

  useEffect(() => {
    if (!menuVisible) {
      document.body.style.overflow = "";
      if (wasMenuOpen.current) {
        window.setTimeout(() => triggerRef.current?.focus(), 0);
      }
      wasMenuOpen.current = false;
      return;
    }

    wasMenuOpen.current = true;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      menuRef.current?.focus();
    }, reduceMotion ? 0 : 420);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && phase === "open") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === menuRef.current)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [closeMenu, menuVisible, phase, reduceMotion]);

  const contextValue = useMemo(
    () => ({ navigate, transitioning: menuVisible }),
    [menuVisible, navigate],
  );

  const clipOrigin = `${origin.x || 52}px ${origin.y || 52}px`;
  const isMenuContentVisible = phase === "open" || phase === "selecting";
  const selectedIndex = navItems.findIndex(
    (item) => item.label === selectedLabel,
  );

  return (
    <NavigationContext.Provider value={contextValue}>
      <LayoutGroup id="route-navigation">
      <div aria-hidden={menuVisible || undefined} inert={menuVisible}>
        {children}
      </div>

      <AnimatePresence>
        {showTrigger ? (
          <motion.button
            ref={triggerRef}
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => {
              if (phase === "closed") {
                const rect = triggerRef.current?.getBoundingClientRect();
                setOrigin({
                  x: rect ? rect.left + rect.width / 2 : window.innerWidth - 52,
                  y: rect ? rect.top + rect.height / 2 : 52,
                });
                setSelectedOffset(0);
                setTransitionSource(null);
                setPhase("open");
              } else if (phase === "open") {
                closeMenu();
              }
            }}
            disabled={phase !== "closed" && phase !== "open"}
            aria-label={phase === "open" ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={phase === "open"}
            className={cn(
              "group fixed right-5 top-5 z-[130] flex size-14 items-center justify-center rounded-full border shadow-[0_16px_45px_rgba(0,0,0,.22)] backdrop-blur-xl transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-7 sm:top-7",
              menuVisible
                ? "border-black/8 bg-white text-black"
                : "border-white/14 bg-[#1c1c1e] text-white hover:bg-black",
            )}
          >
            <span
              className={cn(
                "icon-motion-menu-line absolute h-[1.5px] w-5 bg-current transition-transform duration-500 ease-[var(--ease-apple)]",
                menuVisible ? "rotate-45" : "-translate-y-[4px]",
              )}
            />
            <span
              className={cn(
                "icon-motion-menu-line absolute h-[1.5px] w-5 bg-current transition-transform duration-500 ease-[var(--ease-apple)] [animation-delay:90ms]",
                menuVisible ? "-rotate-45" : "translate-y-[4px]",
              )}
            />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {menuVisible ? (
          <motion.div
            ref={menuRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { clipPath: `circle(0px at ${clipOrigin})`, y: "0%" }
            }
            animate={
              phase === "revealing"
                ? {
                    clipPath: `circle(160vmax at ${clipOrigin})`,
                    y: "-112%",
                  }
                : {
                    opacity: 1,
                    clipPath: `circle(160vmax at ${clipOrigin})`,
                    y: "0%",
                  }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { clipPath: `circle(0px at ${clipOrigin})`, opacity: 1 }
            }
            transition={{
              duration: reduceMotion ? 0.08 : phase === "revealing" ? 0.95 : 0.72,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              borderBottomLeftRadius: "50% 8%",
              borderBottomRightRadius: "50% 8%",
            }}
            className="fixed left-0 right-0 top-0 z-[120] h-[110svh] overflow-hidden bg-[#161617] text-white shadow-[0_35px_100px_rgba(0,0,0,.4)] focus:outline-none"
          >
            {isMenuContentVisible ? (
              <div className="relative flex h-[100svh] flex-col px-6 py-7 sm:px-10 sm:py-9 lg:px-14">
                <button
                  type="button"
                  onClick={() => navigate("/", "Home")}
                  className="w-fit text-left text-[13px] font-semibold uppercase tracking-[0.18em] text-white/64 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Riswan Ramadhan
                </button>

                <nav
                  className="flex flex-1 flex-col items-center justify-center gap-1"
                  aria-label="Overlay navigation"
                >
                  {navItems.map((item, itemIndex) => {
                    const selected = selectedLabel === item.label;
                    const choosing = phase === "selecting";
                    return (
                      <motion.button
                        key={item.label}
                        type="button"
                        disabled={choosing}
                        onClick={(event) => {
                          const rect = event.currentTarget.getBoundingClientRect();
                          setSelectedOffset(
                            window.innerHeight / 2 -
                              (rect.top + rect.height / 2),
                          );
                          navigate(item.href, item.label);
                        }}
                        animate={
                          choosing
                            ? selected
                              ? {
                                  opacity: 1,
                                  scale: 1.08,
                                  y: selectedOffset,
                                  filter: "blur(0px)",
                                }
                              : {
                                  opacity: 0,
                                  scale: 0.92,
                                  y: itemIndex < selectedIndex ? -48 : 48,
                                  filter: "blur(9px)",
                                }
                            : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
                        }
                        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                        className="group relative flex items-start text-[clamp(3rem,8vw,7.4rem)] font-semibold uppercase leading-[0.86] tracking-[-0.075em] text-white/68 transition-colors duration-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <span className="relative inline-block">
                          <motion.span
                            layoutId={
                              selected
                                ? `route-title-${item.label.toLowerCase()}`
                                : undefined
                            }
                            className="relative z-10 inline-block transition-transform duration-500 ease-[var(--ease-apple)] group-hover:-translate-x-1.5"
                          >
                            {item.label}
                          </motion.span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 translate-x-2 translate-y-1.5 text-transparent opacity-0 transition-all duration-500 ease-[var(--ease-apple)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:opacity-50"
                            style={{ WebkitTextStroke: "1px rgba(255,255,255,.42)" }}
                          >
                            {item.label}
                          </span>
                          <span className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 translate-x-2 text-[16px] font-normal tracking-normal opacity-0 transition-all duration-500 ease-[var(--ease-apple)] group-hover:translate-x-0 group-hover:opacity-70">
                            ↗
                          </span>
                        </span>
                        {item.count ? (
                          <sup className="ml-2 mt-1 text-[10px] font-medium tracking-normal text-white/35 transition-transform duration-500 ease-[var(--ease-apple)] group-hover:-translate-y-1 group-hover:rotate-6 group-hover:text-white/60 sm:text-[12px]">
                            [{item.count}]
                          </sup>
                        ) : null}
                      </motion.button>
                    );
                  })}
                </nav>

                <motion.div
                  animate={{ opacity: phase === "selecting" ? 0 : 1, y: phase === "selecting" ? 16 : 0 }}
                  className="flex items-center gap-2"
                >
                  {socialLinks.map((link) => (
                    <SocialPill
                      key={link.label}
                      link={link}
                      compact
                      inverted
                      iconOnly
                    />
                  ))}
                </motion.div>
              </div>
            ) : null}

            {transitionSource === "menu" &&
            phase === "covered" &&
            selectedLabel ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  layoutId={`route-title-${selectedLabel.toLowerCase()}`}
                  className="text-[clamp(3rem,8vw,7.4rem)] font-semibold uppercase leading-none tracking-[-0.075em] text-white"
                >
                  {selectedLabel}
                </motion.span>
              </div>
            ) : null}

            {transitionSource === "direct" &&
            (phase === "covering" || phase === "covered") &&
            selectedLabel ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center px-8 text-center"
              >
                <span className="max-w-[900px] text-[clamp(1.5rem,4vw,3.3rem)] font-medium leading-[1.05] tracking-[-0.045em] text-white/82">
                  {selectedLabel}
                </span>
              </motion.div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
      </LayoutGroup>
    </NavigationContext.Provider>
  );
}
