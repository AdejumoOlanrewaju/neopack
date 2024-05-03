class CarouselSuper{
    
    constructor(){
        // <!-----   DOM Elements Selection   ---- >

        this.carouselContainer = document.querySelector(".carousel-container")
        this.carouselItems = document.querySelectorAll(".carousel-item")
        this.nextBtn = document.querySelector(".next-btn")
        this.prevBtn = document.querySelector(".prev-btn")
        this.pagDots = document.querySelectorAll(".carousel-dot")
        this.intervalId = 0
        this.counter = 0

        // <!-----   DOM Elements Selection   ---->



        // <!-----   DOM Elements PRESET  ---->
        this.pagDots[this.counter].classList.add("active-dot")
        this.carouselContainer.style.position = "relative"
        this.carouselItems.forEach(items => {
            items.style.position = "absolute"
            items.style.transform = "translateX(-100%)"
        })
        this.carouselItems[0].style.transform = "translateX(0px)"
        // <!-----   DOM PRESET -------------->


    }


    scrollBtnFunc(){
        // <!-----   Event listeners for next and prev Buttons -------------->

        this.nextBtn.addEventListener("click", () => this.nextImage())
        this.prevBtn.addEventListener("click", () => this.prevImage())

        // <!-----   Event listeners for next and prev Buttons -------------->
    
    }

    nextImage(){
        // <!----- function to bring in the next image -------------->

        if(this.counter <= this.carouselItems.length - 1){
            this.carouselItems[this.counter].style.animation = "next1 .5s ease forwards"
            
            if(this.counter >= this.carouselItems.length - 1){
                this.counter = 0
            }else{
                this.counter++
            }

            this.carouselItems[this.counter].style.animation = "next2 .5s ease forwards"

            this.slideactiveDots(this.counter)
        }

        // <!----- function to bring in the next image -------------->

    }

    prevImage(){
        // <!----- This is to bring in the previous image -------------->

        if(this.counter <= this.carouselItems.length - 1){
            this.carouselItems[this.counter].style.animation = "prev1 .5s ease forwards"
        

            if(this.counter <= 0){
                this.counter = this.carouselItems.length - 1
            }else{
                this.counter--
            }

            this.carouselItems[this.counter].style.animation = "prev2 .5s ease forwards"
           
            this.slideactiveDots(this.counter)
        }

        // <!----- This is to bring in the previous image -------------->
    
    }

    setPaginationDots(){
        // <!----- Getting the individual pagination dots and adding a listener to run the function to move the images when clicked -------------->
        
        for(let [index, d] of this.pagDots.entries()){
            d.addEventListener("click", () => {
                this.slideWithDots(index) 
            })
        }

        // <!----- Getting the individual pagination dots and adding a listener to run the function to move the images when clicked -------------->

    }

    slideWithDots(index = 0){
        // <!----- This is to allow the images to move when the dots(buttons at the bottom) are clicked -------------->

        let targetIndex = index
        if(index <= this.carouselItems.length - 1){
            if (targetIndex > this.counter){
                this.carouselItems[this.counter].style.animation = "next1 .5s ease forwards"
                
                this.counter = targetIndex
            
                this.carouselItems[targetIndex].style.animation = "next2 .5s ease forwards"
            }else if(targetIndex == this.counter) {
                return
            }else{
                this.carouselItems[this.counter].style.animation = "prev1 .5s ease forwards"

                this.counter = targetIndex
            
                this.carouselItems[targetIndex].style.animation = "prev2 .5s ease forwards"
            }
        }else{
            return
        }
    
        this.counter = index
        this.slideactiveDots(this.counter)
        // <!----- This is to allow the images to move when the dots(buttons at the bottom) are clicked -------------->

    }

    slideactiveDots(counter){
        // <!----- This is to change the active state of the dots in response to the carousel movement -------------->

        this.pagDots.forEach(dot => {
            dot.classList.remove("active-dot")
        })
    
        this.pagDots[counter].classList.add("active-dot")

        // <!----- This is to change the active state of the dots in response to the carousel movement -------------->

    
    }

    autoSlide(){
        // <!----- This is to enable autoslide by running nextImage function every 4 secs -------------->

        this.intervalId = setInterval(() => {
                this.nextImage()
                this.slideactiveDots(this.counter)
        }, 4000)

        // <!----- This is to enable autoslide by running nextImage function every 4 secs -------------->

    }

    clearAnim (){
        //<!------ Stops the autoSlide functionality any time this function is called ---------->
        
        clearInterval(this.intervalId)

        //<!------ Stop the autoSlide functionality any time this function is called ---------->

    }

    endAnimOnHover(elements){
        //<!------ Start and Stop the autoSlide feature when you  mouseOver and mouseOut on elements passed in the argument of this function  ---------->

        elements.forEach(el => {
            el.addEventListener("mouseover", () => this.clearAnim())
            el.addEventListener("mouseout", () => this.autoSlide())
        })

        //<!------ Start and Stop the autoSlide feature when you  mouseOver and mouseOut on elements passed in the argument of this function  ---------->

    }

    toggleAutoSlide(){
        //<!------ This is where the elements to toggle the autoSlide feature are called and passed to the endAnimOnHover method  ---------->
        
        let carouselButtons = this.carouselContainer.querySelectorAll("button")
        let carouselLinks = this.carouselContainer.querySelectorAll("a")
        this.endAnimOnHover(carouselButtons)
        this.endAnimOnHover(carouselLinks)

        //<!------ This is where the elements to toggle the autoSlide feature are called and passed to the endAnimOnHover method  ---------->
        

    }

    touchSlide(){
        //<!------ This is to allow users to scroll the carousel on mobile  ---------->
        
        let touchStartX
        let touchEndX
        let touchDistance
        let threshold = 50
        let onlySwipe = false
        this.carouselContainer.addEventListener("touchstart", (e) => {
            touchStartX = e.touches[0].clientX
            this.clearAnim()
        })
    
        this.carouselContainer.addEventListener("touchmove", (e) => {
            touchEndX = e.touches[0].clientX
            onlySwipe = true
        })
    
        this.carouselContainer.addEventListener("touchend", (e) => {
            touchDistance = touchStartX - touchEndX 
        // <!------ swipe right ------>
            if(touchDistance > threshold){
                if(onlySwipe == true){
                    this.nextImage()
                }
            }
        // <!------ swipe right ------>
        
        // <!------ swipe left ------>
            if(touchDistance < -threshold){
                if(onlySwipe == true){
                    this.prevImage()
                }
            }
        // <!------ swipe left ------>

            this.slideactiveDots(this.counter)
            onlySwipe = false
            this.autoSlide()

        //<!------ This is to allow users to scroll the carousel on mobile  ---------->
        
        })
    }

    start(){
        // <!------ initialization Methods ------>
            this.scrollBtnFunc()
            this.setPaginationDots()
            this.autoSlide()
            this.toggleAutoSlide()
            this.touchSlide()
        // <!------ initialization Methods ------>
    }
  
}

