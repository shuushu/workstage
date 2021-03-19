import { useEffect } from "react";
// [library] https://scrollmagic.io/
const LayoutScroll = (props) => {
    let { children } = props;
    return (
        <div id="global-geo">
            { children }
        </div>
    );
}

export {
    LayoutScroll
}