// https://scrollmagic.io/examples/basic/simple_pinning.html
import * as ScrollMagic from "scrollmagic"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { TweenMax, TimelineMax } from "gsap"; // Also works with TweenLite and TimelineLite
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { ScrollMagicPluginIndicator} from "scrollmagic-plugins";

ScrollMagicPluginIndicator(ScrollMagic);
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

const animating_with_GSAP = `
    <div class="scrollContent" >
        <section id="titlechart">
            <div id="description">
                <h1 class="badge gsap">Simple Tweening</h1>
                <h2>Two examples of basic animation.</h2>
                <ol>
                    <li>When no duration is defined for the scene, the tween will simply start playing when the scroll reaches the trigger position.</li>
                    <li>If the scene has a duration the progress of the tween will directly correspond to the scroll position.</li>
                </ol>
                <p>
                    This example uses the shorthand version of <a href="../../docs/animation.GSAP.html#Scene.setTween">Scene.setTween()</a> to add <a href="http://greensock.com/docs/#/HTML5/GSAP/TweenMax/to/" target="_blank">TweenMax.to()</a> animations.<br>
                    To see how to build more advanced tweens check out the <a href="../advanced/advanced_tweening.html">Advanced Tweening Example</a><a>.
                </a></p><a>
                </a><a href="#" class="viewsource">view source</a>
            </div>
        </section>
        <section class="demo">
            <div class="spacer s2"></div>
            <div id="trigger1" class="spacer s0"></div>
            <div id="animate1" class="box2 skin">
                <p>You wouldn't like me, when I'm angry!</p>
                <a href="#" class="viewsource">view source</a>
            </div>
            <div class="spacer s2"></div>
        </section>
        <section class="demo">
            <div class="spacer s1"></div>
            <div id="trigger2" class="spacer s1"></div>
            <div class="spacer s0"></div>
            <div id="animate2" class="box1 black">
                <p>Smurf me!</p>
                <a href="#" class="viewsource">view source</a>
            </div>
            <div class="spacer s2"></div>
        </section>
        <div class="spacer s_viewport"></div>
    </div>
`
const animating_with_GSAP_f = () => {
    var controller = new ScrollMagic.Controller();
    let scene = [];
    const v1 = new ScrollMagic.Scene({
            triggerElement: "#trigger1"
        })
        .setTween("#animate1", 0.5, {backgroundColor: "green", scale: 2.5, overwrite: false}) // trigger a TweenMax.to tween
        .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
        .addTo(controller);
    
    scene.push(v1);
    const v2 = new ScrollMagic.Scene({triggerElement: "#trigger2", duration: 300})
        // animate color and top border in relation to scroll position
        .setTween("#animate2", {borderTop: "30px solid white", backgroundColor: "blue", scale: 0.7, overwrite: false, immediateRender: false}) // the tween durtion can be omitted and defaults to 1
        .addIndicators({name: "2 (duration: 300)"}) // add indicators (requires plugin)
        .addTo(controller);
    scene.push(v2);
    return { controller, scene }
}

const section_wipes_natural = `
<style type="text/css">
	.panel {
		height: 100%;
		width: 100%;
	}
	.panel.green {
		margin-bottom: 400px
	}
</style>
<section class="panel blue">
	<b>ONE</b>
</section>
<section class="panel turqoise">
	<b>TWO</b>
</section>
<section class="panel green">
	<b>THREE</b>
</section>
<section class="panel bordeaux">
	<b>FOUR</b>
</section>
`
const section_wipes_natural_f = () => {
    // init
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave',
            duration: "200%" // this works just fine with duration 0 as well
            // However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
            // Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
        }
    });

    // get all slides
    var slides = document.querySelectorAll("section.panel");
    var scene = [];
    // create scene for every slide
    for (var i=0; i<slides.length; i++) {
        const v = new ScrollMagic.Scene({
                triggerElement: slides[i]
            })
            .setPin(slides[i], {pushFollowers: false})
            //.addIndicators() // add indicators (requires plugin)
            .addTo(controller);
        scene.push(v)
    }

    return { controller, scene }
}

const section_slides = `
<style type="text/css">
	#pinContainer {
		width: 100%;
		height: 100%;
		overflow: hidden;
		-webkit-perspective: 1000;
		        perspective: 1000;
	}
	#slideContainer {
		width: 400%; /* to contain 4 panels, each with 100% of window width */
		height: 100%;
	}
	.panel {
		height: 100%;
		width: 25%; /* relative to parent -> 25% of 400% = 100% of window width */
		float: left;
	}
</style>
<div id="pinContainer">
	<div id="slideContainer">
		<section class="panel blue">
			<b>ONE</b>
		</section>
		<section class="panel turqoise">
			<b>TWO</b>
		</section>
		<section class="panel green">
			<b>THREE</b>
		</section>
		<section class="panel bordeaux">
			<b>FOUR</b>
		</section>
	</div>
</div>
`
const section_slides_f = () => {
    const controller = new ScrollMagic.Controller();
    const scene = []
    // define movement of panels
    const wipeAnimation = new TimelineMax()
        // animate to second panel
        .to("#slideContainer", 0.5, {z: -150})		// move back in 3D space
        .to("#slideContainer", 1,   {x: "-25%"})	// move in to first panel
        .to("#slideContainer", 0.5, {z: 0})				// move back to origin in 3D space
        // animate to third panel
        .to("#slideContainer", 0.5, {z: -50, delay: 1})
        .to("#slideContainer", 1,   {x: "-50%"})
        .to("#slideContainer", 0.5, {z: 0})
        // animate to forth panel
        .to("#slideContainer", 0.5, {z: -150, delay: 1})
        .to("#slideContainer", 1,   {x: "-75%"})
        .to("#slideContainer", 0.5, {z: 0, immediateRender: false});

    // create scene to pin and link animation
    scene.push(new ScrollMagic.Scene({
            triggerElement: "#pinContainer",
            triggerHook: "onLeave",
            duration: "500%"
        })
        .setPin("#pinContainer")
        .setTween(wipeAnimation)
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller)
    )
    return {controller, scene}
}

export {
    animating_with_GSAP,
    animating_with_GSAP_f,
    section_wipes_natural,
    section_wipes_natural_f,
    section_slides,
    section_slides_f
}