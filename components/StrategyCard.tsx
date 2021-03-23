import { useEffect, useState } from "react";
import styled from "styled-components"
import { gsap } from "gsap";
import Draggable from 'gsap/Draggable'
import inertia from 'gsap/InertiaPlugin'
import CardImage from "./Card+image";
gsap.registerPlugin(Draggable, inertia)
/* *
    후보자 공약,  카드 형태로 보여 주기?
 */

const Wrap = styled.div`
    --height: 50vh;
    --width: calc(var(--height) / 1.61);
    --origin: calc(var(--height) * 5);
    pointer-events: all;
    height: var(--height);
    width: 100vw;
    cursor: grab;
`
const DragArea = styled.div`
    width: 100vw;
    height: 300%;
    position: absolute;
    left: 0px;
    transform: translate(0, 0) translate3d(0,0,0) !important;
`
const ContetnsWrapping = styled.div`
    width: var(--width);
    height: 100vh;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`
const ItemWrap = styled.div`
    transform: rotate(0rad);
    transform-origin: calc(var(--width) / 2) var(--origin);
    transition: all 0.3s;
`
const Items = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    height: var(--height);
    width: var(--width);
    transform-origin: 50% var(--origin);
    transition: all 1s;
`

let drag;
const select = (node: string) => document.querySelector(node);
const StrategyCard = (props) => {
    const { data } = props;
    
    useEffect(() => {
        let position = [];
        // 카드 가로
        const WIDTH = select('.itemsWrap').clientWidth;
        // 초기 위치값 계산
        const items = document.querySelectorAll('.items');
        let centerIdx = Math.floor(items.length/2);
        // 가로 세로 비율	
        (Array.prototype.slice.call(items)).map((node,i) => {
            const ratio = (node.clientHeight / node.clientWidth);
            node.setAttribute('style',`transform: rotate(${(i-centerIdx)*10}deg)`);
            position.push(((i-centerIdx)* -1.739739) * 0.1);
        });

        drag = Draggable.create(".dragArea", {
            type:"x",
            throwProps: false,
            inertia: false,
            bounds: {
                minX: Math.round(position[items.length-1] *WIDTH*(items.length+1)), 
                minY: 0, 
                maxX: Math.floor(position[0] * 1100),
                maxY: 0
            },
            onDrag: function (e) {
                select('.itemsWrap').setAttribute('style', `transform: rotate(${this.x * 0.001}rad)`);
            },
            onDragEnd: function(){
                const v = (this.x / (WIDTH / (items.length - 1)))/items.length;
                const cacul: number = Number(Math.abs(v- centerIdx));
                let getIdx = 0;
                // 마지막 장면 처리
                if (Math.floor(cacul) > centerIdx) {
                    getIdx = Math.round(cacul);
                } else {
                    // 최초 장면 처리 로직
                    getIdx = Math.floor(cacul)
                }
                let dis = Math.floor(position[getIdx] * WIDTH);
                select('.itemsWrap').setAttribute('style', `transform: rotate(${position[getIdx]}rad)`);
                select('.dragArea').setAttribute('style', `touch-action: pan-y; cursor: grab; user-select: none; z-index: 1031; transform: translate3d(${dis}px, 0px, 0px);`)
            }
        });
        return () => {
            if (drag) {
                drag[0].kill();
                drag = null;
            }
        }
    }, [])


    return (
        <div style={{ position: 'relative', height: '100%', overflow: 'hidden'}}>
            <Wrap>
            <DragArea className='dragArea'>
                <ContetnsWrapping>
                    <ItemWrap className="itemsWrap">
                            {
                                Object.entries(data).map((k: any, v) => {
                                    return (
                                        <Items key={`card-items${v}`} className="items">
                                            <CardImage {...k[1]} />
                                        </Items>
                                    )
                                })                     
                            }
                    </ItemWrap>
                </ContetnsWrapping>
            </DragArea>
            </Wrap>
        </div>
    )
}

export {
    StrategyCard
}