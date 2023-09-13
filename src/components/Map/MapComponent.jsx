import { GoogleMap, Marker, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete'
import { 
    Combobox,
    ComboboxInput,
    ComboboxList,
    ComboboxPopover,
    ComboboxOption
} from '@reach/combobox'
import "@reach/combobox/styles.css"
import { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLocations } from '../../App/Features/bookingLocationSlice'


const containerStyle = {
    width: '100%',
    height: '100%',
}
let lat = -15.401430, lng = 28.356070

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
    position => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      },
    error => {
        console.error('Error getting current location:', error);
    }
    );
} else {
    console.log( { lat, lng } );
    console.error('Geolocation is not supported by this browser.');
}

const center = {
    lat: -15.401430, 
    lng: 28.356070
}

const GoogleMapComponent = ( { home, form } ) => {
    const [directions, setDirections] = useState(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);

    const [ selected, setSelected ] = useState (null)
    const [ fromSelected, setFromSelected ] = useState (null)
    const [ toSelected, setToSelected ] = useState (null)

    const dispatch = useDispatch ()

    useEffect (() => {
        function calculateDistanceAndDuration () {
            const service = new window.google.maps.DistanceMatrixService()
            service.getDistanceMatrix(
                {
                    origins: [fromSelected],
                    destinations: [toSelected],
                    travelMode: 'DRIVING',
                },
                (response, status) => {
                    if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
                    const result = response.rows[0].elements[0]
                    setDistance(result.distance.text)
                    setDuration(result.duration.text)
                    } else {
                    setDistance(null)
                    setDuration(null)
                    }
                }
            )
        }

        if ( fromSelected && toSelected ) {
            dispatch (setLocations ({ from: fromSelected, to: toSelected}))
            
            calculateDistanceAndDuration ()
        }


    }, [fromSelected, toSelected])

    const onDirectionsResponse = (result) => {
        if (result.status === 'OK') {
          setDirections(result);
        }
      };

    // const handleMarkerClick = title => {
    //     console.log(`Clicked marker: ${title}`)
    // }

    return (
        

        <LoadScript 
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
            libraries={['places']}
        >
            {
                home && <div className="div-places shadow-2xl">
                    <PlacesAutocomplete setSelected={setSelected} />
                </div>
            }
            {
                form && <div className="div-form-places bg-slate-50 rounded-xl flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <span className='block'><strong className="text-sky-500">From: </strong></span>
                        <FromPlacesAutocomplete setFromSelected={setFromSelected} label="Pickup Point" />
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className='block'><strong className="text-sky-500">To: </strong></span>
                        <ToPlacesAutocomplete setToSelected={setToSelected} label="Drop Point" />
                    </div>
                    
                </div>
            }
            
            <GoogleMap 
                mapContainerStyle={containerStyle} 
                center={center} 
                mapTypeControl={true}
                zoom={12}
            >


                {
                    selected && <Marker position={ selected }/>
                }
                {
                    fromSelected && <Marker position={ fromSelected }/>
                }
                {
                    toSelected && <Marker position={ toSelected }/>
                }

                {/* {toSelected && (
                        <DirectionsService
                        options={{
                            toSelected,
                            fromSelected,
                            travelMode: 'DRIVING',
                        }}
                        callback={onDirectionsResponse}
                        />
                    )}

                    {directions && <DirectionsRenderer directions={directions} />
                } */}

                {distance && <div>Distance: {distance}</div>}
                {duration && <div>Duration: {duration}</div>}
            </GoogleMap>
        </LoadScript>
    )
}

function PlacesAutocomplete ({setSelected}) {
    
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
          /* Define search scope here */
        },
        debounce: 100,
    });

    const handleSelect = async (address) => {
        setValue (address, false)
        clearSuggestions ()
        const results = await getGeocode ({ address })
        const { lat, lng } = await getLatLng (results[0])
        setSelected ({ lat, lng })
    }

    return <Combobox onSelect={handleSelect}>
        <ComboboxInput 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='combobox-input w-[100%] p-2 rounded-lg outline-none border-none'
            placeholder="Search Type Place Name"
        />
        <ComboboxPopover>
            <ComboboxList>
                {status === "OK" && data.map ( ({ place_id, description }) => (<ComboboxOption key={place_id} value={description} />))}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>

}

function FromPlacesAutocomplete ({setFromSelected}) {
    
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
          /* Define search scope here */
        },
        debounce: 100,
    });

    const handleSelect = async (address) => {
        setValue (address, false)
        clearSuggestions ()
        const results = await getGeocode ({ address })
        const { lat, lng } = await getLatLng (results[0])
        setFromSelected ({ lat, lng })
    }

    return <Combobox onSelect={handleSelect}>
        <ComboboxInput 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='combobox-input w-[100%] p-2 rounded-lg outline-none border-none'
            placeholder="Search Type Place Name"
        />
        <ComboboxPopover>
            <ComboboxList>
                {status === "OK" && data.map ( ({ place_id, description }) => (<ComboboxOption key={place_id} value={description} />))}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>

}

function ToPlacesAutocomplete ({setToSelected}) {
    
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
          /* Define search scope here */
        },
        debounce: 100,
    });

    const handleSelect = async (address) => {
        setValue (address, false)
        clearSuggestions ()
        const results = await getGeocode ({ address })
        const { lat, lng } = await getLatLng (results[0])
        setToSelected ({ lat, lng })
    }

    return <Combobox onSelect={handleSelect}>
        <ComboboxInput 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='combobox-input w-[100%] p-2 rounded-lg outline-none border-none'
            placeholder="Search Type Place Name"
        />
        <ComboboxPopover>
            <ComboboxList>
                {status === "OK" && data.map ( ({ place_id, description }) => (<ComboboxOption key={place_id} value={description} />))}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>

}

export default memo ( GoogleMapComponent )