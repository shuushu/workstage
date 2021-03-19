import { useEffect, useState } from "react";
import { TweenMax, TimelineMax, TweenLite, Elastic, Expo, Power4, gsap, Power1 } from "gsap";
import Draggable from "gsap/Draggable";
import styled from "styled-components"
import useWindowSize from "../hooks/useWindowSize";

gsap.registerPlugin(Draggable);

const Text = styled.text`
    text-anchor: middle;
    font-weight: 700;
    font-size: 14px;    
    letter-spacing: -0.4px;
    user-select: none;
    -webkit-user-select: none;
    pointer-events: none;
    text-rendering: optimizeSpeed;
`
const UpText = styled(Text)`
    font-size: 24px;
    letter-spacing: 0.4px;
`;

const WarpBox = styled.div`
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: ${props => props.color}
`

const SvgRange = (params) => {
    const [width, height] = useWindowSize();
    const { scale, textColor, background } = params;

    useEffect(() => {
        let select =  (s) => document.querySelector(s),
            dragger = select('#dragger'),
            dragVal,
            maxDrag = 300;

        TweenMax.set('svg', { visibility: 'visible' })
        TweenLite.defaultEase = Elastic.easeOut.config(0.4, 0.1);

        let tl = new TimelineMax({
            paused: true
        });

        tl.addLabel("blobUp", '+=0.2')
        .to('#display', 1, { attr: { cy: '-=40', r: 30 } })
        .to('#dragger', 1, { attr: { r: 8  }}, '-=1')
        .set('#dragger', { strokeWidth: 4}, '-=1')
        .to('.downText', 1, { alpha: 0, transformOrigin: '50% 50%' }, '-=1')
        .to('.upText', 1, { alpha: 1, transformOrigin: '50% 50%' }, '-=1')
        .addPause()
        .addLabel("blobDown", '+=0.05')
        .to('#display', 1, {
            attr: { cy: 299.5, r: 0 },
            ease: Expo.easeOut
        })
        .to('#dragger', 1, {
            attr: { r: 15 }
        }, '-=1')
        .set('#dragger', { strokeWidth: 0 }, '-=1')
        .to('.downText', 1, { alpha: 1, ease: Power4.easeOut }, '-=1')
        .to('.upText', 0.2, {
            alpha: 0,
            ease: Power4.easeOut,
            attr: {
                y: '+=45'
            }
        }, '-=1')

        Draggable.create(dragger, {
            type: 'x',
            cursor: 'pointer',
            throwProps: true,
            bounds: {
                minX: 0,
                maxX: maxDrag,
                minY: 0,
                maxY: 0,
            },
            onPress: function() {
                tl.play('blobUp')
            },
            onRelease: function() {
                tl.play('blobDown')
            },
            onDrag: dragUpdate,
            onThrowUpdate: dragUpdate,
            onDragEnd: () => {
                console.log(`x값: ${Number(gsap.getProperty(dragger, "x"))}, dragVal: ${dragVal}`)
            }
        })
        function dragUpdate() {            
            const axisX = Number(gsap.getProperty(dragger, "x"));
            dragVal = Math.round((axisX/ maxDrag) * 100);
            select('.downText').textContent = select('.upText').textContent = dragVal;
            
            TweenMax.to('#display', .5, { x: axisX })
            TweenMax.staggerTo(['.upText', '.downText'], 1, {
                x: axisX,
                ease: Elastic.easeOut.config(0.1, 1.4)
            }, 0.02)
        }
        // initialize
         TweenMax.to(dragger, 1, {
             x: 150,
             onUpdate: dragUpdate,
             ease: Power1.easeInOut
         })
        
        return () => {
            console.log('out')
        }
    }, [])
    return (
        <WarpBox color={background}>
            <svg id="range-canvas" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={ width } height="300" viewBox={ `0 0 600 300` } style={{ transform: `scale(${scale})`}}>
                <defs>
                    <filter id="goo" colorInterpolationFilters="sRGB">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" result="cm" />
                    </filter>
                </defs>
                <g id="dragGroup" style={{transformOrigin: 'center', transform: `translateY(-50%)`}}>
                    
                    {/* <path id="dragBar" stroke="#FFFFFF" d="M10 10 l300 0" strokeLinecap="round" strokeWidth="14" /> */}
                    <path id="dragBar" fill="#FFFFFF" d="M447,299.5c0,1.4-1.1,2.5-2.5,2.5h-296c-1.4,0-2.5-1.1-2.5-2.5l0,0c0-1.4,1.1-2.5,2.5-2.5
                        h296C445.9,297,447,298.1,447,299.5L447,299.5z" />
                    <g id="displayGroup">
                        <g id="gooGroup" filter="url(#goo)">
                            <circle id="display" fill="#FFFFFF" cx="146" cy="299.5" r="16" />
                            <circle id="dragger" fill="#FFFFFF"  stroke={textColor} strokeWidth="0" cx="146" cy="299.5" r="15" />
                        </g>
                        <Text className="downText" x="146" y="304" fill={textColor}>0</Text>
                        <UpText className="upText" x="145" y="266" fill={textColor}>0</UpText>
                    </g>
                </g>
            </svg>
        </WarpBox>
    );
}

export {
    SvgRange
}