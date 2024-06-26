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