// export default CarouselSuper

class AccordionSuper{
    constructor(){
        this.accordion = document.querySelectorAll(".accordion-item")
        this.accordionDetails = document.querySelectorAll(".accordion-details")
    }

    start(){
        this.accordionDetails.classList.add("default-accord")
        this.accordion.forEach(el => {
            el.onclick = function(){    
                // accordionDetails.forEach((details) => {
                //     details.classList.add("remove")
                // })
                // this.querySelector(".accordion-details").classList.remove("remove")
                this.querySelector(".accordion-details").classList.toggle("accord-show")
            }
        })
    }
}

// export default AccordionSuper

class TestimonialSuper{
    constructor(){
        this.reviewContainer = document.querySelectorAll(".review-card-container")
        this.nextBtn = document.querySelectorAll(".next-review-btn")
        this.prevBtn = document.querySelectorAll(".prev-review-btn")
        // this.reviewContainerWidth =  this.reviewContainer.forEach(el => el.clientWidth)
        // this.reviewContainerScrollX = Math.ceil(this.reviewContainer.scrollLeft)
    }

    moveReviewBtn(){
        this.nextBtn.forEach(el => el.addEventListener("click", () => this.nextReview()))
        this.prevBtn.forEach(el => el.addEventListener("click", () => this.prevReview()))
    }

    nextReview(){
        this.reviewContainer.forEach(el => {
            let nextReviewPosition = el.scrollLeft + el.clientWidth
            el.scrollLeft = nextReviewPosition
        })
    } 

    prevReview(){
        this.reviewContainer.forEach(el => {
            let nextReviewPosition = el.scrollLeft - el.clientWidth
            el.scrollLeft = nextReviewPosition
        })
    } 



    start(){
        this.moveReviewBtn()
    }
}

new TestimonialSuper().start()

// export default TestimonialSuper

