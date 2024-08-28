# Music Player App

This project is a simple music player built using React. It allows users to browse a list of songs, filter them based on categories, search by song name or artist, and play selected songs using an audio player.

## Features

- **Song Filtering**: Users can toggle between different song categories, such as "For You" and "Top Tracks."
- **Search Functionality**: Users can search for songs by name or artist.
- **Media Player**: Includes an audio player that supports play, pause, skip, and previous functionalities.
- **Responsive UI**: The interface adapts based on user interactions, such as showing or hiding the song list and media player in case of smaller screens.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Make sure you have Node.js and npm (Node Package Manager) installed on your computer. You can download them from [Node.js official website](https://nodejs.org/).

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/mauryaganesh/MusicPlayerApp.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd MusicPlayerApp
   ```

3. **Install Dependencies**:
   Run the following command to install all the necessary libraries and dependencies:
   ```bash
   npm install
   ```

### Libraries Used

- **React**: The core library used for building the UI.
- **react-loader-spinner**: A library that provides various loading spinners, including `ThreeDots`.
- **react-h5-audio-player**: A library for creating custom audio players in React.

### Installing and Using `react-loader-spinner`

To add the `react-loader-spinner` library to your project, you need to install it first:

```bash
npm install react-loader-spinner
```

In your code, you can then import and use the `ThreeDots` component like this:

```javascript
import { ThreeDots } from "react-loader-spinner";

renderLoader = () => (
  <div className="loader-container">
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#808080"
      radius="9"
      ariaLabel="three-dots-loading"
    />
  </div>
);
```

### Installing and Using `react-h5-audio-player`

To add the `react-h5-audio-player` library, install it with the following command:

```bash
npm install react-h5-audio-player
```

After installation, you can include the audio player in your project like this:

```javascript
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

renderMediaPlayer = () => {
  const { selectedSong } = this.state;

  if (!selectedSong) return null;

  return (
    <AudioPlayer
      autoPlay
      src={selectedSong.url}
      showSkipControls
      onClickNext={this.onClickNext}
      onClickPrevious={this.onClickPrev}
    />
  );
};
```

### Running the App

After installing the dependencies, start the app by running:

```bash
npm start
```

The app will be available at `http://localhost:3000` in your browser.

### Components Overview

- **Player**: Manages the state of the app, including the active tab, search value, song data, and selected song. It also handles user interactions like changing tabs, searching, and selecting songs.
- **SongItem**: Displays individual song details and allows users to select a song to play.
- **AudioPlayer**: Provides controls for playing, pausing, and skipping tracks.

## Conclusion

This project provides a basic understanding of how to build a music player using React. You can expand upon this foundation by adding more features such as user authentication, playlists, or integrating with external music APIs.

Feel free to explore the code and customize it as you learn and experiment with React!

```

```
