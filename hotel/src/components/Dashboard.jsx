import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { authService } from "../services/authService.js";

function Dashboard()
{
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    const user = authService.currentUserValue;

    useEffect (() => {
        if (!user)
        {
            navigate('/login');
            return;
        }

        fetchReservations();
    }, [user, navigate]);

    const fetchReservations = () => {
        fetch(`http://localhost:3001/reservations?userId=${user.id}&_expand=room`)
            .then(res => res.json())
            .then(data => setReservations(data));
    };

    const handleCancel = (reservationId, roomId) => {
        if (!window.confirm("Czy napewno chcesz anulować rezerwacje?"))
        {
            return;
        }

        fetch(`http://localhost:3001/reservations/${reservationId}`, {
            method: 'DELETE'
        })
        .then(() => {
            fetchReservations();
        })
        .catch(error => console.error("Błąd podczas anulowania:", error));
    }

    if (!user) return null;

    return (
        <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Twój Panel Klienta</h2>
            <span className="badge bg-primary fs-6">Zalogowany jako: {user.username}</span>
        </div>

        <div className="card shadow-sm p-4">
            <h4 className="mb-4">Twoje aktywne rezerwacje</h4>

            {reservations.length > 0 ? (
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>#ID</th>
                            <th>Nazwa pokoju</th>
                            <th>Czas</th>
                            <th>Cena za noc</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(res => (
                            <tr key={res.id}>
                                <td>{res.id}</td>
                                <td className="fw-bold">{res.room?.name}</td>
                                <td>
                                {res.startDate} <br/><small className="text-muted">do</small> {res.endDate}
                                </td>
                                <td>{res.room?.price} PLN</td>
                                <td className="text-end">
                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleCancel(res.id)}>Anuluj</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            ) : (
            <div className="alert alert-info text-center" role="alert">
                Nie masz jeszcze żadnych aktywnych rezerwacji. Przejdź do zakładki "Pokoje", aby coś wybrać.
            </div>
            )}
        </div>
        </div>
    ); 
}

export default Dashboard;
