import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

function RoomCard({room})
{
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleReservation = async () => {
        const user = authService.currentUserValue;
        if (!user) 
        {
            navigate('/login');
            return;
        }

        if (!startDate || !endDate) 
        {
            setMessage({ type: 'danger', text: 'Wybierz datę przyjazdu i wyjazdu!' });
            return;
        }

        const reqStart = new Date(startDate);
        const reqEnd = new Date(endDate);

        if (reqStart >= reqEnd) 
        {
            setMessage({ type: 'danger', text: 'Data wyjazdu musi być późniejsza niż przyjazdu!' });
            return;
        }

        if (reqStart < new Date(new Date().setHours(0,0,0,0))) 
        {
            setMessage({ type: 'danger', text: 'Nie możesz zarezerwować pokoju w przeszłości!' });
            return;
        }

        try
        {
            const res = await fetch(`https://my-json-server.typicode.com/bsrwx/hotel-reservations-project/reservations?roomId=${room.id}`);
            const existingReservations = await res.json();

            const isOverlapping = existingReservations.some(reservation => {
                const resStart = new Date(reservation.startDate);
                const resEnd = new Date(reservation.endDate);

                return (reqStart <= resEnd && reqEnd >= resStart);
            });

            if (isOverlapping)
            {
                setMessage({ type: 'danger', text: 'Pokój jest zajęty w tym terminie' });
                return;
            }

            const reservationDate = {
                userId: user.id,
                roomId: room.id,
                startDate: startDate,
                endDate: endDate,
                status: "active"
            };

            await fetch(`https://my-json-server.typicode.com/bsrwx/hotel-reservations-project/reservations`, {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify(reservationDate)
            });

            setMessage({ type: 'success', text: 'Rezerwacja udana!' });
            setStartDate('');
            setEndDate('');
        }
        catch (error) 
        {
            console.error("Błąd bazy danych:", error);
            setMessage({ type: 'danger', text: 'Wystąpił błąd podczas rezerwacji.' });
        }
    }

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
                <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text">
                    <strong>Ilość osób:</strong> {room.capacity} <br />
                    <strong>Standard:</strong> {room.standard}<br />
                    <strong>Cena:</strong> {room.price} PLN / noc
                </p>
                
                <hr />
                <div className="mb-2">
                    <label className="form-label mb-0" style={{ fontSize: '0.85rem' }}>Od kiedy:</label>
                    <input type="date" className="form-control form-control-sm" value={startDate} onChange={e => {setStartDate(e.target.value); setMessage(null)}} />
                </div>
                <div className="mb-3">
                    <label className="form-label mb-0" style={{ fontSize: '0.85rem' }}>Do kiedy:</label>
                    <input type="date" className="form-control form-control-sm" value={endDate} onChange={e => {setEndDate(e.target.value); setMessage(null)}} />
                </div>

                {message && (
                    <div className={`alert alert-${message.type} py-1 px-2 mb-3`} style={{ fontSize: '0.85rem' }}>
                    {message.text}
                    </div>
                )}

                <button className="btn btn-primary w-100" onClick={handleReservation}>Rezerwuj termin</button>
                </div>
            </div>
        </div>
    );
}

export default RoomCard; 