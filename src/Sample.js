import Header from "./Header";

const Sample = () => {
  return (
    <div>
      <Header />
      <span className="school-name">El-Bethel Academy</span>
      <blockquote className="blockquote">
        <p>"The name of the lord is the begninning of wisdom"</p>
      </blockquote>
      <br />

      <div id="galleries">
        <h1 id="gallery-header">Galleries</h1>
        <ul className="img-list">
          <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/IUB-SchoolofEducation.jpg" />
          </li>
          <li>
            <img src="https://www.gannett-cdn.com/presto/2022/05/16/PAPN/99a9b13f-17ac-4a91-8877-e6462b8f1255-APC_EdistonSchool_0516220036djp.jpg" />
          </li>
          <li>
            <img src="https://wallpapercrafter.com/desktop/233241-perspective-protrait-education-and-elementary-scho.jpg" />
          </li>
          <li>
            <img src="https://pbs.twimg.com/media/FqpovHFX0AAP1nJ?format=jpg&name=large" />
          </li>
          <li>
            <img src="https://c1.wallpaperflare.com/preview/492/907/716/school-className-school-children-bali.jpg" />
          </li>
          <li>
            <img src="https://img.freepik.com/free-photo/young-people-studying-using-laptop_23-2147844843.jpg" />
          </li>
          <li>
            <img src="https://wallpaper.dog/large/17288149.jpg" />
          </li>
          <li>
            <img src="https://filecabinet10.eschoolview.com/438E0725-245B-495C-9CC3-CF27A457ADBF/71f7d7dd-bcd6-4990-bb75-24176fecd93a.jpg" />
          </li>
          <li>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgkOSXvagHbyP6aZr28noNfcRut16U4DH2wSd-bo1zmeFxGWZRcV0fqZRKeWJeLHCOCo&usqp=CAU" />
          </li>
        </ul>
      </div>
      <div className="wrap">
        <button className="reserve">Reserve a spot</button>
      </div>

      <div id="map">
        <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg" />
      </div>
    </div>
  );
};

export default Sample;
