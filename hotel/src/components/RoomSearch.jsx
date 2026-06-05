import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, map, filter } from "rxjs/operators";
import { authService } from "../services/authService";
import RoomCard from "./RoomCard";
import { BehaviorSubject } from "rxjs";

function RoomSearch()
{
    const [rooms, setRooms] = useState([]);
    const searchInputRef = useRef(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const filter$ = useRef(new BehaviorSubject({
        name: '',
        capacity: '',
        standard: '',
        startDate: '',
        endDate: ''
    })).current;
    const [currentFilters, setCurrentFilters] = useState(filter$.getValue());


    const handleFilterChange = (key, value) => {
        const newFilters = { ...filter$.getValue(), [key]: value };
        filter$.next(newFilters);
        setCurrentFilters(newFilters);
    }

    useEffect(() => {
        const subscription = authService.currentUser.subscribe(loggedUser => {
            setUser(loggedUser);
        });

        return () => subscription.unsubscribe;
    }, []);

    useEffect(() => {
        const subscription = filter$.pipe(
            debounceTime(500),
            switchMap(filters => {
                let url = 'http://localhost:3001/rooms?';
                if (filters.name) 
                {
                    url += `name_like=${filters.name}&`;
                }

                if (filters.capacity)
                {
                    url += `capacity_gte=${filters.capacity}&`;
                }

                if (filters.standard)
                {
                    url += `standard=${filters.standard}&`;
                }

                return Promise.all([
                    fetch(url).then(res => res.json()),
                    fetch("http://localhost:3001/reservations")
                        .then(res => res.json())
                ]).then(([fetchedRooms, allReservations]) => {
                    if (!filters.startDate || !filters.endDate)
                    {
                        return fetchedRooms;
                    }

                    const reqStart = new Date(filters.startDate);
                    const reqEnd = new Date(filters.endDate);

                    return fetchedRooms.filter(room => {
                        const roomReservations = allReservations.filter(r => r.roomId === room.id);
                        
                        const isOccupied = roomReservations.some(res => {
                            const resStart = new Date(res.startDate);
                            const resEnd = new Date(res.endDate);
                            return (reqStart <= resEnd && reqEnd >= resStart);
                        });

                        return !isOccupied; 
                    });
                });
            })
        ). subscribe(filteredRooms => {
            setRooms(filteredRooms);
        });

        filter$.next(filter$.getValue());

        return () => subscription.unsubscribe();
    }, []);

    const handleReservation = (room) => {
        if (!user)
        {
            navigate("/login");
        }

        const reservationData = { userId: user.id, roomId: room.id, status: "active" };

        fetch('http://localhost:3001/reservations',
        {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(reservationData)
        })
        .then(() => {
            return fetch(`http://localhost:3001/rooms/${room.id}`, {
                method: "PATCH",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ isAvailable: false })
            });
        })
        .then(() => {
            setTimeout(() => navigate('/dashboard'), 2000);
        })
        .catch(error => {
            console.error("Błąd podczas rezerwacji:", error);
        })
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Dostępne Pokoje</h2>

            <div className="card p-3 mb-4 shadow-sm bg-light">
    <div className="row g-3">
        {/* Wyszukiwanie po nazwie */}
        <div className="col-md-3">
            <label className="form-label text-muted small mb-1">Nazwa</label>
            <input type="text" className="form-control form-control-sm" 
                value={currentFilters.name} 
                onChange={(e) => handleFilterChange('name', e.target.value)} />
        </div>
        
        {/* Wyszukiwanie po pojemności */}
        <div className="col-md-2">
            <label className="form-label text-muted small mb-1">Min. osób</label>
            <input type="number" min="1" className="form-control form-control-sm" 
                value={currentFilters.capacity} 
                onChange={(e) => handleFilterChange('capacity', e.target.value)} />
        </div>

        {/* Wyszukiwanie po standardzie (Select) */}
        <div className="col-md-3">
            <label className="form-label text-muted small mb-1">Standard</label>
            <select className="form-select form-select-sm" 
                value={currentFilters.standard} 
                onChange={(e) => handleFilterChange('standard', e.target.value)}>
                <option value="">Wszystkie</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
            </select>
        </div>

        {/* Wyszukiwanie po datach */}
        <div className="col-md-2">
            <label className="form-label text-muted small mb-1">Przyjazd</label>
            <input type="date" className="form-control form-control-sm" 
                value={currentFilters.startDate} 
                onChange={(e) => handleFilterChange('startDate', e.target.value)} />
        </div>
        <div className="col-md-2">
            <label className="form-label text-muted small mb-1">Wyjazd</label>
            <input type="date" className="form-control form-control-sm" 
                value={currentFilters.endDate} 
                onChange={(e) => handleFilterChange('endDate', e.target.value)} />
        </div>
    </div>
</div>

            <div className="row mt-4">
                {rooms && rooms.length > 0 ? (
                rooms.map(room => (
                    <RoomCard key={room.id} room={room} />
                ))
                ) : (
                <div className="col-12">
                    <div className="alert alert-warning text-center p-4 shadow-sm" role="alert">
                    <h5>Brak wyników</h5>
                    <p className="mb-0">Nie znaleźliśmy pokoi spełniających Twoje kryteria.</p>
                    </div>
                </div>
                )}
            </div>
        </div>
    );  
}

export default RoomSearch;
