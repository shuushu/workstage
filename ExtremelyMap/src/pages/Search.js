import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";

const g = window;

function SearchView(props) {
  const { setName } = props;
  let { id } = useParams();
  let marker;

  useEffect(() => {
    if (marker) {
      marker.remove();
    }

    g.KAKAO.keywordSearch(id.substr(1), placesSearchCB);

    function placesSearchCB(data, status) {
      if (status === g.kakao.maps.services.Status.OK) {
        if (data.length > 0) {
          // 맵이동
          g.map.flyTo({
            center: [data[0].x, data[0].y],
            essential: true,
            zoom: 11,
          });
          marker = new mapboxgl.Marker()
            .setLngLat([data[0].x, data[0].y])
            .addTo(g.map);
        } else {
          //setFieldHelpText("검색 결과 없음");
        }
      }
    }
    return () => {
      marker.remove();
    };
  }, [id]);

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}
export default SearchView;
