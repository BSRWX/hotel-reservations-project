import React, { useEffect, useState, useRef } from "react";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, map } from "rxjs/operators";

function RoomSearch()
{
    const [rooms, setRooms] = useState([]);
    const searchInputRef = useRef(null);

    useEffect(() => {
        fetch("http://localhost:3001/rooms")
            .then(response => response.json())
            .then(data => setRooms(data));

        const search$ = fromEvent(searchInputRef.current, 'input').pipe(
            map(e => e.target.value),
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(searchTerm =>
            {
                const url = searchTerm ? `http://localhost:3001/rooms?name_like=${searchTerm}` : 'http://localhost:3001/rooms';
                return fetch(url).then(res => res.json());
            })
        );

        const subscription = search$.subscribe(data => {
            setRooms(data)
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Dostępne Pokoje</h2>

            <input type="text" ref={searchInputRef} className="form-control mb-4" placeholder="Wyszukaj Pokój" />

            <div className="row">
                {rooms.map(room => (
                    <div key={room.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{room.name}</h5>
                                <p className="card-text">
                                    <strong>Ilość osób:</strong> {room.capacity} <br />
                                    <strong>Cena: </strong> {room.price} PLN / noc
                                </p>

                                {room.isAvailable ? (
                                    <button className="btn btn-primary w-100">Rezerwuj</button>
                                ) : (
                                    <button className="btn btn-secondary w-100">Niedostepny</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {rooms.length === 0 && (
                    <div className="col-12 text-center text-muted">
                        <p>Brak pokoi spełniających kryteria wyszukiwania.</p>
                    </div>
                )}
            </div>
        </div>
    );  
}

export default RoomSearch;