class IntersectionSuper{
    constructor(){
        // this.multiplier = 2
        // this.animations = [
        //     {
        //         element : document.querySelectorAll(".neo-slide-left"),
        //         prevClass : "neo-slide-left",
        //         animClass : "neo-anim-left",
        //         delayMultiplier : this.multiplier 
        //     },
        //     {
        //         element : document.querySelectorAll(".neo-slide-right"),
        //         prevClass : "neo-slide-right",
        //         animClass : "neo-anim-right",
        //         delayMultiplier : (this.multiplier - 1)
        //     },
        //     {
        //         element : document.querySelectorAll(".neo-slide-up"),
        //         prevClass : "neo-slide-up",
        //         animClass : "neo-anim-up",
        //         delayMultiplier : this.multiplier
        //     },
        //     {
        //         element : document.querySelectorAll(".neo-slide-down"),
        //         prevClass : "neo-slide-down",
        //         animClass : "neo-anim-down",
        //         delayMultiplier : this.multiplier
        //     },
        //     {
        //         element : document.querySelectorAll(".neo-scale-up"),
        //         prevClass : "neo-scale-up",
        //         animClass : "neo-anim-scale",
        //         delayMultiplier : this.multiplier
        //     },
        // ]
        this.slideLeft = document.querySelectorAll(".neo-slide-left")
        this.slideRight = document.querySelectorAll(".neo-slide-right")
        this.slideUp = document.querySelectorAll(".neo-slide-up")
        this.slideDown = document.querySelectorAll(".neo-slide-down")
        // this.scaleUp = document.querySelectorAll(".neo-scale-up")
    }

    animateElement(elem, prevClass, anim, delayMultiplier){
        let options = {
            root : null,
            rootMargin : "0px",
            threshold : 0.9
        }

        let callback = (entries, observer) => {
            let fixedDelay = 0.5
            let maximumDelay = 2
            entries.forEach((entry, index) => {
                if(entry.isIntersecting){
                    if(entry.target.nextElementSibling && entry.target.nextElementSibling.className.includes("neo-anim")){
                            console.log("has anim sibling")
                            console.log(entries, index)
                            let delayIndex = index == 0 ? fixedDelay : index * fixedDelay
                            let delay = Math.min(delayIndex, maximumDelay)
                            entry.target.nextElementSibling.style.animationDelay = `${delay}s`
                    }
                    entry.target.classList.replace(prevClass, anim)
                }
            }) 
        }

        let observer = new IntersectionObserver(callback, options)
        
        elem.forEach(el => {
            observer.observe(el)
        })
}

    start(){
        // this.animations.forEach(animObj => {
        //     this.animateElement(animObj.element, animObj.prevClass, animObj.animClass, animObj.delayMultiplier)
        // })

        this.animateElement(this.slideLeft, "neo-slide-left", "neo-anim-left", 2)
        this.animateElement(this.slideRight, "neo-slide-right", "neo-anim-right", 2)
        this.animateElement(this.slideUp, "neo-slide-up", "neo-anim-up", 2)
        this.animateElement(this.slideDown, "neo-slide-down", "neo-anim-down", 2)
    }
}

new IntersectionSuper().start()

class navSuper{
    constructor(){
        this.hamburger = document.querySelectorAll(".neo-hamburger")
    }

    hamburgerClick(){
        this.hamburger.forEach(el => {
            el.addEventListener('click', () => {
                this.navDown()
                this.navLeft()
                this.navRight()
            })
        })
    }

    navDown(){
        this.mobileNavDown = document.querySelectorAll(".neo-mobile-nav_down")
        if(this.mobileNavDown){
            console.log(this.mobileNavDown)
            this.mobileNavDown.forEach(el => el.classList.toggle("neo-close-mobile-nav_down"))
            // this.mobileNavDown.forEach(el => el.classList.remove("neo-mobile-nav_down"))
        
        }
    }

    navLeft(){
        this.mobileNavLeft = document.querySelectorAll(".neo-mobile-nav_left")
        
        if(this.mobileNavLeft){
            this.mobileNavLeft.forEach(el => el.classList.replace("neo-mobile-nav_left", "neo-close-mobile-nav_left"))

        }
    }

    navRight(){
        this.mobileNavRight = document.querySelectorAll(".neo-mobile-nav_right")

        if(this.mobileNavRight){
            this.mobileNavRight.forEach(el => el.classList.replace("neo-mobile-nav_right", "neo-close-mobile-nav_right"))
        }
    }

    start(){
        this.hamburgerClick()
    }
}

new navSuper().start()

class PopupSuper{
    constructor(){

    }
}

// export default IntersectionSuper

// class navSuper{
//     constructor(){

//     }
// }

// this.mobileNavDown = document.querySelectorAll(".neo-mobile-nav_down")
// this.mobileNavLeft = document.querySelectorAll(".neo-mobile-nav_left")
// this.mobileNavRight = document.querySelectorAll(".neo-mobile-nav_right")

// if(this.mobileNavDown){
//     this.hamburger.addEventListener('click', () => this.navUp())
// }else if(this.mobileNavLeft){
//     this.hamburger.addEventListener('click', () => this.navUp())
// }else if(this.mobileNavRight){
//     this.hamburger.addEventListener('click', () => this.navUp())
// }

// export default IntersectionSuper