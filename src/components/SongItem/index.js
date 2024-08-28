import "./index.css";

const ListItem = (props) => {
  const { name, artist, icon, data, selectedSong, setSelectedSong } = props;
  return (
    <div className="song-display-container">
      <div
        className={`song ${selectedSong.name === name ? "selected-song" : ""}`}
        onClick={() => setSelectedSong(data)}
      >
        <div className="song-icon-display">
          <img
            className="icons"
            src={`https://cms.samespace.com/assets/${icon}`}
            alt={name}
          />
        </div>
        <div className="song-details-display">
          <div className="song-name">{name}</div>
          <div className="artist-name">{artist}</div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
