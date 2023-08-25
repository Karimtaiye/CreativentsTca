import { createContext, useState} from "react";
export const themeContext = createContext()

const ThemeProvider = ({children}) => {
    const [themes, setThemes] = useState(false)
function ChangeTheme() {
  setThemes(!themes)
}

    return(
        <themeContext.Provider value={{themes ,ChangeTheme,}}>
            {children}
        </themeContext.Provider>
    )
}

export default ThemeProvider









