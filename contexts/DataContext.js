import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [productionACLineAHour1, setProductionACLineAHour1] = useState("");
    const [productionACLineAHour2, setProductionACLineAHour2] = useState("");
    const [productionACLineAHour3, setProductionACLineAHour3] = useState("");
    const [productionACLineAHour4, setProductionACLineAHour4] = useState("");
    const [productionACLineAHour5, setProductionACLineAHour5] = useState("");

    const [productionACLineBHour1, setProductionACLineBHour1] = useState("");
    const [productionACLineBHour2, setProductionACLineBHour2] = useState("");
    const [productionACLineBHour3, setProductionACLineBHour3] = useState("");
    const [productionACLineBHour4, setProductionACLineBHour4] = useState("");
    const [productionACLineBHour5, setProductionACLineBHour5] = useState("");

    const productionACLineA = [
        productionACLineAHour1,
        productionACLineAHour2,
        productionACLineAHour3,
        productionACLineAHour4,
        productionACLineAHour5
    ]

    const productionACLineB = [
        productionACLineBHour1,
        productionACLineBHour2,
        productionACLineBHour3,
        productionACLineBHour4,
        productionACLineBHour5
    ]
    
    const [productionCLineAHour1, setProductionCLineAHour1] = useState("");
    const [productionCLineAHour2, setProductionCLineAHour2] = useState("");
    const [productionCLineAHour3, setProductionCLineAHour3] = useState("");
    const [productionCLineAHour4, setProductionCLineAHour4] = useState("");
    const [productionCLineAHour5, setProductionCLineAHour5] = useState("");

    const [productionCLineBHour1, setProductionCLineBHour1] = useState("");
    const [productionCLineBHour2, setProductionCLineBHour2] = useState("");
    const [productionCLineBHour3, setProductionCLineBHour3] = useState("");
    const [productionCLineBHour4, setProductionCLineBHour4] = useState("");
    const [productionCLineBHour5, setProductionCLineBHour5] = useState("");

    const productionCLineA = [
        productionCLineAHour1,
        productionCLineAHour2,
        productionCLineAHour3,
        productionCLineAHour4,
        productionCLineAHour5
    ]

    const productionCLineB = [
        productionCLineBHour1,
        productionCLineBHour2,
        productionCLineBHour3,
        productionCLineBHour4,
        productionCLineBHour5
    ]

    return (
        <DataContext.Provider value={{ 
            productionACLineAHour1, setProductionACLineAHour1,
            productionACLineAHour2, setProductionACLineAHour2,
            productionACLineAHour3, setProductionACLineAHour3,
            productionACLineAHour4, setProductionACLineAHour4,
            productionACLineAHour5, setProductionACLineAHour5,

            productionACLineBHour1, setProductionACLineBHour1,
            productionACLineBHour2, setProductionACLineBHour2,
            productionACLineBHour3, setProductionACLineBHour3,
            productionACLineBHour4, setProductionACLineBHour4,
            productionACLineBHour5, setProductionACLineBHour5,

            productionACLineA,
            productionACLineB,

            productionCLineAHour1, setProductionCLineAHour1,
            productionCLineAHour2, setProductionCLineAHour2,
            productionCLineAHour3, setProductionCLineAHour3,
            productionCLineAHour4, setProductionCLineAHour4,
            productionCLineAHour5, setProductionCLineAHour5,

            productionCLineBHour1, setProductionCLineBHour1,
            productionCLineBHour2, setProductionCLineBHour2,
            productionCLineBHour3, setProductionCLineBHour3,
            productionCLineBHour4, setProductionCLineBHour4,
            productionCLineBHour5, setProductionCLineBHour5,

            productionCLineA,
            productionCLineB
         }}>{children}</DataContext.Provider>
    )
}