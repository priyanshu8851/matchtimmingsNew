const navItems = [...document.querySelectorAll('.nav-item')];
const navLinks = document.getElementById('navLinks');
const navHighlight = document.getElementById('navHighlight');
const megaMenu = document.getElementById('megaMenu');
const megaContent = document.getElementById('megaContent');
const header = document.querySelector('.site-header');
const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.dot')];
const prevSlideButton = document.getElementById('prevSlide');
const nextSlideButton = document.getElementById('nextSlide');
const momentsTrack = document.getElementById('momentsTrack');
const momentCards = momentsTrack ? [...momentsTrack.querySelectorAll('.moment-card')] : [];
const momentsPrev = document.getElementById('momentsPrev');
const momentsNext = document.getElementById('momentsNext');

const menuData = {
  cricket: [
    {
      title: 'T20 Leagues',
      items: [
        'Asia Cup',
        'Asia Cup 2020',
        'Women Premier League',
        'Big Bash League',
        'Road Safety World Series',
        'Legends League Cricket',
        'Tamil Nadu Premier League',
        'Vitality Blast',
        'IPL'
      ]
    },
    {
      title: 'International Series',
      items: [
        'Womens Asia Cup 2026',
        'India Tour Of Australia 2025',
        'India Tour Of South Africa',
        'Ireland Tour Of England',
        'New Zealand Tour Of England',
        'New Zealand Tour Of United Arab Emirates',
        'The Ashes',
        'ICC World Test Championship Final',
        'Ireland Vs Bangladesh',
        'Ireland Tour Of England'
      ]
    },
    {
      title: 'Domestic & Others',
      items: [
        'Ranji Trophy',
        'Royal London One Day Cup',
        'Duleep Trophy',
        'Irani Cup',
        'County Championship',
        'Syed Mushtaq Ali Trophy'
      ]
    },
    {
      title: 'Women',
      items: [
        "Women's World Cup 2025",
        "ICC Women's T20 World Cup",
        'Bangladesh Women Tour Of New Zealand',
        'Pakistan Women Tour Of Australia',
        'Australia Women Tour Of India',
        'England Women Tour Of West Indies',
        'World Cup',
        "ICC T20 Men's Worldcup",
        'ICC World Cup'
      ]
    }
  ],
  tennis: [
    {
      title: 'Grand Slams',
      items: ['Australian Open', 'French Open', 'Wimbledon', 'US Open', 'Laver Cup']
    },
    {
      title: 'ATP Tours',
      items: ['ATP Finals', 'Monte Carlo Masters', 'Indian Wells', 'Miami Open', 'Rome Masters']
    },
    {
      title: 'WTA Tours',
      items: ['WTA Finals', 'Doha Open', 'Dubai Championships', 'Madrid Open', 'China Open']
    },
    {
      title: 'Team Events',
      items: ['Davis Cup', 'Billie Jean King Cup', 'United Cup', 'Hopman Cup']
    }
  ],
  football: [
    {
      title: 'Top Leagues',
      items: ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1']
    },
    {
      title: 'International',
      items: ['FIFA World Cup', 'UEFA Euro', 'Copa America', 'Nations League', 'AFCON']
    },
    {
      title: 'Club Tournaments',
      items: ['Champions League', 'Europa League', 'Conference League', 'FA Cup', 'Carabao Cup']
    },
    {
      title: 'Women Football',
      items: ['Women Super League', 'UWCL', 'FIFA Womens World Cup', 'SheBelieves Cup']
    }
  ],
  basketball: [
    {
      title: 'Leagues',
      items: ['NBA', 'WNBA', 'EuroLeague', 'NBL', 'Liga ACB']
    },
    {
      title: 'International',
      items: ['FIBA World Cup', 'Olympic Basketball', 'AmeriCup', 'EuroBasket']
    },
    {
      title: 'NBA Events',
      items: ['Playoffs', 'NBA Finals', 'All-Star Weekend', 'Summer League']
    },
    {
      title: 'More',
      items: ['Draft Tracker', 'Power Rankings', 'Injury Report', 'Trade News']
    }
  ],
  hockey: [
    {
      title: 'International Hockey',
      items: ['FIH Pro League', 'Hockey World Cup', 'Champions Trophy', 'Olympics']
    },
    {
      title: 'Domestic',
      items: ['Hockey India League', 'Belgian League', 'Dutch Hoofdklasse', 'Bundesliga Hockey']
    },
    {
      title: 'Women Hockey',
      items: ['Womens FIH Pro League', 'Womens World Cup', 'Junior Women Championship']
    },
    {
      title: 'Coverage',
      items: ['Fixtures', 'Live Scores', 'Standings', 'Player Rankings']
    }
  ],
  volleyball: [
    {
      title: 'Global Events',
      items: ['FIVB World Championship', 'Volleyball Nations League', 'Olympics', 'World Cup']
    },
    {
      title: 'Club Leagues',
      items: ['Italian SuperLega', 'Turkish League', 'Polish PlusLiga', 'Brazilian Superliga']
    },
    {
      title: 'Women Volleyball',
      items: ['Women Nations League', 'Women World Championship', 'CEV Champions League Women']
    },
    {
      title: 'More',
      items: ['Beach Volleyball', 'Asian Championship', 'Pan American Cup']
    }
  ],
  more: [
    {
      title: 'Combat Sports',
      items: ['UFC', 'Boxing', 'Bellator', 'ONE Championship']
    },
    {
      title: 'Motorsport',
      items: ['Formula 1', 'MotoGP', 'NASCAR', 'WRC']
    },
    {
      title: 'Racquet & Indoor',
      items: ['Badminton', 'Table Tennis', 'Squash', 'Snooker']
    },
    {
      title: 'Tracking',
      items: ['Results', 'Rankings', 'Schedules', 'Latest News']
    }
  ]
};

