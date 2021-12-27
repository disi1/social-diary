import { useContext } from "react";
import { ContactContext } from "./ContactContext";

export const useContact = () => {
    const context = useContext(ContactContext);

    if (context === undefined) {
        throw new Error(
            "useContact must be used within a ContactContext.Provider"
        );
    }

    return context;
};
