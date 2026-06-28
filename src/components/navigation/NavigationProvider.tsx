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

interface SelectedOffset {
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

function SlowRouteLoader({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: reduceMotion ? 0 : 0.3 }}
      className="absolute left-1/2 top-[calc(50%+5.5rem)] z-30 flex -translate-x-1/2 items-end gap-2"
      role="status"
      aria-label="Loading page"
    >
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          animate={
            reduceMotion
              ? { opacity: 0.8 }
              : { y: [0, -9, 0], opacity: [0.42, 1, 0.42] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.82,
                  delay: index * 0.14,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                }
          }
          className="size-2.5 rounded-full bg-white shadow-[0_6px_18px_rgba(255,255,255,.2)]"
          aria-hidden="true"
        />
      ))}
    </motion.div>
  );
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = Boolean(useReducedMotion());
  const [phase, setPhase] = useState<NavigationPhase>("closed");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedOffset, setSelectedOffset] = useState<SelectedOffset>({
    x: 0,
    y: 0,
  });
  const [transitionSource, setTransitionSource] =
    useState<TransitionSource>(null);
  const [showSlowLoader, setShowSlowLoader] = useState(false);
  const [origin, setOrigin] = useState<NavigationOrigin>({ x: 0, y: 0 });
  const pendingHref = useRef<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasMenuOpen = useRef(false);
  const restoreScrollY = useRef(0);
  const menuNavigationStarted = useRef(false);

  const menuVisible = phase !== "closed";

  const prepareRouteNavigation = useCallback(() => {
    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;

    restoreScrollY.current = 0;
    html.style.scrollBehavior = "auto";
    if (document.body.style.position === "fixed") {
      document.body.style.top = "0px";
    }
    window.scrollTo(0, 0);
    html.style.scrollBehavior = previousScrollBehavior;
  }, []);

  const closeMenu = useCallback(() => {
    if (phase !== "open") return;
    setSelectedLabel(null);
    setSelectedOffset({ x: 0, y: 0 });
    setTransitionSource(null);
    setShowSlowLoader(false);
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
        setSelectedOffset({ x: 0, y: 0 });
        setTransitionSource(null);
        setShowSlowLoader(false);
        setPhase("closed");
        return;
      }

      pendingHref.current = href;
      setSelectedLabel(label ?? null);
      setShowSlowLoader(false);

      if (phase === "open") {
        menuNavigationStarted.current = false;
        setTransitionSource("menu");
        setPhase("selecting");
        if (!navItems.some((item) => item.label === label)) {
          window.setTimeout(() => {
            if (menuNavigationStarted.current || !pendingHref.current) return;
            menuNavigationStarted.current = true;
            setPhase("covered");
            prepareRouteNavigation();
            router.push(pendingHref.current);
          }, reduceMotion ? 30 : 620);
        }
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
          prepareRouteNavigation();
          router.push(href);
        },
        reduceMotion ? 30 : 650,
      );
    },
    [pathname, phase, prepareRouteNavigation, reduceMotion, router],
  );

  const completeMenuSelection = useCallback(() => {
    if (
      phase !== "selecting" ||
      transitionSource !== "menu" ||
      menuNavigationStarted.current ||
      !pendingHref.current
    ) {
      return;
    }

    menuNavigationStarted.current = true;
    setPhase("covered");
    prepareRouteNavigation();
    router.push(pendingHref.current);
  }, [phase, prepareRouteNavigation, router, transitionSource]);

  useEffect(() => {
    if (
      phase !== "covered" ||
      !pendingHref.current ||
      pathname === pendingHref.current
    ) {
      return;
    }

    const loaderTimer = window.setTimeout(() => {
      setShowSlowLoader(true);
    }, 800);

    return () => window.clearTimeout(loaderTimer);
  }, [pathname, phase]);

  useEffect(() => {
    if (!pendingHref.current || pathname !== pendingHref.current) return;

    prepareRouteNavigation();
    setShowSlowLoader(false);

    const revealTimer = window.setTimeout(
      () => {
        setPhase("revealing");
      },
      reduceMotion ? 20 : 100,
    );
    const resetTimer = window.setTimeout(
      () => {
        pendingHref.current = null;
        setSelectedLabel(null);
        setSelectedOffset({ x: 0, y: 0 });
        setTransitionSource(null);
        setShowSlowLoader(false);
        menuNavigationStarted.current = false;
        setPhase("closed");
      },
      reduceMotion ? 120 : 1120,
    );

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(resetTimer);
    };
  }, [pathname, prepareRouteNavigation, reduceMotion]);

  useEffect(() => {
    if (!menuVisible) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      htmlScrollBehavior: html.style.scrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
    };

    restoreScrollY.current = scrollY;
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    return () => {
      html.style.scrollBehavior = "auto";
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscrollBehavior;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      body.style.overflow = previous.bodyOverflow;
      body.style.overscrollBehavior = previous.bodyOverscrollBehavior;
      window.scrollTo(0, restoreScrollY.current);
      html.style.scrollBehavior = previous.htmlScrollBehavior;
    };
  }, [menuVisible]);

  useEffect(() => {
    if (!menuVisible) {
      if (wasMenuOpen.current) {
        window.setTimeout(() => triggerRef.current?.focus(), 0);
      }
      wasMenuOpen.current = false;
      return;
    }

    wasMenuOpen.current = true;
    const focusTimer = window.setTimeout(
      () => menuRef.current?.focus(),
      reduceMotion ? 0 : 420,
    );

    return () => window.clearTimeout(focusTimer);
  }, [menuVisible, reduceMotion]);

  useEffect(() => {
    if (!menuVisible) return;

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
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeMenu, menuVisible, phase]);

  const contextValue = useMemo(
    () => ({ navigate, transitioning: menuVisible }),
    [menuVisible, navigate],
  );

  const clipOrigin = `${origin.x || 52}px ${origin.y || 52}px`;
  const isMenuSelection =
    transitionSource === "menu" &&
    selectedLabel !== null &&
    (phase === "selecting" || phase === "covered" || phase === "revealing");
  const isMenuContentVisible = phase === "open" || isMenuSelection;
  const selectedIndex = navItems.findIndex(
    (item) => item.label === selectedLabel,
  );

  return (
    <NavigationContext.Provider value={contextValue}>
      <LayoutGroup id="route-navigation">
        <div aria-hidden={menuVisible || undefined} inert={menuVisible}>
          {children}
        </div>

        <motion.button
          ref={triggerRef}
          type="button"
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => {
            if (phase === "closed") {
              const rect = triggerRef.current?.getBoundingClientRect();
              setOrigin({
                x: rect ? rect.left + rect.width / 2 : window.innerWidth - 52,
                y: rect ? rect.top + rect.height / 2 : 52,
              });
              setSelectedOffset({ x: 0, y: 0 });
              setTransitionSource(null);
              setPhase("open");
            } else if (phase === "open") {
              closeMenu();
            }
          }}
          disabled={phase !== "closed" && phase !== "open"}
          aria-label={menuVisible ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuVisible}
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
            className="fixed inset-0 z-[120] h-[100dvh] min-h-[100svh] w-screen overflow-hidden overscroll-none bg-[#161617] text-white shadow-[0_35px_100px_rgba(0,0,0,.4)] focus:outline-none"
          >
            {isMenuContentVisible ? (
              <div className="relative flex h-full min-h-0 flex-col px-6 py-7 sm:px-10 sm:py-9 lg:px-14">
                <motion.button
                  type="button"
                  onClick={() => navigate("/", "Home")}
                  animate={{
                    opacity: isMenuSelection ? 0 : 1,
                    y: isMenuSelection ? -16 : 0,
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.45 }}
                  className="w-fit text-left text-[13px] font-semibold uppercase tracking-[0.18em] text-white/64 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Riswan Ramadhan
                </motion.button>

                <nav
                  className="flex flex-1 flex-col items-center justify-center gap-1"
                  aria-label="Overlay navigation"
                >
                  {navItems.map((item, itemIndex) => {
                    const selected = selectedLabel === item.label;
                    const choosing = isMenuSelection;
                    const selectedActive = choosing && selected;
                    return (
                      <motion.button
                        key={item.label}
                        type="button"
                        disabled={choosing}
                        onClick={(event) => {
                          const label = event.currentTarget.querySelector<HTMLElement>(
                            "[data-menu-label]",
                          );
                          const labelRect =
                            label?.getBoundingClientRect() ??
                            event.currentTarget.getBoundingClientRect();
                          const menuRect = menuRef.current?.getBoundingClientRect();
                          const centerX = menuRect
                            ? menuRect.left + menuRect.width / 2
                            : window.innerWidth / 2;
                          const centerY = menuRect
                            ? menuRect.top + menuRect.height / 2
                            : window.innerHeight / 2;
                          setSelectedOffset({
                            x: centerX - (labelRect.left + labelRect.width / 2),
                            y: centerY - (labelRect.top + labelRect.height / 2),
                          });
                          navigate(item.href, item.label);
                        }}
                        onAnimationComplete={
                          selected ? completeMenuSelection : undefined
                        }
                        animate={
                          choosing
                            ? selected
                              ? {
                                  opacity: 1,
                                  scale: 1,
                                  x: selectedOffset.x,
                                  y: selectedOffset.y,
                                  filter: "blur(0px)",
                                }
                              : {
                                  opacity: 0,
                                  scale: 0.92,
                                  x: 0,
                                  y: itemIndex < selectedIndex ? -48 : 48,
                                  filter: "blur(9px)",
                                }
                            : {
                                opacity: 1,
                                scale: 1,
                                x: 0,
                                y: 0,
                                filter: "blur(0px)",
                              }
                        }
                        transition={{
                          duration: reduceMotion ? 0 : 0.62,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={cn(
                          "group relative flex items-start text-[clamp(3rem,8vw,7.4rem)] font-semibold uppercase leading-[0.86] tracking-[-0.075em] transition-colors duration-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                          selectedActive ? "text-white" : "text-white/68",
                        )}
                      >
                        <span className="relative inline-block">
                          <span
                            data-menu-label
                            className={cn(
                              "relative z-10 inline-block transition-transform duration-500 ease-[var(--ease-apple)] group-hover:-translate-x-1.5",
                              selectedActive && "-translate-x-1.5",
                            )}
                          >
                            {item.label}
                          </span>
                          <span
                            aria-hidden="true"
                            className={cn(
                              "pointer-events-none absolute inset-0 text-transparent transition-all duration-500 ease-[var(--ease-apple)]",
                              selectedActive
                                ? "translate-x-1 translate-y-1 opacity-50"
                                : "translate-x-2 translate-y-1.5 opacity-0 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:opacity-50",
                            )}
                            style={{ WebkitTextStroke: "1px rgba(255,255,255,.42)" }}
                          >
                            {item.label}
                          </span>
                          <span
                            className={cn(
                              "pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 text-[16px] font-normal tracking-normal transition-all duration-500 ease-[var(--ease-apple)]",
                              selectedActive
                                ? "translate-x-0 opacity-70"
                                : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-70",
                            )}
                          >
                            ↗
                          </span>
                        </span>
                        {item.count ? (
                          <sup
                            className={cn(
                              "ml-2 mt-1 text-[10px] font-medium tracking-normal transition-transform duration-500 ease-[var(--ease-apple)] sm:text-[12px]",
                              selectedActive
                                ? "-translate-y-1 rotate-6 text-white/60"
                                : "text-white/35 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:text-white/60",
                            )}
                          >
                            [{item.count}]
                          </sup>
                        ) : null}
                      </motion.button>
                    );
                  })}
                </nav>

                <motion.div
                  animate={{
                    opacity: isMenuSelection ? 0 : 1,
                    y: isMenuSelection ? 16 : 0,
                  }}
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

            <AnimatePresence>
              {showSlowLoader && phase === "covered" ? (
                <SlowRouteLoader reduceMotion={reduceMotion} />
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}
        </AnimatePresence>
      </LayoutGroup>
    </NavigationContext.Provider>
  );
}
