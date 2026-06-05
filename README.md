# 🏨 System Rezerwacji Hotelowej - Projekt Reaktywny (RxJS)

Projekt zaliczeniowy z przedmiotu **Programowanie Reaktywne**. Jest to aplikacja webowa typu Single Page Application (SPA), która umożliwia przeglądanie, filtrowanie i rezerwację pokoi hotelowych w czasie rzeczywistym. 

Głównym celem projektu było praktyczne wykorzystanie biblioteki **RxJS** do zarządzania złożonym stanem asynchronicznym oraz zapobiegania problemom z wielokrotnymi zapytaniami sieciowymi (Race Conditions).

## ✨ Główne funkcjonalności

* **Reaktywna wyszukiwarka (RxJS):** Filtrowanie pokoi po nazwie, pojemności, standardzie i datach. Wykorzystuje `BehaviorSubject`, `debounceTime` oraz `switchMap` do optymalizacji zapytań do API.
* **Walidacja terminów (Anti-Overbooking):** System dynamicznie weryfikuje dostępność pokoi – pokoje zarezerwowane w wybranym przedziale czasowym znikają z wyników wyszukiwania.
* **Autoryzacja użytkownika:** Symulowany system logowania i rejestracji. Globalny stan sesji jest zarządzany przez `BehaviorSubject`, co pozwala komponentom natychmiastowo reagować na zmiany.
* **Panel Klienta:** Chroniony widok (dostępny tylko po zalogowaniu), w którym użytkownik może przeglądać i anulować swoje aktywne rezerwacje.

## 🛠️ Technologie

* **Frontend:** React, React Router, HTML5, CSS3, Bootstrap 5
* **Programowanie Reaktywne:** RxJS
* **Backend (Mock):** JSON Server (REST API)

---

## 🚀 Instrukcja uruchomienia lokalnie

Aby uruchomić projekt na swoim komputerze, wykonaj poniższe kroki. Wymagane jest posiadanie zainstalowanego środowiska Node.js.

### 1. Pobranie i instalacja zależności
Sklonuj to repozytorium, przejdź do folderu z projektem i zainstaluj wymagane paczki:
```bash
npm install
```

### 2. Uruchomienie bazy danych (API)
Aplikacja wymaga serwera mockującego bazę danych. Otwórz terminal i uruchom przygotowany skrypt:
```bash
npm run server
```

### 3. Uruchomienie bazy danych (API)
Otwórz nową kartę w terminalu (nie wyłączając serwera z bazą danych!) i uruchom aplikację:
```bash
npm run dev
```