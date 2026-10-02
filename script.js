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

  // 4. ShemEduMAX™ Curriculum Explorer (Synchronized Desktop Wheel & Mobile Pills)
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

  const wheelNodes = document.querySelectorAll('.wheel-node');
  const mobilePills = document.querySelectorAll('.curr-mobile-pill');
  const currTitle = document.getElementById('currTitle');
  const currBadge = document.getElementById('currBadge');
  const currDesc = document.getElementById('currDesc');
  const currH1 = document.getElementById('currH1');
  const currH1Sub = document.getElementById('currH1Sub');
  const currH2 = document.getElementById('currH2');
  const currH2Sub = document.getElementById('currH2Sub');

  const updateCurriculumView = (id) => {
    const data = curriculumData[id];
    if (!data) return;

    wheelNodes.forEach(n => {
      n.classList.toggle('active', n.getAttribute('data-id') === id);
    });

    mobilePills.forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-id') === id);
    });

    if (currTitle) currTitle.textContent = data.title;
    if (currBadge) currBadge.textContent = data.badge;
    if (currDesc) currDesc.textContent = data.desc;
    if (currH1) currH1.textContent = data.p1;
    if (currH1Sub) currH1Sub.textContent = data.p1Sub;
    if (currH2) currH2.textContent = data.p2;
    if (currH2Sub) currH2Sub.textContent = data.p2Sub;
  };

  wheelNodes.forEach(node => {
    node.addEventListener('click', () => {
      const id = node.getAttribute('data-id');
      updateCurriculumView(id);
    });
  });

  mobilePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const id = pill.getAttribute('data-id');
      updateCurriculumView(id);
    });
  });

  // 5. Interactive Branch Locator Search & Mobile Compact Toggle
  const branchData = [
    {
      id: 1,
      name: "SHEMROCK Heritage (Rohini)",
      city: "Delhi NCR",
      pincode: "110085",
      address: "Block F, Sec-9, Behind Jai Apts, Rohini, New Delhi",
      phone: "+91 95608 89732",
      badge: "Head Office & Flagship",
      facilities: "Splash Pool, STEM Corner, Smart Panels"
    },
    {
      id: 2,
      name: "SHEMROCK Daisy (Pitampura)",
      city: "Delhi NCR",
      pincode: "110034",
      address: "Plot 14, Near Metro Pillar 320, Pitampura, New Delhi",
      phone: "+91 98112 34567",
      badge: "Excellence Center",
      facilities: "Montessori Arena, Mini Gym"
    },
    {
      id: 3,
      name: "SHEMROCK Marvel (Gurugram)",
      city: "Delhi NCR",
      pincode: "122001",
      address: "Sector 46, Near Artemis Hospital, Gurugram, Haryana",
      phone: "+91 99551 22334",
      badge: "Top Rated",
      facilities: "Outdoor Sand Pit, Creative Studio"
    },
    {
      id: 4,
      name: "SHEMROCK Little Stars (Noida)",
      city: "Delhi NCR",
      pincode: "201301",
      address: "Sector 62, Near Electronic City Metro, Noida, UP",
      phone: "+91 97110 88990",
      badge: "Spacious Campus",
      facilities: "Interactive Sand Pit, Puppet Theatre"
    },
    {
      id: 5,
      name: "SHEMROCK Sunshine (Bandra West)",
      city: "Mumbai",
      pincode: "400050",
      address: "Turner Road, Near Perry Cross Rd, Bandra West, Mumbai",
      phone: "+91 98200 44551",
      badge: "Premium Branch",
      facilities: "Sensory Maze, Music & Dance Studio"
    },
    {
      id: 6,
      name: "SHEMROCK Blooming Buds (Indiranagar)",
      city: "Bangalore",
      pincode: "560038",
      address: "12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru",
      phone: "+91 99001 77662",
      badge: "Lush Green Campus",
      facilities: "Nature Play Arena, Hydroponics Mini Garden"
    },
    {
      id: 7,
      name: "SHEMROCK Wonderkids (Salt Lake)",
      city: "Kolkata",
      pincode: "700091",
      address: "Sector 1, Block BE, Near City Centre 1, Salt Lake, Kolkata",
      phone: "+91 98305 11223",
      badge: "Award Winner",
      facilities: "Role-Play Street, Library Nook"
    },
    {
      id: 8,
      name: "SHEMROCK Joyful (Gomti Nagar)",
      city: "Lucknow",
      pincode: "226010",
      address: "Vipin Khand, Near Riverfront Park, Gomti Nagar, Lucknow",
      phone: "+91 94500 88771",
      badge: "Spacious Playfield",
      facilities: "Splash Pool, Tricycle Track"
    },
    {
      id: 9,
      name: "SHEMROCK Tiny Tots (Kankarbagh)",
      city: "Patna",
      pincode: "800020",
      address: "Road No. 4, Near Tempo Stand, Kankarbagh, Patna, Bihar",
      phone: "+91 93340 66554",
      badge: "Established 1995",
      facilities: "Activity Zone, Phonics Lab"
    }
  ];

  const searchInput = document.getElementById('branchSearchInput');
  const cityFilter = document.getElementById('cityFilter');
  const branchesContainer = document.getElementById('branchesContainer');
  const resultCount = document.getElementById('resultCount');
  const viewMoreBtn = document.getElementById('mobileViewMoreBranchesBtn');
  let mobileExpanded = false;

  const renderBranches = (filtered) => {
    if (!branchesContainer) return;
    branchesContainer.innerHTML = '';

    if (filtered.length === 0) {
      branchesContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🏫</div>
          <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: #1E293B; margin-bottom: 0.35rem;">No Center Found</h4>
          <p style="color: #64748B; font-size: 0.9rem; margin-bottom: 1.25rem;">Our counselor can help connect you with our nearest branch.</p>
          <button class="btn btn-primary" onclick="openAdmissionModal()">Speak to Admission Counselor</button>
        </div>
      `;
      if (resultCount) resultCount.textContent = 'Showing 0 branches';
      if (viewMoreBtn) viewMoreBtn.style.display = 'none';
      return;
    }

    if (resultCount) {
      resultCount.textContent = `Showing ${filtered.length} verified centers`;
    }

    filtered.forEach((branch, idx) => {
      const card = document.createElement('div');
      card.className = `branch-card ${mobileExpanded || idx < 3 ? 'mobile-show' : ''}`;
      card.innerHTML = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
            <span class="branch-city-badge">${branch.city} • PIN ${branch.pincode}</span>
            <span style="font-size: 0.72rem; font-weight: 700; color: #E52928; background: #FFF1F0; padding: 0.12rem 0.45rem; border-radius: 99px;">${branch.badge}</span>
          </div>
          <h3 class="branch-name">${branch.name}</h3>
          <p class="branch-address">📍 ${branch.address}</p>
          <div style="margin-bottom: 0.85rem; font-size: 0.78rem; color: #475569; background: #F8FAFC; padding: 0.45rem 0.65rem; border-radius: 6px;">
            <strong>Highlights:</strong> ${branch.facilities}
          </div>
        </div>
        <div>
          <div class="branch-contact">
            <span>📞</span>
            <a href="tel:${branch.phone}" style="color: inherit;">${branch.phone}</a>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-primary" style="flex: 1; padding: 0.5rem 0.85rem; font-size: 0.82rem;" onclick="openAdmissionModal('${branch.name}')">Book Visit</button>
            <a href="https://wa.me/919560889732?text=Hello,%20I%20want%20to%20enquire%20about%20${encodeURIComponent(branch.name)}" target="_blank" class="btn" style="background: #ECFDF5; color: #047857; padding: 0.5rem 0.85rem; font-size: 0.82rem;" title="Chat on WhatsApp">💬</a>
          </div>
        </div>
      `;
      branchesContainer.appendChild(card);
    });

    if (viewMoreBtn) {
      if (filtered.length > 3 && window.innerWidth <= 768 && !mobileExpanded) {
        viewMoreBtn.style.display = 'block';
        viewMoreBtn.textContent = `View All ${filtered.length} Centers ▾`;
      } else {
        viewMoreBtn.style.display = 'none';
      }
    }
  };

  viewMoreBtn?.addEventListener('click', () => {
    mobileExpanded = true;
    document.querySelectorAll('.branch-card').forEach(c => c.classList.add('mobile-show'));
    viewMoreBtn.style.display = 'none';
  });

  const filterBranches = () => {
    const term = (searchInput?.value || '').toLowerCase().trim();
    const city = cityFilter?.value || 'all';

    const results = branchData.filter(b => {
      const matchCity = (city === 'all') || (b.city === city);
      const matchText = b.name.toLowerCase().includes(term) ||
                        b.address.toLowerCase().includes(term) ||
                        b.pincode.includes(term) ||
                        b.city.toLowerCase().includes(term);
      return matchCity && matchText;
    });

    renderBranches(results);
  };

  searchInput?.addEventListener('input', filterBranches);
  cityFilter?.addEventListener('change', filterBranches);
  renderBranches(branchData);

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

  // Franchise Form Submit
  const franchiseForm = document.getElementById('franchiseForm');
  franchiseForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = franchiseForm.querySelector('button[type="submit"]');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Brochure Request Sent!';
      btn.style.background = '#10B981';
      triggerConfetti();
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        franchiseForm.reset();
      }, 3000);
    }
  });
});