let activeMenu = null;
let closeTimer = null;
let currentSlide = 0;
let slideInterval = null;
let currentMomentIndex = 0;

function setHighlight(target) {
  if (!target || window.innerWidth <= 720) {
    navHighlight.style.opacity = '0';
    return;
  }

  const linksRect = navLinks.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const left = targetRect.left - linksRect.left;

  navHighlight.style.width = `${targetRect.width}px`;
  navHighlight.style.transform = `translateX(${left}px)`;
  navHighlight.style.opacity = '1';
}

function clearHighlight() {
  navHighlight.style.opacity = '0';
}

function renderMenu(menuKey) {
  const menu = menuData[menuKey];
  if (!menu) {
    megaContent.innerHTML = '';
    return false;
  }

  megaContent.innerHTML = menu
    .map(
      (section) => `
        <section class="mega-column">
          <h4>${section.title}</h4>
          <ul>
            ${section.items.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </section>
      `
    )
    .join('');

  return true;
}

function openMenu(target) {
  const menuKey = target.dataset.menu;
  if (!renderMenu(menuKey)) {
    closeMenu();
    return;
  }

  activeMenu = target;
  navItems.forEach((item) => item.classList.toggle('active', item === target));
  setHighlight(target);
  megaMenu.classList.add('active');
  megaMenu.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
  activeMenu = null;
  navItems.forEach((item) => item.classList.remove('active'));
  megaMenu.classList.remove('active');
  megaMenu.setAttribute('aria-hidden', 'true');
  megaContent.innerHTML = '';
  clearHighlight();
}

function scheduleClose() {
  window.clearTimeout(closeTimer);
  closeTimer = window.setTimeout(closeMenu, 180);
}

function cancelClose() {
  window.clearTimeout(closeTimer);
}

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentSlide);
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function startSlider() {
  window.clearInterval(slideInterval);
  slideInterval = window.setInterval(nextSlide, 4000);
}

function getVisibleMomentCards() {
  if (window.innerWidth <= 720) return 1;
  if (window.innerWidth <= 1080) return 2;
  return 4;
}

