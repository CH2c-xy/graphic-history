//scroll effect for description pages using fullpage.js

new fullpage('#fullpage', {
    autoScrolling: true, //whether to use automatic scrolling or normal one, and makes it fit within window
    navigation: true, //whether navigation dots show up
    onLeave: (origin, destination) => { //once a user leaves a section (origin: starting page)

        const section = destination.item; //switches to each new section as you scroll

        if (destination.index !== 0) { //index of sections the animation will be on (the index starts at 0, so all except 0)

            const tl = new TimelineMax({ delay: 0.5 }); //delays transition so it can be seen after you scroll

            const title = section.querySelector("h2");
            const art = document.querySelectorAll(".art");
            const text = document.querySelectorAll(".text");

            //animations
            //.fromTo(what, animation duration in seconds, {where it should start (from)}, {where it should end (to)})
            tl.fromTo(title, 0.5, { x: "150", opacity: 0 }, { x: "40", opacity: 1 })
                .fromTo(text, 0.5, { y: "50", opacity: 0 }, { y: "-50", opacity: 1 })
                .fromTo(art, 0.7, { x: "-250%", opacity: 0 }, { x: "-60%", opacity: 1 });
        }
    }
});

