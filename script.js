/**
 * SHEMROCK PLAYSCHOOL - OPTIMIZED INTERACTIVE JAVASCRIPT
 * Zero-Lag, Throttled Animation, Mobile & Tablet Optimized
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Throttled Sticky Nav & Back to Top with requestAnimationFrame & Passive Listeners
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  let ticking = false;

  const onScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (scrollY > 350) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  mobileToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu?.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('active') && !navMenu.contains(e.target) && e.target !== mobileToggle) {
      navMenu.classList.remove('active');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
    });
  });

  // 3. Lightweight Milestone Counters (Intersection Observer)
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count') || '0', 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));

      const updateCounter = () => {
        current += step;
        if (current >= target) {
          stat.textContent = target.toLocaleString() + suffix;
        } else {
          stat.textContent = current.toLocaleString() + suffix;
          requestAnimationFrame(updateCounter);
        }
      };
      updateCounter();
    });
  };

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          animateCounters();
          observer.unobserve(statsSection);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(statsSection);
  } else {
    animateCounters();
  }

  // 4. ShemEduMAX™ Curriculum Explorer (Slow Rotating Orbit & Tap-to-Inspect with Auto-Resume)
  const curriculumData = {
    1: {
      title: "Research-Backed Curriculum",
      badge: "Scientific Pedagogy",
      desc: "Developed by India's leading early childhood education pioneers, ShemEduMAX™ integrates Piaget, Montessori, and Howard Gardner’s Multiple Intelligences for deep holistic growth.",
      p1: "Cognitive Milestones",
      p1Sub: "Structured age-appropriate neural stimulation",
      p2: "Experiential Learning",
      p2Sub: "Hands-on sensorial play over rote memorization"
    },
    2: {
      title: "Innovative Learning Resources",
      badge: "Multisensory Kits",
      desc: "Proprietary tactile learning aids, custom educational toy kits, phonics audio-visual cards, and 3D sensory building tools that spark natural curiosity.",
      p1: "Custom Play Kits",
      p1Sub: "Tailored educational manipulatives for each child",
      p2: "Sensory Engagement",
      p2Sub: "Tactile, auditory, and visual coordination"
    },
    3: {
      title: "Engaging Teaching Methodology",
      badge: "Child-Centric Learning",
      desc: "Our child-first pedagogy places empathy and discovery at the center. Teachers act as joyful facilitators, guiding children to discover answers naturally.",
      p1: "Playful Inquiry",
      p1Sub: "Encourages question asking and creative reasoning",
      p2: "Emotional Security",
      p2Sub: "Warm, accepting, and affectionate classroom culture"
    },
    4: {
      title: "Tech-Powered Blended Learning",
      badge: "Smart Education",
      desc: "Child-safe interactive smart panels, augmented storytelling, and personalized parent app for real-time progress updates, learning snapshots, and home activities.",
      p1: "Smart Classrooms",
      p1Sub: "Audio-visual immersive thematic animations",
      p2: "Parent Portal",
      p2Sub: "Daily live updates, albums & developmental tracker"
    },
    5: {
      title: "Child-Centered Activities",
      badge: "Holistic Development",
      desc: "Art, pottery, gardening, rhythm & music, storytelling circles, and motor-skill obstacle tracks that foster independence and self-expression.",
      p1: "Fine & Gross Motor",
      p1Sub: "Balance, coordination, dexterity and rhythm",
      p2: "Social Bonding",
      p2Sub: "Teamwork, empathy, and collaborative play"
    },
    6: {
      title: "Colorful Celebrations & Synergy",
      badge: "Cultural Values",
      desc: "Celebrating diversity with grand festival weeks, Grandparents' Day, Environment Week, and thematic masquerades that instill values and mutual respect.",
      p1: "Cultural Harmony",
      p1Sub: "Appreciating diverse customs and traditions",
      p2: "Parent Synergy",
      p2Sub: "Frequent family participation days and workshops"
    },
    7: {
      title: "Wow! Wednesdays & Thematic Days",
      badge: "Excitement & Curiosity",
      desc: "Special discovery Wednesdays where children explore science wonders, color coding, community helper dress-ups, and fun sensory experiments.",
      p1: "Mini Science Lab",
      p1Sub: "Fun safe experiments with water, light and colors",
      p2: "Role Play Corners",
      p2Sub: "Doctors, astronomers, bakers, and firefighters"
    },
    8: {
      title: "Nutritious Meals & Safe Care",
      badge: "Health & Well-being",
      desc: "Pediatrician-formulated balanced meal guidance, zero-sharp-edge ergonomic furniture, 24/7 CCTV surveillance, and hygienic child-friendly sanitation.",
      p1: "Hygienic Campus",
      p1Sub: "Daily medical-grade UV and steam sanitization",
      p2: "Healthy Habits",
      p2Sub: "Nutrition awareness, handwash drills, self-care"
    }
  };

  const wheelOrbit = document.getElementById('wheelOrbit');
  const wheelNodesTrack = document.getElementById('wheelNodesTrack');
  const wheelNodes = document.querySelectorAll('.wheel-node');
  const mobilePills = document.querySelectorAll('.curr-mobile-pill');
  const curriculumDetailCard = document.getElementById('curriculumDetail');
  const currTitle = document.getElementById('currTitle');
  const currBadge = document.getElementById('currBadge');
  const currDesc = document.getElementById('currDesc');
  const currH1 = document.getElementById('currH1');
  const currH1Sub = document.getElementById('currH1Sub');
  const currH2 = document.getElementById('currH2');
  const currH2Sub = document.getElementById('currH2Sub');
  const currProgressBar = document.getElementById('currCardProgressBar');
  const currRotText = document.getElementById('currRotText');

  let currentCurriculumId = 1;
  let currentWheelAngle = 0;
  const TOTAL_NODES = 8;
  const CYCLE_INTERVAL = 3800; // 3.8s per option
  const USER_PAUSE_DELAY = 6000; // 6s resume delay after user interaction
  let autoRotateTimer = null;
  let resumeTimer = null;
  let progressStartTime = null;
  let progressAnimFrame = null;
  let isAutoRotating = true;

  const updateProgressBar = (timestamp) => {
    if (!progressStartTime) progressStartTime = timestamp;
    const elapsed = timestamp - progressStartTime;
    const pct = Math.min(100, (elapsed / CYCLE_INTERVAL) * 100);

    if (currProgressBar) {
      currProgressBar.style.width = pct + '%';
    }

    if (elapsed < CYCLE_INTERVAL && isAutoRotating) {
      progressAnimFrame = requestAnimationFrame(updateProgressBar);
    }
  };

  const startProgressBar = () => {
    cancelAnimationFrame(progressAnimFrame);
    progressStartTime = null;
    if (currProgressBar) currProgressBar.style.width = '0%';
    if (isAutoRotating) {
      progressAnimFrame = requestAnimationFrame(updateProgressBar);
    }
  };

  const resetProgressBar = () => {
    cancelAnimationFrame(progressAnimFrame);
    if (currProgressBar) currProgressBar.style.width = '0%';
  };

  // Physically rotate wheel track and counter-rotate child nodes so options revolve around center
  const rotateWheelToId = (targetId) => {
    const targetIndex = targetId - 1;
    // Current top node index based on currentWheelAngle
    const currentTopIndex = (((-Math.round(currentWheelAngle / 45)) % TOTAL_NODES) + TOTAL_NODES) % TOTAL_NODES;
    let diff = targetIndex - currentTopIndex;
    if (diff > 4) diff -= 8;
    if (diff < -4) diff += 8;

    currentWheelAngle -= (diff * 45);

    if (wheelNodesTrack) {
      wheelNodesTrack.style.transform = `rotate(${currentWheelAngle}deg)`;
    }

    wheelNodes.forEach(node => {
      node.style.setProperty('--counter-rot', `${-currentWheelAngle}deg`);
    });
  };

  const updateCurriculumView = (id, isUserInteraction = false) => {
    const numId = parseInt(id, 10);
    const data = curriculumData[numId];
    if (!data) return;

    currentCurriculumId = numId;

    // Physically spin the wheel so selected option revolves to top spotlight
    rotateWheelToId(numId);

    // Update active satellite nodes
    wheelNodes.forEach(node => {
      const nodeId = parseInt(node.getAttribute('data-id'), 10);
      node.classList.toggle('active', nodeId === numId);
    });

    // Update mobile pills and auto-scroll active pill into view
    mobilePills.forEach(pill => {
      const pillId = parseInt(pill.getAttribute('data-id'), 10);
      const isActive = pillId === numId;
      pill.classList.toggle('active', isActive);
      if (isActive && pill.offsetParent !== null) {
        pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });

    // Animate detail card content with subtle fade
    if (curriculumDetailCard) {
      curriculumDetailCard.style.opacity = '0.82';
      setTimeout(() => {
        curriculumDetailCard.style.opacity = '1';
      }, 180);
    }

    if (currTitle) currTitle.textContent = data.title;
    if (currBadge) currBadge.textContent = data.badge;
    if (currDesc) currDesc.textContent = data.desc;
    if (currH1) currH1.textContent = data.p1;
    if (currH1Sub) currH1Sub.textContent = data.p1Sub;
    if (currH2) currH2.textContent = data.p2;
    if (currH2Sub) currH2Sub.textContent = data.p2Sub;

    if (isUserInteraction) {
      // User tapped an option: pause auto-rotation immediately
      stopAutoRotation();
      resetProgressBar();

      if (currRotText) {
        currRotText.textContent = `Selected: ${data.title} • Resumes in 6s`;
      }

      // Clear any prior resume timer and restart rotation after 6s of inactivity
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        startAutoRotation();
      }, USER_PAUSE_DELAY);
    } else {
      if (currRotText) {
        currRotText.textContent = 'Auto-rotating wheel';
      }
      startProgressBar();
    }
  };

  const nextCurriculumOption = () => {
    const nextId = (currentCurriculumId % TOTAL_NODES) + 1;
    updateCurriculumView(nextId, false);
  };

  const startAutoRotation = () => {
    isAutoRotating = true;
    clearInterval(autoRotateTimer);
    clearTimeout(resumeTimer);
    if (currRotText) currRotText.textContent = 'Auto-rotating wheel';
    startProgressBar();
    autoRotateTimer = setInterval(nextCurriculumOption, CYCLE_INTERVAL);
  };

  const stopAutoRotation = () => {
    isAutoRotating = false;
    clearInterval(autoRotateTimer);
    resetProgressBar();
  };

  // Node Click Handlers
  wheelNodes.forEach(node => {
    node.addEventListener('click', () => {
      const id = node.getAttribute('data-id');
      updateCurriculumView(id, true);
    });
  });

  // Mobile Pills Click Handlers
  mobilePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const id = pill.getAttribute('data-id');
      updateCurriculumView(id, true);
    });
  });

  // Pause on hover over detail card so parents can read at leisure
  curriculumDetailCard?.addEventListener('mouseenter', () => {
    if (isAutoRotating) {
      clearInterval(autoRotateTimer);
      cancelAnimationFrame(progressAnimFrame);
      if (currRotText) currRotText.textContent = 'Paused (Reading)';
    }
  });

  curriculumDetailCard?.addEventListener('mouseleave', () => {
    if (isAutoRotating) {
      startAutoRotation();
    }
  });

  // Initialize wheel rotation and start auto-cycle
  rotateWheelToId(1);
  startAutoRotation();

  // 5. Interactive Moving Reviews Marquee Controls
  const reviewsMarqueeWrapper = document.getElementById('reviewsMarqueeWrapper');
  const reviewsTrack = document.getElementById('reviewsTrack');
  const reviewsToggleBtn = document.getElementById('reviewsToggleBtn');
  const reviewsToggleIcon = document.getElementById('reviewsToggleIcon');
  const reviewsToggleText = document.getElementById('reviewsToggleText');
  const reviewsPrevBtn = document.getElementById('reviewsPrevBtn');
  const reviewsNextBtn = document.getElementById('reviewsNextBtn');

  let isReviewsPaused = false;

  const toggleReviewsMarquee = () => {
    isReviewsPaused = !isReviewsPaused;
    if (reviewsMarqueeWrapper) {
      reviewsMarqueeWrapper.classList.toggle('is-paused', isReviewsPaused);
    }
    if (reviewsToggleIcon && reviewsToggleText) {
      if (isReviewsPaused) {
        reviewsToggleIcon.textContent = '▶';
        reviewsToggleText.textContent = 'Play';
      } else {
        reviewsToggleIcon.textContent = '⏸';
        reviewsToggleText.textContent = 'Pause';
      }
    }
  };

  reviewsToggleBtn?.addEventListener('click', toggleReviewsMarquee);

  // Manual nudge buttons for reviews
  reviewsPrevBtn?.addEventListener('click', () => {
    if (reviewsMarqueeWrapper) {
      reviewsMarqueeWrapper.scrollBy({ left: -360, behavior: 'smooth' });
    }
  });

  reviewsNextBtn?.addEventListener('click', () => {
    if (reviewsMarqueeWrapper) {
      reviewsMarqueeWrapper.scrollBy({ left: 360, behavior: 'smooth' });
    }
  });



  // 6. Fast Accessible FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherContent = other.querySelector('.faq-content');
        if (otherContent) otherContent.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      }
    });
  });

  if (faqItems[0]) {
    faqItems[0].classList.add('active');
    const firstContent = faqItems[0].querySelector('.faq-content');
    if (firstContent) {
      firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    }
  }

  // 7. Lightweight Fast Confetti (Clean Canvas Loop)
  const triggerConfetti = () => {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#E52928', '#FFB800', '#0284C7', '#10B981', '#F97316'];

    for (let i = 0; i < 50; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        w: Math.random() * 8 + 5,
        h: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 4 - 2
      });
    }

    let startTime = Date.now();
    let animId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;
      });

      if (Date.now() - startTime < 2000) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animId);
      }
    };

    render();
  };

  // 8. Modal Management
  const modal = document.getElementById('admissionModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const admissionForm = document.getElementById('admissionForm');
  const formSuccess = document.getElementById('formSuccess');
  const targetBranchInput = document.getElementById('targetBranch');

  window.openAdmissionModal = (branchName = '') => {
    if (targetBranchInput && branchName) {
      targetBranchInput.value = branchName;
    }
    modal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeAdmissionModal = () => {
    modal?.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtn?.addEventListener('click', window.closeAdmissionModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeAdmissionModal();
    }
  });

  admissionForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    admissionForm.style.display = 'none';
    if (formSuccess) formSuccess.style.display = 'block';
    triggerConfetti();

    setTimeout(() => {
      window.closeAdmissionModal();
      admissionForm.reset();
      admissionForm.style.display = 'block';
      if (formSuccess) formSuccess.style.display = 'none';
    }, 2800);
  });


});
