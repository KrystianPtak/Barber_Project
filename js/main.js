// ********** NAV BGC **********
const navBgc = document.querySelector("nav");

window.addEventListener("scroll", () => {
	if (window.scrollY > 40) {
		navBgc.classList.add("nav--bgc");
	} else {
		navBgc.classList.remove("nav--bgc");
	}
});

//********** NAV LINKS **********
const burgerBtn = document.querySelector(".burger");
const openNav = document.querySelector(".fa-bars");
const closeNav = document.querySelector(".fa-xmark");
const nav = document.querySelector(".nav__links");
const navAll = document.querySelectorAll(".nav__link");

burgerBtn.addEventListener("click", () => {
	nav.classList.toggle("burger--open");
	openNav.classList.toggle("burger--hide");
	closeNav.classList.toggle("burger--hide");

	navAll.forEach((link) => {
		link.addEventListener("click", () => {
			nav.classList.remove("burger--open");
			closeNav.classList.add("burger--hide");
			openNav.classList.remove("burger--hide");
		});
	});
});

//********** TOP **********
const scrollToTop = document.querySelector(".scroll-btn");

window.addEventListener("scroll", function () {
	if (window.scrollY > 400) {
		scrollToTop.classList.add("scroll-btn--arrow");
	} else {
		scrollToTop.classList.remove("scroll-btn--arrow");
	}
});

scrollToTop.addEventListener("click", () => {
	window.scroll({
		top: 0,
		behavior: "smooth",
	});
});

// **********REVEAL ON SCROLL**********
const reveal = () => {
	const elements = document.querySelectorAll(".reveal, .move, .moves");
	const windowHeight = window.innerHeight;
	const revealPoint = 150;
	const revealPointSmall = 20;

	elements.forEach((element) => {
		const revealTop = element.getBoundingClientRect().top;

		if (revealTop < windowHeight - revealPoint) {
			element.classList.add("active");
		}
		if (
			(element.classList.contains("move") &&
				revealTop < windowHeight - revealPointSmall) ||
			(element.classList.contains("moves") &&
				revealTop < windowHeight - revealPoint)
		) {
			element.style.opacity = "1";
			element.style.transform = "translateX(0)";
		}
	});
};
window.addEventListener("scroll", reveal);

//********** MODAL **********
const modal = document.querySelector(".modal__bgc");
const closeModal = document.querySelector(".modal__icon");
const openModal = document.querySelector(".header__btn");
const transformBtn = document.querySelector(".transform__btn");
const cotanctName = document.querySelector(".modal__contact-name");
const cotanctPhone = document.querySelector(".modal__contact-phone");

const handleModalOpen = () => {
	modal.classList.remove("modal__bgc--hidden");
	cotanctName.value = "";
	cotanctPhone.value = "";
	submitError.textContent = "";
};

const handleModalClose = () => {
	modal.classList.add("modal__bgc--hidden");
};

const handleModalClick = (e) => {
	if (e.target === modal) {
		handleModalClose();
	}
};

const handleKeyDown = (e) => {
	if (e.key === "Escape") {
		handleModalClose();
	}
};

openModal.addEventListener("click", handleModalOpen);
transformBtn.addEventListener("click", handleModalOpen);
closeModal.addEventListener("click", handleModalClose);
modal.addEventListener("click", handleModalClick);
window.addEventListener("keydown", handleKeyDown);

const modalBtn = document.querySelector(".modal__btn");
const nameError = document.querySelector(".modal__name-error");
const phoneError = document.querySelector(".modal__phone-error");
const submitError = document.querySelector(".modal__submit-error");

const keyDown = (e) => {
	if (e.key === "Enter") {
		forms(e);
	}
};

function forms(e) {
	e.preventDefault();

	if (cotanctName.value === "") {
		nameError.textContent = "Name is required";
		cotanctName.classList.add("modal--border");
	} else {
		nameError.textContent = "";
		cotanctName.classList.remove("modal--border");
	}
	if (cotanctPhone.value === "") {
		phoneError.textContent = "Phone is required";
		cotanctPhone.classList.add("modal--border");
	} else {
		phoneError.textContent = "";
		cotanctPhone.classList.remove("modal--border");
	}
	if (cotanctName.value !== "" && cotanctPhone.value !== "") {
		submitError.textContent = "Your message was sent successfully";
		submitError.style.color = "green";
		setTimeout(function () {
			modal.classList.add("modal__bgc--hidden");
		}, 4000);
	}
}
modalBtn.addEventListener("click", forms);

// ********** SLIDER **********
const slider = document.querySelector(".testimonials__slider");
const slides = document.querySelectorAll(".testimonials__slide");
const slideWidth = slides[0].offsetWidth;
let currentIndex = 0;

function slideTo(index) {
	if (index < 0 || index >= slides.length) {
		return;
	}

	slider.style.transform = `translateX(-${slideWidth * index}px)`;
	currentIndex = index;

	slides.forEach((slide, i) => {
		if (i === index) {
			slide.classList.add("testimonials__slide--active");
		} else if (
			i === currentIndex - 1 ||
			(currentIndex === 0 && i === slides.length - 1)
		) {
			slide.classList.add("testimonials__slide--previous");
		} else {
			slide.classList.remove(
				"testimonials__slide--active",
				"testimonials__slide--previous"
			);
		}
	});
}

function nextSlide() {
	if (currentIndex === slides.length - 1) {
		slideTo(0);
	} else {
		slideTo(currentIndex + 1);
	}
}

function previousSlide() {
	if (currentIndex === 0) {
		slideTo(slides.length - 1);
	} else {
		slideTo(currentIndex - 1);
	}
}
setInterval(nextSlide, 3000);

//**********COPY EMAIL**********
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
const contactMessage = document.querySelector(".contact__message");

emailLinks.forEach((link) => {
	link.addEventListener("click", async (event) => {
		event.preventDefault();
		const email = link.getAttribute("href").replace("mailto:", "");

		try {
			await navigator.clipboard.writeText(email);
			contactMessage.style.display = "block";
			setTimeout(() => {
				contactMessage.style.display = "none";
			}, 2000);
		} catch (err) {}
	});
});

//**********FOOTER DATE **********
const currentYear = document.querySelector(".year");
currentYear.innerText = new Date().getFullYear();
