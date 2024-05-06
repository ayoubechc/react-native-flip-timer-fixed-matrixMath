import React from 'react';

import Timer from './src/components/timer';

function App(): React.JSX.Element {
  return <Timer time={500} play={true} />;
}

export default App;
