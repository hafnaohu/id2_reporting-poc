import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";

//Import the languageContext for translation
import { LanguageProvider } from "../../src/utils/translation/LanguageContext.jsx"; 

//Import main screen
import CameraScreen from "../../src/screens/CameraScreen.js";

//Import for future map screen
import MapScreen from "../../src/screens/MapScreen";

export default function App() {
  return (
    <LanguageProvider>
      <PaperProvider>
        <CameraScreen />
        {/*<MapScreen />*/}
      </PaperProvider>
    </LanguageProvider>
  );
}

//Code to show the map on the screen
//export default function App() {
/* return <MapScreen />;
}
*/