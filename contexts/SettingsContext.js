import { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [tileSize, setTileSize] = useState("");
    const [line, setLine] = useState("");
    const [shift, setShift] = useState("");

    return (
        <SettingsContext.Provider value={{ 
            tileSize, setTileSize,
            line, setLine,
            shift, setShift
         }}>{children}</SettingsContext.Provider>
    )
}