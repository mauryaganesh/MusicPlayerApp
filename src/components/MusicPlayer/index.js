import { Component } from "react";
import SongItem from "../SongItem";
import { ThreeDots } from "react-loader-spinner";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import searchicon from "./searchicon.svg";
import logo from "./logo.svg";
import profile from "./profile.svg";
import "./index.css";

const tabsList = [
  { tabId: "FORYOU", displayText: "For You" },
  { tabId: "TOPTRACKS", displayText: "Top Tracks" },
];

class MusicPlayer extends Component {
  state = {
    activeTabId: tabsList[0].tabId,
    searchInput: "",
    songsData: [],
    selectedSong: {},
    filteredData: [],
    showList: true,
    isLoading: true,
    displayButton: false,
  };

  componentDidMount() {
    this.fetchSongs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTabId !== this.state.activeTabId) {
      this.filterSongs();
    }
  }

  fetchSongs = async () => {
    const response = await fetch("https://cms.samespace.com/items/songs");
    const data = await response.json();
    this.setState({
      songsData: data.data,
      filteredData: data.data,
      isLoading: false,
    });
  };

  filterSongs = () => {
    const { songsData, activeTabId } = this.state;
    const filteredData =
      activeTabId === "TOPTRACKS"
        ? songsData.filter((song) => song.top_track)
        : songsData;
    this.setState({ filteredData });
  };

  onClickTabChange = (tabId) => {
    this.setState({ activeTabId: tabId });
  };

  // onClickTabChange = (tabId) => {
  //   this.setState({ activeTabId: tabId, searchInput: "" }, this.filterSongs);
  // };

  onClickSearchChange = (event) => {
    this.setState({ searchInput: event.target.value }, this.searchSongs);
  };

  searchSongs = () => {
    const { songsData, searchInput, activeTabId } = this.state;
    const lowerCaseSearchInput = searchInput.toLowerCase();

    const filteredByTab =
      activeTabId === "TOPTRACKS"
        ? songsData.filter((song) => song.top_track)
        : songsData;

    if (searchInput === "") {
      this.setState({ filteredData: filteredByTab });
    } else {
      const filteredData = filteredByTab.filter((song) => {
        const songName = song.name.toLowerCase();
        const songArtist = song.artist.toLowerCase();
        return (
          songName.includes(lowerCaseSearchInput) ||
          songArtist.includes(lowerCaseSearchInput)
        );
      });

      this.setState({ filteredData });
    }
  };

  onClickSongSelect = (song) => {
    this.setState({ selectedSong: song, showList: false, displayButton: true });
  };

  toggleShowList = () => {
    this.setState((prevState) => ({ showList: !prevState.showList }));
  };

  onClickNext = () => {
    const { filteredData, selectedSong } = this.state;
    const currentIndex = filteredData.findIndex(
      (song) => song.id === selectedSong.id
    );

    if (filteredData.length === 0) return;

    const nextIndex = (currentIndex + 1) % filteredData.length;
    const nextSong = filteredData[nextIndex];

    this.setState({ selectedSong: nextSong });
  };

  onClickPrev = () => {
    const { filteredData, selectedSong } = this.state;
    const currentIndex = filteredData.findIndex(
      (song) => song.id === selectedSong.id
    );

    if (filteredData.length === 0) return;

    const prevIndex =
      (currentIndex - 1 + filteredData.length) % filteredData.length;
    const prevSong = filteredData[prevIndex];

    this.setState({ selectedSong: prevSong });
  };

  renderSidebar = () => (
    <div className="sidebar-container">
      <div>
        <img src={logo} alt="logo-image" />
      </div>
      <div>
        <img src={profile} alt="profile-image" />
      </div>
    </div>
  );

  onClickTabClick = (tabId) => {
    this.onClickTabChange(tabId);
  };

  renderTopbar = () => {
    const { activeTabId } = this.state;
    return (
      <div className="tab-section">
        {tabsList.map((tab) => (
          <div
            key={tab.tabId}
            onClick={() => this.onClickTabClick(tab.tabId)}
            className={`${tab.tabId.toLowerCase()} ${
              activeTabId === tab.tabId ? "" : "not-selected"
            }`}
          >
            {tab.displayText}
          </div>
        ))}
      </div>
    );
  };

  renderSearchBar = () => (
    <div className="search-section">
      <input
        className="search-song"
        placeholder="Search Song, Artist"
        onChange={this.onClickSearchChange}
      />
      <img src={searchicon} alt="search" />
    </div>
  );

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

  renderSongList = () => {
    const { filteredData, selectedSong } = this.state;
    return (
      <div className="songs-list-section">
        {filteredData.map((item, index) => (
          <SongItem
            key={index}
            icon={item.cover}
            artist={item.artist}
            name={item.name}
            data={item}
            selectedSong={selectedSong}
            setSelectedSong={this.onClickSongSelect}
          />
        ))}
      </div>
    );
  };

  renderMediaPlayer = () => {
    const { selectedSong, showList } = this.state;

    const isSongSelected = selectedSong && Object.keys(selectedSong).length > 0;
    if (!isSongSelected) return null;

    return (
      <div className={showList ? "media-player display" : "media-player"}>
        <div className="media-player-song-description">
          <div className="media-player-song-name">{selectedSong.name}</div>
          <div className="media-player-artist-name">{selectedSong.artist}</div>
        </div>
        <div className="media-player-song-cover">
          <img
            src={`https://cms.samespace.com/assets/${selectedSong.cover}`}
            alt={selectedSong.name}
            className="song-background-picture"
          />
        </div>
        <AudioPlayer
          autoPlay
          src={selectedSong.url}
          showDownloadProgress={false}
          showSkipControls
          showJumpControls={false}
          onClickNext={this.onClickNext}
          onClickPrevious={this.onClickPrev}
          onEnded={this.onClickNext}
        />
      </div>
    );
  };

  render() {
    const { isLoading, displayButton, selectedSong, showList } = this.state;
    const setDefaultColor = "#000";
    const setBackgroundGradient = selectedSong.accent
      ? `linear-gradient(108deg, ${selectedSong.accent}, rgba(0, 0, 0, 0.60) 99.84%)`
      : `linear-gradient(108deg, ${setDefaultColor}, rgba(0, 0, 0, 0.60) 99.84%)`;

    const backgroundStyle = {
      background: `${setBackgroundGradient}, ${setDefaultColor}`,
    };

    return (
      <div className="app-container" style={backgroundStyle}>
        {this.renderSidebar()}
        {displayButton && (
          <div className="display-list" onClick={this.toggleShowList}>
            <button className="button">
              {!showList ? "Go Back" : "Show Player"}
            </button>
          </div>
        )}

        <div
          className={showList ? "songs-container" : "songs-container display"}
        >
          {this.renderTopbar()}
          {this.renderSearchBar()}
          {isLoading ? this.renderLoader() : this.renderSongList()}
          {/* {this.renderSongList()} */}
        </div>
        {/* {!showList && this.renderMediaPlayer()} */}
        {this.renderMediaPlayer()}
      </div>
    );
  }
}

export default MusicPlayer;
