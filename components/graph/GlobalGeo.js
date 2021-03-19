import define from "./geoCore.js";
import { Runtime, Library, Inspector } from "./core/runtime.js";
import { useEffect } from "react";
import * as d3 from 'd3';

const GlobalGeo = (arg) => {
    useEffect(() => {
        window.optGlobalGeo = arg;
        const runtime = new Runtime();
        runtime.module(define, name => {
            if (name === 'canvas' || name === 'html') {
                return new Inspector(document.getElementById('global-geo'))
            }
        });
        return () => {
            d3.selectAll('*').transition();
        }
    }, []);
    return (
        <div id="global-geo"></div>
    );
}

export {
    GlobalGeo
}