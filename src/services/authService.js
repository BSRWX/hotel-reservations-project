import { BehaviorSubject } from "rxjs";

const initialUser = JSON.parse(localStorage.getItem("loggedUser")) || null;

const currentUserSubject = new BehaviorSubject(initialUser);

export const authService = 
{
    currentUser: currentUserSubject.asObservable(),

    get currentUserValue()
    {
        return currentUserSubject.value;
    },

    login(user)
    {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        currentUserSubject.next(user);
    },

    logout()
    {
        localStorage.removeItem("loggedUser");
        currentUserSubject.next(null);
    }
};