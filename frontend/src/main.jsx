
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import '@fontsource/poppins';
// import { ChakraProvider } from "@chakra-ui/react";
// import { mode } from "@chakra-ui/theme-tools";
// import { extendTheme } from "@chakra-ui/theme-utils";
// import { ColorModeScript } from "@chakra-ui/color-mode";
// import { BrowserRouter } from "react-router-dom";
// import { RecoilRoot } from "recoil";

// const styles = {
// 	global: (props) => ({
// 		body: {
// 			color: mode("gray.800", "gray.800")(props), 
// 			bg: "#fff", 
// 			fontFamily: "'Poppins', sans-serif",
// 		},
// 	}),
// };

// const config = {
// 	initialColorMode: "light", 
// 	useSystemColorMode: true, 
// };

// const colors = {
// 	gray: {
// 		light: "#616161",
// 		dark: "#1e1e1e",
// 	},	
// };

// const theme = extendTheme({ config, styles, colors });

// ReactDOM.createRoot(document.getElementById("root")).render(
// 	// React.StrictMode renders every component twice (in the initial render), only in development.
// 	<React.StrictMode>
// 		<RecoilRoot>
// 			<BrowserRouter>
// 				<ChakraProvider theme={theme}>
// 					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
// 					<App />
// 				</ChakraProvider>
// 			</BrowserRouter>
// 		</RecoilRoot>
// 	</React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import '@fontsource/poppins';
import { ChakraProvider } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/theme-utils";
import { ColorModeScript, useColorMode } from "@chakra-ui/color-mode";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";

const styles = {
	global: (props) => ({
		body: {
			color: mode("gray.800", "gray.800")(props), 
			bg: "#fff", 
			fontFamily: "'Poppins', sans-serif",
		},
	}),
};

const config = {
	initialColorMode: "light", 
	useSystemColorMode: false, 
};

const colors = {
	gray: {
		light: "#616161",
		dark: "#1e1e1e",
	},	
};

const theme = extendTheme({ config, styles, colors });

// Component to enforce light mode
function EnforceLightMode() {
	const { setColorMode } = useColorMode();

	useEffect(() => {
		setColorMode("light"); // Forces light mode
	}, [setColorMode]);

	return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RecoilRoot>
			<BrowserRouter>
				<ChakraProvider theme={theme}>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<EnforceLightMode /> {/* This enforces light mode */}
					<App />
				</ChakraProvider>
			</BrowserRouter>
		</RecoilRoot>
	</React.StrictMode>
);