function updateMomentsSlider() {
  if (!momentsTrack || !momentCards.length) return;

  const visibleCards = getVisibleMomentCards();
  const maxIndex = Math.max(0, momentCards.length - visibleCards);
  currentMomentIndex = Math.min(currentMomentIndex, maxIndex);

  const cardWidth = momentCards[0].getBoundingClientRect().width;
  const trackStyle = window.getComputedStyle(momentsTrack);
  const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || '0');
  const offset = currentMomentIndex * (cardWidth + gap);

  momentsTrack.style.transform = `translateX(-${offset}px)`;

  if (momentsPrev) momentsPrev.disabled = currentMomentIndex === 0;
  if (momentsNext) momentsNext.disabled = currentMomentIndex >= maxIndex;
}

function moveMoments(direction) {
  const visibleCards = getVisibleMomentCards();
  const maxIndex = Math.max(0, momentCards.length - visibleCards);
  currentMomentIndex = Math.min(maxIndex, Math.max(0, currentMomentIndex + direction));
  updateMomentsSlider();
}

navItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    cancelClose();
    if (item.dataset.menu) {
      openMenu(item);
    } else {
      closeMenu();
      setHighlight(item);
    }
  });

  item.addEventListener('focus', () => {
    cancelClose();
    if (item.dataset.menu) {
      openMenu(item);
    } else {
      closeMenu();
      setHighlight(item);
    }
  });
});

header.addEventListener('mouseleave', scheduleClose);
header.addEventListener('mouseenter', cancelClose);
megaMenu.addEventListener('mouseenter', cancelClose);
megaMenu.addEventListener('mouseleave', scheduleClose);

prevSlideButton.addEventListener('click', () => {
  showSlide(currentSlide - 1);
  startSlider();
});

nextSlideButton.addEventListener('click', () => {
  nextSlide();
  startSlider();
});

if (momentsPrev && momentsNext && momentCards.length) {
  momentsPrev.addEventListener('click', () => moveMoments(-1));
  momentsNext.addEventListener('click', () => moveMoments(1));
}

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.slide));
    startSlider();
  });
});

window.addEventListener('resize', () => {
  if (activeMenu) {
    setHighlight(activeMenu);
  } else {
    clearHighlight();
  }

  updateMomentsSlider();
});

const defaultNav = document.querySelector('.active-default');
if (defaultNav) {
  setHighlight(defaultNav);
}

showSlide(0);
startSlider();
updateMomentsSlider();




document.addEventListener("DOMContentLoaded", function () {
  const widget = document.querySelector(".match-widget");

  if (!widget) return;

  const tabs = widget.querySelectorAll(".mw-tab");
  const contents = widget.querySelectorAll(".mw-content");

  // TAB SWITCH
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");

      const target = tab.getAttribute("data-tab");
      const activeSection = widget.querySelector("#" + target);

      if (activeSection) {
        activeSection.classList.add("active");
      }
    });
  });

  // SLIDER BUTTONS (IMPORTANT FIX)
  document.querySelectorAll(".mw-content").forEach(section => {
    const container = section.querySelector(".mw-cards");
    const nextBtn = section.querySelector(".mw-next");
    const prevBtn = section.querySelector(".mw-prev");

    if (!container || !nextBtn || !prevBtn) return;

    nextBtn.onclick = () => {
      container.scrollLeft += 270;
    };

    prevBtn.onclick = () => {
      container.scrollLeft -= 270;
    };
  });
});
// ✅ Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {

  // ✅ Check if Swiper exists
  if (typeof Swiper === "undefined") {
    console.error("Swiper JS not loaded");
    return;
  }

  // ✅ Check if slider exists
  const sliderEl = document.querySelector(".newsSwiper2");

  if (!sliderEl) {
    console.warn("newsSwiper2 not found in DOM");
    return;
  }

  // ✅ Initialize Swiper
  const newsSwiper2 = new Swiper(".newsSwiper2", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: false,

    navigation: {
      nextEl: ".news-next2",
      prevEl: ".news-prev2",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });

});