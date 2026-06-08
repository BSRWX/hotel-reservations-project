import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container mt-4">
            <div className="p-5 mb-4 bg-light rounded-3 shadow-sm text-center border">
                <h1 className="display-5 fw-bold text-primary mb-3">System Rezerwacji Hotelowej</h1>
                <p className="col-md-8 mx-auto fs-5 text-muted">
                    Witaj w mojej! Przeglądaj, filtruj i rezerwuj swoje wymarzone pokoje.
                </p>
                <Link to="/rooms" className="btn btn-primary btn-lg mt-3 px-5">
                    Przeglądaj dostępne pokoje
                </Link>
            </div>

            <div className="row align-items-md-stretch mt-4">
                <div className="col-md-6 mb-4">
                    <div className="h-100 p-4 mb-4 bg-light rounded-3 shadow-sm border">
                        <h3 className="mb-3">O projekcie</h3>
                        <p>
                            Aplikacja została stworzona w ramach zaliczenia przedmiotu <strong>Programowanie reaktywne</strong>. 
                            Rozwiązuje problem bezpiecznej rezerwacji pokoi i zapobiega nakładaniu się terminów (overbooking).
                        </p>
                        <hr className="border-secondary" />
                        <h5 className="mt-3">Wykorzystane technologie:</h5>
                        <ul className="mb-0">
                            <li><strong>React & React Router:</strong> Interfejs i nawigacja SPA</li>
                            <li><strong>RxJS:</strong> Reaktywne filtry wyszukiwania i globalny stan sesji</li>
                            <li><strong>JSON Server:</strong> Asynchroniczne API do pobierania danych</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );  
}

export default Home;