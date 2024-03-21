import React, { useEffect, useState } from 'react';
import crimsonCupBranches from '../Utils/locations';

const dummy_gulshan = [23.78414635963375, 90.41608381154552];
const dummy_banani = [23.790441471951684, 90.4075915987335]
const dummy_mirpur_2 = [23.800443514179925, 90.35543218616176]
const dummy_mirpur_12 = [23.826985730647472, 90.3644202567651]


const LocationSelector = () => {
    const [currentLocation, setCurrentLocation] = useState(/* {latitude:dummy_banani[0],longitude:dummy_banani[1]} */);
    const [error, setError] = useState(null);
    const [nearestBranch, setNearestBranch] = useState(null);
    const [sortedBranches, setSortedBranches] = useState()
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                },
                (error) => {
                    setError('Error getting current location: ' + error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (currentLocation) {
            const distances = crimsonCupBranches.map((branch) => {
                const distance = calculateDistance(
                    currentLocation.latitude,
                    currentLocation.longitude,
                    branch.location.latitude,
                    branch.location.longitude
                );
                return { branch, distance };
            });

            const nearest = distances.find((item) => item.distance < 250);
            if (nearest) {
                setNearestBranch(nearest.branch);
            } else {
                const sortedBranches = distances.sort((a, b) => a.distance - b.distance);
                setNearestBranch(null);
                setSortedBranches(sortedBranches.map((item) => item.branch));
            }
        }
    }, [currentLocation]);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Radius of the Earth in meters
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in meters
        return distance;
    };

    return (
        <div>
            <h2>Nearest Crimson Cup branch:</h2>
            {error && <p>{error}</p>}
            {nearestBranch && <p>Your nearest branch: {nearestBranch.name}</p>}
            {sortedBranches && (
                <div>
                    <h2>Sorted branches:</h2>
                    {sortedBranches.map((branch) => {
                        const distance=calculateDistance(currentLocation.latitude, currentLocation.longitude, branch.location.latitude, branch.location.longitude).toFixed(2)
                        const dist_text = distance<1000?  `${distance} m.`:`${(distance/1000).toFixed(2)} k.m.`
                        return (
                            <p key={branch.name}>
                                Branch: {branch.name}, Distance: {dist_text} 
                            </p>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default LocationSelector;