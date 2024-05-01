import { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Restaurant } from "@/types/restaurant";
import { Maybe } from "@/types/helpers";

const defaultMapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '15px 0px 0px 15px',
};

//Default zoom level, can be adjusted
const defaultMapZoom = 17

//Map options
const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
};


type MapProps = {
    restaurants: Array<Restaurant>;
    activeRestaurant: Maybe<Restaurant>;
};

export default function Map({ restaurants, activeRestaurant }: MapProps) {

    const [centerMapCoords, setCenterMapCoords] = useState<{ lat: number, lng: number }>({
        lat: 40.416192,
        lng: -3.703339
    });

    useEffect(() => {
        if (activeRestaurant) {
            const { lat, lng } = activeRestaurant.latlng;
            setCenterMapCoords({ lat, lng });
        }
    }, [activeRestaurant]);

    useEffect(() => {
        if (restaurants.length > 0) {
            const { lat, lng } = restaurants[0].latlng;
            setCenterMapCoords({ lat, lng });
        }
    }, [restaurants]);

    return (
        <div className="z-0 w-full h-full">
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                mapContainerClassName="z-0"
                center={centerMapCoords}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
                {restaurants.map((restaurant, index) => (
                    <Marker
                        title={restaurant.name}
                        opacity={restaurant._id === activeRestaurant?._id ? 1 : 0.5}
                        key={index}
                        position={{ lat: restaurant.latlng.lat, lng: restaurant.latlng.lng }}
                    />
                ))}
            </GoogleMap>
        </div>
    )
};
